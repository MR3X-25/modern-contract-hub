import { useState } from 'react';
import { ContractForm, ContractFormData } from '@/components/ContractForm';
import { ContractPreview } from '@/components/ContractPreview';
import { SignatureModule } from '@/components/SignatureModule';
import { HashVerifier } from '@/components/HashVerifier';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getTemplateById } from '@/lib/contractTemplates';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignatureData } from '@/components/DigitalSignature';
import logoMr3x from '@/assets/logo-mr3x-3d.png';

const Index = () => {
  const [formData, setFormData] = useState<ContractFormData>({ 
    templateId: '', 
    fields: {}, 
    inspection: { token: '', pdfFile: null, pdfPreview: null } 
  });
  const [previewContent, setPreviewContent] = useState<string>('');
  const [showSignatureModule, setShowSignatureModule] = useState(false);
  const [signatures, setSignatures] = useState<{
    locador: SignatureData | null;
    locatario: SignatureData | null;
  }>({ locador: null, locatario: null });

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
    setShowSignatureModule(false);
    toast.success('Preview gerado com sucesso!');
  };

  const handleSignaturesComplete = (sigs: { locador: SignatureData | null; locatario: SignatureData | null }) => {
    setSignatures(sigs);
    setShowSignatureModule(false);
    toast.success('Contrato assinado digitalmente! Agora você pode gerar o PDF.');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={logoMr3x} alt="MR3X Logo" className="h-16 w-auto object-contain" />
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-black text-gradient">
                MR3X Contract Generator
              </h1>
              <p className="text-muted-foreground text-sm">
                Sistema moderno e seguro de geração de contratos
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="generator">Gerador de Contratos</TabsTrigger>
            <TabsTrigger value="verify">Verificar Autenticidade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            {showSignatureModule ? (
              <SignatureModule
                contractContent={previewContent}
                onBack={() => setShowSignatureModule(false)}
                onSignaturesComplete={handleSignaturesComplete}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ContractForm
                    onFormChange={handleFormChange}
                    onGeneratePreview={handleGeneratePreview}
                  />
                </div>

                <div className="space-y-4">
                  {previewContent && (
                    <button
                      onClick={() => setShowSignatureModule(true)}
                      className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-primary to-teal text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      ✍️ Ir para Assinaturas Digitais
                    </button>
                  )}
                  <ContractPreview
                    content={previewContent}
                    onContentChange={setPreviewContent}
                    inspectionData={formData.inspection}
                    signatures={signatures}
                    agencyName={formData.fields.NOME_AGENCIA || formData.fields.RAZAO_SOCIAL_IMOBILIARIA}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="verify">
            <div className="max-w-2xl mx-auto">
              <HashVerifier />
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>MR3X Tecnologia LTDA • CNPJ: 27.960.990/0001-66</p>
          <p className="mt-1">Sistema protegido por criptografia SHA-256 e tokens únicos</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
