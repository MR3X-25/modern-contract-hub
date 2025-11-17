import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contractTemplates } from '@/lib/contractTemplates';
import { InspectionUpload, InspectionData } from './InspectionUpload';

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

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData({});
    onFormChange({ templateId, fields: {}, inspection: inspectionData });
  };

  const handleFieldChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onFormChange({ templateId: selectedTemplate, fields: updatedData, inspection: inspectionData });
  };

  const handleInspectionChange = (data: InspectionData) => {
    setInspectionData(data);
    onFormChange({ templateId: selectedTemplate, fields: formData, inspection: data });
  };

  const getFormFields = () => {
    const template = contractTemplates.find(t => t.id === selectedTemplate);
    if (!template) return [];

    const placeholders = template.content.match(/\[([^\]]+)\]/g);
    if (!placeholders) return [];

    // Filter out agency fields and special fields
    const excludedFields = [
      'NOME_AGENCIA', 'CNPJ_AGENCIA', 'ENDERECO_AGENCIA', 
      'TEL_AGENCIA', 'EMAIL_AGENCIA', 'REPRESENTANTE_AGENCIA',
      'INDICE_REAJUSTE'
    ];

    return [...new Set(placeholders.map(p => p.replace(/[\[\]]/g, '')))]
      .filter(field => !excludedFields.includes(field));
  };

  const getFieldType = (field: string): 'text' | 'email' | 'tel' | 'date' => {
    if (field.includes('EMAIL')) return 'email';
    if (field.includes('TELEFONE') || field.includes('TEL_') || field.includes('WHATSAPP')) return 'tel';
    if (field.includes('DATA_')) return 'date';
    return 'text';
  };

  const validateField = (field: string, value: string): boolean => {
    if (field.includes('EMAIL') && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if ((field.includes('TELEFONE') || field.includes('WHATSAPP')) && value) {
      const phoneRegex = /^\+?55?\s?\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/;
      return phoneRegex.test(value.replace(/\s/g, ''));
    }
    return true;
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
              {contractTemplates.map((template) => (
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
                    className="bg-input border-border text-foreground"
                    placeholder="00.000.000/0000-00"
                  />
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
                    className="bg-input border-border text-foreground"
                    placeholder="+55 (11) 98888-8888"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="EMAIL_AGENCIA" className="text-xs text-foreground">E-mail</Label>
                  <Input
                    id="EMAIL_AGENCIA"
                    type="email"
                    value={formData['EMAIL_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('EMAIL_AGENCIA', e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder="contato@agencia.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="REPRESENTANTE_AGENCIA" className="text-xs text-foreground">Representante Legal</Label>
                  <Input
                    id="REPRESENTANTE_AGENCIA"
                    value={formData['REPRESENTANTE_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('REPRESENTANTE_AGENCIA', e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder="Nome do representante"
                  />
                </div>
              </div>
            </div>

            {/* Índice de Reajuste */}
            <div className="mb-4 p-4 bg-muted rounded-lg border border-border">
              <Label htmlFor="INDICE_REAJUSTE" className="text-sm font-semibold text-foreground mb-2 block">
                📊 Índice de Reajuste Anual
              </Label>
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
                  <SelectItem value="OUTROS">Outros (especificar no contrato)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {getFormFields().map((field) => {
                const fieldType = getFieldType(field);
                const isInvalid = formData[field] && !validateField(field, formData[field]);
                
                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="text-sm text-foreground">
                      {field.replace(/_/g, ' ')}
                      {field.includes('EMAIL') && ' *'}
                      {(field.includes('TELEFONE') || field.includes('WHATSAPP')) && ' (WhatsApp)'}
                    </Label>
                    <Input
                      id={field}
                      type={fieldType}
                      value={formData[field] || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className={`bg-input border-border text-foreground ${isInvalid ? 'border-red-500' : ''}`}
                      placeholder={
                        fieldType === 'email' ? 'email@exemplo.com' :
                        fieldType === 'tel' ? '+55 (11) 98888-8888' :
                        fieldType === 'date' ? 'dd/mm/aaaa' :
                        `Digite ${field.replace(/_/g, ' ').toLowerCase()}`
                      }
                    />
                    {isInvalid && (
                      <p className="text-xs text-red-500">
                        {field.includes('EMAIL') ? 'E-mail inválido' : 'Telefone inválido. Use: +55 (11) 98888-8888'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <InspectionUpload onInspectionChange={handleInspectionChange} />

            <Button 
              onClick={onGeneratePreview}
              className="w-full bg-gradient-to-r from-teal to-primary hover:opacity-90 text-primary-foreground font-bold"
            >
              Gerar Preview do Contrato
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
