import { useState } from 'react';
import { ContractForm, ContractFormData } from '@/components/ContractForm';
import { ContractPreview } from '@/components/ContractPreview';
import { getTemplateById } from '@/lib/contractTemplates';
import { toast } from 'sonner';

const Index = () => {
  const [formData, setFormData] = useState<ContractFormData>({ templateId: '', fields: {} });
  const [previewContent, setPreviewContent] = useState<string>('');

  const handleFormChange = (data: ContractFormData) => {
    setFormData(data);
  };

  const handleGeneratePreview = () => {
    const template = getTemplateById(formData.templateId);
    if (!template) {
      toast.error('Selecione um tipo de contrato');
      return;
    }

    let content = template.content;
    Object.entries(formData.fields).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\\[${key}\\]`, 'g'), value || `[${key}]`);
    });

    setPreviewContent(content);
    toast.success('Preview gerado com sucesso!');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-2">
            MR3X Contract Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Sistema moderno e seguro de geração de contratos
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ContractForm
              onFormChange={handleFormChange}
              onGeneratePreview={handleGeneratePreview}
            />
          </div>

          <div>
            <ContractPreview
              content={previewContent}
              onContentChange={setPreviewContent}
            />
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>MR3X Tecnologia LTDA • CNPJ: 27.960.990/0001-66</p>
          <p className="mt-1">Sistema protegido por criptografia SHA-256 e tokens únicos</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
