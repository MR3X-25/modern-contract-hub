import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoMr3x from '@/assets/logo-mr3x.png';
import { generateContractMetadata } from '@/lib/security';
import { toast } from 'sonner';

interface ContractPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContractPreview = ({ content, onContentChange }: ContractPreviewProps) => {
  const [metadata, setMetadata] = useState<{
    token: string;
    hash: string;
    ip: string;
    timestamp: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content) {
      generateContractMetadata(content).then(setMetadata);
    }
  }, [content]);

  const handleGeneratePDF = async () => {
    if (!previewRef.current || !metadata) return;

    setIsGenerating(true);
    toast.info('Gerando PDF...');

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`contrato-mr3x-${metadata.token}.pdf`);
      
      toast.success('PDF gerado com sucesso!');
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

  return (
    <div className="space-y-4">
      <div className="flex gap-2 print:hidden">
        <Button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
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

      <Card className="bg-white text-gray-900 p-8 print:shadow-none" ref={previewRef}>
        {/* Header with Logo and QR Code */}
        <div className="flex justify-between items-start mb-6 border-b-2 border-gray-200 pb-4">
          <div>
            <img src={logoMr3x} alt="MR3X Logo" className="h-24 w-auto object-contain mb-2" />
            <p className="text-xs text-gray-600 font-semibold">
              GESTÃO DE PAGAMENTOS E COBRANÇAS
              <br />
              ALUGUÉIS RESIDENCIAIS E COMERCIAIS
            </p>
          </div>
          <div className="text-center">
            <QRCodeSVG
              value={`https://mr3x.com.br/verify/${metadata.hash}`}
              size={100}
              level="H"
              includeMargin
            />
            <p className="text-[8px] text-gray-500 mt-1">Verificação Digital</p>
          </div>
        </div>

        {/* Editable Content */}
        <div className="mb-6 print:hidden">
          <Textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-gray-50 border-gray-300"
          />
        </div>

        {/* Print Content */}
        <div className="hidden print:block whitespace-pre-wrap font-serif text-sm leading-relaxed">
          {content}
        </div>

        {/* Metadata Section */}
        <div className="mt-8 pt-4 border-t-2 border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-xs mb-4">
            <div>
              <p className="font-bold text-gray-700">Token de Autenticação:</p>
              <p className="font-mono text-gray-600">{metadata.token}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Endereço IP:</p>
              <p className="font-mono text-gray-600">{metadata.ip}</p>
            </div>
            <div className="col-span-2">
              <p className="font-bold text-gray-700">Hash de Verificação:</p>
              <p className="font-mono text-gray-600 break-all text-[10px]">{metadata.hash}</p>
            </div>
            <div className="col-span-2">
              <p className="font-bold text-gray-700">Data e Hora:</p>
              <p className="text-gray-600">{new Date(metadata.timestamp).toLocaleString('pt-BR')}</p>
            </div>
          </div>

          {/* Barcode */}
          <div className="flex justify-center mt-4">
            <Barcode
              value={metadata.token}
              height={50}
              width={1.5}
              fontSize={12}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 print:opacity-10">
          <p className="text-8xl font-black transform -rotate-45 text-gray-400">MR3X</p>
        </div>
      </Card>

      {/* Security Info */}
      <Card className="p-4 bg-accent/20 border-accent print:hidden">
        <h3 className="font-bold text-sm text-foreground mb-2">🔒 Informações de Segurança</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>✓ Contrato assinado digitalmente com hash SHA-256</li>
          <li>✓ Token único de autenticação gerado</li>
          <li>✓ Registro de IP completo do criador</li>
          <li>✓ QR Code para verificação instantânea</li>
          <li>✓ Código de barras com identificador único</li>
        </ul>
      </Card>
    </div>
  );
};
