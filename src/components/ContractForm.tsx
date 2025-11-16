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

    return [...new Set(placeholders.map(p => p.replace(/[\[\]]/g, '')))];
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
                    value={formData['TEL_AGENCIA'] || ''}
                    onChange={(e) => handleFieldChange('TEL_AGENCIA', e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder="(00) 00000-0000"
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
                    placeholder="contato@imobiliaria.com"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {getFormFields().map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field} className="text-sm text-foreground">
                    {field.replace(/_/g, ' ')}
                  </Label>
                  <Input
                    id={field}
                    value={formData[field] || ''}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder={`Digite ${field.replace(/_/g, ' ').toLowerCase()}`}
                  />
                </div>
              ))}
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
