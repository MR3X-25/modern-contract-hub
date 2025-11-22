import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllTemplates, getTemplateById } from '@/lib/contractTemplates';
import { InspectionUpload, InspectionData } from './InspectionUpload';
import { CepInput } from './CepInput';
import { 
  validateCPF, 
  validateCNPJ, 
  formatCPF, 
  formatCNPJ, 
  validateWhatsApp, 
  formatWhatsApp, 
  validateEmail 
} from '@/lib/validators';
import { toast } from 'sonner';

export interface ContractFormData {
  templateId: string;
  fields: Record<string, string>;
  inspection: InspectionData;
}

interface ContractFormProps {
  onFormChange: (data: ContractFormData) => void;
  onGeneratePreview: () => void;
}

export const ContractForm = ({ onFormChange, onGeneratePreview }: ContractFormProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [inspectionData, setInspectionData] = useState<InspectionData>({ token: '', pdfFile: null, pdfPreview: null });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData({});
    setFieldErrors({});
    onFormChange({ templateId, fields: {}, inspection: inspectionData });
  };

  const handleFieldChange = (field: string, value: string) => {
    let formattedValue = value;
    let error = '';

    // Formatação e validação de CPF
    if (field.includes('CPF') && value) {
      formattedValue = formatCPF(value);
      if (formattedValue.replace(/\D/g, '').length === 11) {
        if (!validateCPF(formattedValue)) {
          error = 'CPF inválido';
        }
      }
    }

    // Formatação e validação de CNPJ
    if (field.includes('CNPJ') && value) {
      formattedValue = formatCNPJ(value);
      if (formattedValue.replace(/\D/g, '').length === 14) {
        if (!validateCNPJ(formattedValue)) {
          error = 'CNPJ inválido';
        }
      }
    }

    // Formatação e validação de WhatsApp
    if ((field.includes('TELEFONE') || field.includes('WHATSAPP')) && value) {
      formattedValue = formatWhatsApp(value);
      if (formattedValue.replace(/\D/g, '').length >= 10) {
        if (!validateWhatsApp(formattedValue)) {
          error = 'WhatsApp inválido. Formato: (XX) XXXXX-XXXX';
        }
      }
    }

    // Validação de Email
    if (field.includes('EMAIL') && value) {
      if (!validateEmail(value)) {
        error = 'Email inválido. Deve conter @';
      }
    }

    const updatedData = { ...formData, [field]: formattedValue };
    const updatedErrors = { ...fieldErrors, [field]: error };
    
    setFormData(updatedData);
    setFieldErrors(updatedErrors);
    onFormChange({ templateId: selectedTemplate, fields: updatedData, inspection: inspectionData });
  };

  const handleCepAddressFound = (fieldPrefix: string, address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => {
    const updatedData = {
      ...formData,
      [`ENDERECO_${fieldPrefix}`]: address.street,
      [`BAIRRO_${fieldPrefix}`]: address.neighborhood,
      [`CIDADE_${fieldPrefix}`]: address.city,
      [`ESTADO_${fieldPrefix}`]: address.state,
    };
    setFormData(updatedData);
    onFormChange({ templateId: selectedTemplate, fields: updatedData, inspection: inspectionData });
  };

  const handleInspectionChange = (data: InspectionData) => {
    setInspectionData(data);
    onFormChange({ templateId: selectedTemplate, fields: formData, inspection: data });
  };

  const getFormFields = () => {
    const template = getTemplateById(selectedTemplate);
    if (!template) return [];

    return template.fields || [];
  };

  const getFieldType = (field: string): 'text' | 'email' | 'tel' | 'date' => {
    if (field.includes('EMAIL')) return 'email';
    if (field.includes('TELEFONE') || field.includes('TEL_') || field.includes('WHATSAPP')) return 'tel';
    if (field.includes('DATA_')) return 'date';
    return 'text';
  };

  const isCepField = (field: string): boolean => {
    return field.includes('CEP');
  };

  const getFieldPrefix = (field: string): string => {
    // Para campos como CEP_LOCADOR, CEP_IMOVEL etc, usamos a parte após "CEP_"
    if (field.startsWith('CEP_')) {
      const [, prefix] = field.split('_');
      return prefix;
    }

    // Suporte opcional para campos no formato LOCADOR_CEP
    if (field.endsWith('_CEP')) {
      const [prefix] = field.split('_');
      return prefix;
    }

    const parts = field.split('_');
    return parts[parts.length - 1] || field;
  };

  const handleGenerateClick = () => {
    // Validate all fields before generating
    const hasErrors = Object.values(fieldErrors).some(error => error !== '');
    if (hasErrors) {
      toast.error('Por favor, corrija os erros antes de gerar o preview');
      return;
    }

    // Check required email fields
    const fields = getFormFields();
    const emailFields = fields.filter(f => f.includes('EMAIL'));
    for (const field of emailFields) {
      const value = formData[field];
      if (value && !validateEmail(value)) {
        toast.error(`Email inválido no campo ${field}`);
        return;
      }
    }

    onGeneratePreview();
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gradient mb-2">Gerador de Contratos MR3X</h2>
          <p className="text-muted-foreground">Preencha os dados para gerar seu contrato</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="template" className="text-foreground font-semibold">Tipo de Contrato</Label>
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger id="template" className="bg-input border-border">
              <SelectValue placeholder="Selecione um tipo de contrato" />
            </SelectTrigger>
            <SelectContent>
              {getAllTemplates().map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTemplate && (
          <>
            {/* Campos da Agência Imobiliária */}
            <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
              <h3 className="font-bold text-sm mb-3 text-foreground">📍 Dados da Agência Imobiliária (Opcional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="NOME_AGENCIA" className="text-xs text-foreground">Nome da Agência</Label>
                  <Input
                    id="NOME_AGENCIA"
                    value={formData['NOME_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('NOME_AGENCIA', e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder="Nome da Imobiliária"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="CNPJ_AGENCIA" className="text-xs text-foreground">CNPJ</Label>
                  <Input
                    id="CNPJ_AGENCIA"
                    value={formData['CNPJ_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('CNPJ_AGENCIA', e.target.value)}
                    className={`bg-input border-border text-foreground ${fieldErrors['CNPJ_AGENCIA'] ? 'border-red-500' : ''}`}
                    placeholder="00.000.000/0000-00"
                  />
                  {fieldErrors['CNPJ_AGENCIA'] && (
                    <p className="text-xs text-red-500">{fieldErrors['CNPJ_AGENCIA']}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ENDERECO_AGENCIA" className="text-xs text-foreground">Endereço</Label>
                  <Input
                    id="ENDERECO_AGENCIA"
                    value={formData['ENDERECO_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('ENDERECO_AGENCIA', e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder="Endereço completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="TEL_AGENCIA" className="text-xs text-foreground">Telefone</Label>
                  <Input
                    id="TEL_AGENCIA"
                    type="tel"
                    value={formData['TEL_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('TEL_AGENCIA', e.target.value)}
                    className={`bg-input border-border text-foreground ${fieldErrors['TEL_AGENCIA'] ? 'border-red-500' : ''}`}
                    placeholder="(XX) XXXXX-XXXX"
                  />
                  {fieldErrors['TEL_AGENCIA'] && (
                    <p className="text-xs text-red-500">{fieldErrors['TEL_AGENCIA']}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="EMAIL_AGENCIA" className="text-xs text-foreground">E-mail</Label>
                  <Input
                    id="EMAIL_AGENCIA"
                    type="email"
                    value={formData['EMAIL_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('EMAIL_AGENCIA', e.target.value)}
                    className={`bg-input border-border text-foreground ${fieldErrors['EMAIL_AGENCIA'] ? 'border-red-500' : ''}`}
                    placeholder="contato@agencia.com"
                  />
                  {fieldErrors['EMAIL_AGENCIA'] && (
                    <p className="text-xs text-red-500">{fieldErrors['EMAIL_AGENCIA']}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="REPRESENTANTE_AGENCIA" className="text-xs text-foreground">Representante</Label>
                  <Input
                    id="REPRESENTANTE_AGENCIA"
                    value={formData['REPRESENTANTE_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('REPRESENTANTE_AGENCIA', e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder="Nome do responsável"
                  />
                </div>
              </div>
            </div>

            {/* Índice de Reajuste */}
            <div className="space-y-2">
              <Label htmlFor="INDICE_REAJUSTE" className="text-xs text-foreground font-semibold">Índice de Reajuste</Label>
              <Select 
                value={formData['INDICE_REAJUSTE'] || ''} 
                onValueChange={(value) => handleFieldChange('INDICE_REAJUSTE', value)}
              >
                <SelectTrigger id="INDICE_REAJUSTE" className="bg-input border-border">
                  <SelectValue placeholder="Selecione o índice de reajuste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IGPM">IGP-M (Índice Geral de Preços do Mercado)</SelectItem>
                  <SelectItem value="IPCA">IPCA (Índice de Preços ao Consumidor Amplo)</SelectItem>
                  <SelectItem value="INPC">INPC (Índice Nacional de Preços ao Consumidor)</SelectItem>
                  <SelectItem value="IPC">IPC (Índice de Preços ao Consumidor)</SelectItem>
                  <SelectItem value="OUTROS">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Termo de Vistoria */}
            <InspectionUpload onInspectionChange={handleInspectionChange} />

            {/* Outros Campos do Contrato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFormFields().map((field) => (
                <div key={field} className="space-y-2">
                  {isCepField(field) ? (
                    <CepInput
                      id={field}
                      label={field.replace(/_/g, ' ')}
                      value={formData[field] || ''}
                      onChange={(value) => handleFieldChange(field, value)}
                      onAddressFound={(address) => handleCepAddressFound(getFieldPrefix(field), address)}
                    />
                  ) : (
                    <>
                      <Label htmlFor={field} className="text-xs text-foreground">
                        {field.replace(/_/g, ' ')}
                      </Label>
                      <Input
                        id={field}
                        type={getFieldType(field)}
                        value={formData[field] || ''}
                        onChange={(e) => handleFieldChange(field, e.target.value)}
                        className={`bg-input border-border text-foreground ${fieldErrors[field] ? 'border-red-500' : ''}`}
                        placeholder={field.includes('DATA') ? 'dd/mm/aaaa' : ''}
                      />
                      {fieldErrors[field] && (
                        <p className="text-xs text-red-500">{fieldErrors[field]}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <Button 
              onClick={handleGenerateClick}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-bold"
            >
              Gerar Preview do Contrato
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
