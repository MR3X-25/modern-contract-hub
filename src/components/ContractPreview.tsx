import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoMr3x3d from '@/assets/logo-mr3x-3d.png';
import { generateContractMetadata } from '@/lib/security';
import { toast } from 'sonner';
import { SignatureData } from './DigitalSignature';
import { InspectionData } from './InspectionUpload';
import { TermsAcceptanceModal } from './TermsAcceptanceModal';
import { WhatsAppSender } from './WhatsAppSender';

interface ContractPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
  inspectionData?: InspectionData;
  signatures?: {
    locador: SignatureData | null;
    locatario: SignatureData | null;
  };
  agencyName?: string;
}

export const ContractPreview = ({ 
  content, 
  onContentChange, 
  inspectionData,
  signatures,
  agencyName 
}: ContractPreviewProps) => {
  const [metadata, setMetadata] = useState<{
    token: string;
    hash: string;
    ip: string;
    timestamp: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showWhatsAppSender, setShowWhatsAppSender] = useState(false);
  const [generatedPdfBlob, setGeneratedPdfBlob] = useState<Blob | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content) {
      generateContractMetadata(content).then(setMetadata);
    }
  }, [content]);

  const handleGeneratePDF = async () => {
    if (!termsAccepted) {
      toast.error('É necessário aceitar os termos de responsabilidade antes de gerar o PDF');
      setShowTermsModal(true);
      return;
    }

    if (!previewRef.current || !metadata) return;

    setIsGenerating(true);
    toast.info('Gerando PDF...');

    try {
      // Temporarily show the print content
      const printContent = previewRef.current.querySelector('[style*="display: none"]') as HTMLElement;
      const editContent = previewRef.current.querySelector('.print\\:hidden > textarea') as HTMLElement;
      
      if (printContent) printContent.style.display = 'block';
      if (editContent && editContent.parentElement) editContent.parentElement.style.display = 'none';

      // A4 dimensions in mm
      const pageWidth = 210;
      const pageHeight = 297;
      const marginLeft = 15; // 1.5cm
      const marginRight = 10; // 1cm
      const marginTop = 20;
      const marginBottom = 20;
      const contentWidth = pageWidth - marginLeft - marginRight;
      const contentHeight = pageHeight - marginTop - marginBottom;

      // Capture with higher quality
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: previewRef.current.scrollWidth,
        height: previewRef.current.scrollHeight,
      });

      // Restore original display
      if (printContent) printContent.style.display = 'none';
      if (editContent && editContent.parentElement) editContent.parentElement.style.display = 'block';

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = marginTop;
      let page = 1;

      // Add first page
      pdf.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);

      // Add vertical barcode on left margin of first page
      const barcodeX = 3;
      const barcodeY = 40;
      const barcodeWidth = 8;
      const barcodeHeight = 200;

      pdf.setFillColor(0, 0, 0);
      for (let i = 0; i < 50; i++) {
        const y = barcodeY + (i * barcodeHeight / 50);
        const barHeight = Math.random() > 0.5 ? 3 : 1.5;
        pdf.rect(barcodeX, y, barcodeWidth, barHeight, 'F');
      }

      heightLeft -= contentHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        page++;
        position = -(page - 1) * contentHeight + marginTop;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);

        // Add vertical barcode on each page
        for (let i = 0; i < 50; i++) {
          const y = barcodeY + (i * barcodeHeight / 50);
          const barHeight = Math.random() > 0.5 ? 3 : 1.5;
          pdf.rect(barcodeX, y, barcodeWidth, barHeight, 'F');
        }

        heightLeft -= contentHeight;
      }
      
      // Save PDF
      pdf.save(`contrato-mr3x-${metadata.token}.pdf`);
      
      // Create blob for WhatsApp
      const pdfBlob = pdf.output('blob');
      setGeneratedPdfBlob(pdfBlob);
      
      toast.success('PDF gerado com sucesso!');
      
      // Ask if user wants to send via WhatsApp
      setTimeout(() => {
        setShowWhatsAppSender(true);
      }, 500);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!content || !metadata) {
    return (
      <Card className="p-6 bg-card border-border min-h-[600px] flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          Selecione um tipo de contrato e preencha os dados para visualizar o preview
        </p>
      </Card>
    );
  }

  const hasInspectionWarning = !inspectionData?.token && !inspectionData?.pdfFile;

  return (
    <div className="space-y-4">
      {/* Terms Acceptance */}
      <Card className="p-4 bg-card border-border print:hidden">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms-acceptance"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            className="mt-1"
          />
          <div className="flex-1">
            <label
              htmlFor="terms-acceptance"
              className="text-sm font-medium cursor-pointer"
            >
              Aceito os termos de isenção de responsabilidade da MR3X
            </label>
            <button
              onClick={() => setShowTermsModal(true)}
              className="text-xs text-primary hover:underline block mt-1"
            >
              Clique aqui para ler os termos completos
            </button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2 print:hidden">
        <Button
          onClick={handleGeneratePDF}
          disabled={isGenerating || !termsAccepted}
          className="flex-1 bg-gradient-to-r from-primary to-teal hover:opacity-90 text-primary-foreground font-bold"
        >
          {isGenerating ? 'Gerando...' : 'Baixar PDF'}
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
        >
          Imprimir
        </Button>
      </div>

      <TermsAcceptanceModal
        open={showTermsModal}
        onOpenChange={setShowTermsModal}
        onAccept={() => setTermsAccepted(true)}
      />

      {showWhatsAppSender && generatedPdfBlob && metadata && (
        <WhatsAppSender
          pdfBlob={generatedPdfBlob}
          contractToken={metadata.token}
          onClose={() => setShowWhatsAppSender(false)}
        />
      )}

      <Card className="bg-white text-gray-900 p-8 print:shadow-none relative overflow-hidden print-contract" ref={previewRef} style={{ 
        margin: '0 auto',
        maxWidth: '21cm',
        minHeight: '29.7cm',
        padding: '2cm 1cm 2cm 1.5cm'
      }}>
        {/* Watermark CONFIDENCIAL */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 print:opacity-10" style={{ transform: 'rotate(-45deg)' }}>
          <div className="text-9xl font-black tracking-wider">
            CONFIDENCIAL
          </div>
        </div>

        {/* Vertical Barcode on Left Margin */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center" style={{ width: '25px' }}>
          <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
            <Barcode 
              value={metadata.token} 
              width={1}
              height={40}
              fontSize={8}
            />
          </div>
        </div>

        {/* Main Content with Left Padding for Barcode */}
        <div style={{ marginLeft: '30px' }}>
          {/* Header Centralizado */}
          <div className="text-center mb-8 border-b-4 border-gray-900 pb-6">
            <div className="flex justify-center items-center gap-6 mb-4">
              <img src={logoMr3x3d} alt="MR3X Logo" className="h-20 w-auto object-contain" style={{ maxWidth: '3.5cm' }} />
              
              <div className="text-center" style={{ maxWidth: '8cm' }}>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
                  CONTRATO
                </h1>
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wide leading-tight">
                  MR3X - Tecnologia em Gestão de Pagamentos e Cobranças de Aluguéis
                </p>
              </div>

              <div style={{ width: '3.5cm', height: '3.5cm' }} className="flex items-center justify-center">
                <QRCodeSVG
                  value={`https://mr3x.com.br/verify/${metadata.hash}`}
                  size={96}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            {agencyName && (
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-sm font-bold text-gray-800">
                  {agencyName}
                </p>
              </div>
            )}
          </div>

          {/* Security Metadata */}
          <div className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded text-xs">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <span className="font-bold">Token:</span> {metadata.token}
              </div>
              <div>
                <span className="font-bold">Data:</span> {new Date(metadata.timestamp).toLocaleString('pt-BR')}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-bold">Hash SHA-256:</span>
              <div className="break-words font-mono text-[10px] mt-1 overflow-wrap-anywhere">{metadata.hash}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-bold">IP:</span> {metadata.ip}
              </div>
              <div>
                <span className="font-bold">Data Eletrônica:</span> {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>

          {/* Inspection Warning/Info */}
          {inspectionData && (
            <div className={`mb-6 p-4 rounded border ${
              hasInspectionWarning 
                ? 'bg-yellow-50 border-yellow-400 text-yellow-800' 
                : 'bg-green-50 border-green-400 text-green-800'
            }`}>
              {hasInspectionWarning ? (
                <div className="flex items-start gap-2">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="font-bold text-sm">ATENÇÃO: Termo de Vistoria Não Anexado</p>
                    <p className="text-xs mt-1">
                      Não há termo de vistoria vinculado a este contrato. Recomenda-se anexar o PDF do termo de vistoria ou informar o token correspondente.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-bold text-sm">Termo de Vistoria</p>
                    {inspectionData.token && (
                      <p className="text-xs mt-1">
                        <span className="font-semibold">Token:</span> {inspectionData.token}
                      </p>
                    )}
                    {inspectionData.pdfFile && (
                      <p className="text-xs mt-1">
                        <span className="font-semibold">PDF Anexado:</span> {inspectionData.pdfFile.name}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contract Content */}
          <div className="mb-8 print:hidden">
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="min-h-[600px] bg-white border-gray-300 text-gray-900 font-mono text-sm leading-relaxed"
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </div>

          <div className="print:block prose prose-sm max-w-none text-gray-900" style={{ display: 'none' }}>
            {content.split('\n').map((line, index) => {
              const isBold = line.startsWith('**') || line.includes('CLÁUSULA') || line.includes('CONTRATO') || line.includes('LOCADOR') || line.includes('LOCATÁRIO');
              
              if (line.trim() === '') return <br key={index} />;
              
              return (
                <p key={index} className={isBold ? 'font-bold my-2' : 'my-1'} style={{ color: '#111827' }}>
                  {line.replace(/\*\*/g, '')}
                </p>
              );
            })}
          </div>

          {/* Digital Signatures Section */}
          {signatures && (signatures.locador || signatures.locatario) && (
            <div className="mt-8 pt-6 border-t-2 border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Assinaturas Digitais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {signatures.locador && (
                  <div className="border border-gray-300 rounded p-3 bg-gray-50">
                    <p className="font-bold text-sm mb-2">Locador(a)</p>
                    <p className="text-xs mb-1"><span className="font-semibold">Nome:</span> {signatures.locador.name}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">CPF:</span> {signatures.locador.cpf}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">E-mail:</span> {signatures.locador.email}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">IP:</span> {signatures.locador.ip}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">Data/Hora:</span> {new Date(signatures.locador.timestamp).toLocaleString('pt-BR')}</p>
                    <p className="text-xs break-words"><span className="font-semibold">Hash:</span> <span className="font-mono text-[9px]">{signatures.locador.hash.substring(0, 32)}...</span></p>
                  </div>
                )}

                {signatures.locatario && (
                  <div className="border border-gray-300 rounded p-3 bg-gray-50">
                    <p className="font-bold text-sm mb-2">Locatário(a)</p>
                    <p className="text-xs mb-1"><span className="font-semibold">Nome:</span> {signatures.locatario.name}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">CPF:</span> {signatures.locatario.cpf}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">E-mail:</span> {signatures.locatario.email}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">IP:</span> {signatures.locatario.ip}</p>
                    <p className="text-xs mb-1"><span className="font-semibold">Data/Hora:</span> {new Date(signatures.locatario.timestamp).toLocaleString('pt-BR')}</p>
                    <p className="text-xs break-words"><span className="font-semibold">Hash:</span> <span className="font-mono text-[9px]">{signatures.locatario.hash.substring(0, 32)}...</span></p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Barcode at Bottom */}
          <div className="mt-8 flex justify-center border-t-2 border-gray-300 pt-4">
            <Barcode 
              value={metadata.token}
              width={2}
              height={60}
              fontSize={12}
              displayValue={true}
            />
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-600 border-t border-gray-200 pt-4">
            <p className="font-semibold">MR3X TECNOLOGIA LTDA • CNPJ: 27.960.990/0001-66</p>
            <p className="mt-1">Documento protegido por criptografia SHA-256 e tokens únicos</p>
            <p className="mt-1">Verificação de autenticidade: https://mr3x.com.br/verify/{metadata.hash}</p>
            <p className="mt-3 text-[9px] leading-tight text-gray-500 italic">
              A MR3X atua apenas como plataforma tecnológica para geração e armazenamento deste documento. 
              Todo o conteúdo, termos, valores e informações aqui inseridos são de responsabilidade exclusiva 
              das partes. A MR3X não revisa, valida ou participa de negociações, nem responde por inadimplência, 
              descumprimento ou qualquer acordo firmado entre os envolvidos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
