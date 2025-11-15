import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contractTemplates } from '@/lib/contractTemplates';

export interface ContractFormData {
  templateId: string;
  fields: Record<string, string>;
}

interface ContractFormProps {
  onFormChange: (data: ContractFormData) => void;
  onGeneratePreview: () => void;
}

export const ContractForm = ({ onFormChange, onGeneratePreview }: ContractFormProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData({});
    onFormChange({ templateId, fields: {} });
  };

  const handleFieldChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onFormChange({ templateId: selectedTemplate, fields: updatedData });
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
