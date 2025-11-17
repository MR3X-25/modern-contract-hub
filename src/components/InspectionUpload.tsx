import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { validateInspectionToken } from '@/lib/security';
import { Upload, FileCheck, AlertTriangle } from 'lucide-react';

export interface InspectionData {
  token: string;
  pdfFile: File | null;
  pdfPreview: string | null;
}

interface InspectionUploadProps {
  onInspectionChange: (data: InspectionData) => void;
}

export const InspectionUpload = ({ onInspectionChange }: InspectionUploadProps) => {
  const [token, setToken] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState('');

  const handleTokenChange = (value: string) => {
    setToken(value);
    setTokenError('');
    
    if (value && !validateInspectionToken(value)) {
      setTokenError('Token inválido. Formato esperado: MR3X-VST-[ANO CORRENTE]-[CÓDIGO]');
    }
    
    onInspectionChange({ token: value, pdfFile, pdfPreview });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      toast.error('Apenas arquivos PDF são permitidos');
      return;
    }
    
    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      toast.error('Arquivo muito grande. Limite: 20MB');
      return;
    }
    
    setPdfFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPdfPreview(result);
      onInspectionChange({ token, pdfFile: file, pdfPreview: result });
      toast.success('PDF do termo de vistoria anexado com sucesso!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setPdfPreview(null);
    onInspectionChange({ token, pdfFile: null, pdfPreview: null });
    toast.info('PDF removido');
  };

  const hasWarning = !token && !pdfFile;

  return (
    <Card className="p-4 bg-card border-border">
      <h3 className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">
        📋 Termo de Vistoria
        {hasWarning && (
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
        )}
      </h3>
      
      {hasWarning && (
        <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-600 dark:text-yellow-400">
          ⚠️ ATENÇÃO: Nenhum termo de vistoria anexado. Recomenda-se anexar o PDF e/ou informar o token de vistoria.
        </div>
      )}

      <div className="space-y-3">
        <div>
          <Label htmlFor="inspection-token" className="text-xs">
            Token do Termo de Vistoria (MR3X-VST-{new Date().getFullYear()}-XXXXX)
          </Label>
          <Input
            id="inspection-token"
            value={token}
            onChange={(e) => handleTokenChange(e.target.value)}
            className={`bg-input border-border text-foreground ${tokenError ? 'border-red-500' : ''}`}
            placeholder={`MR3X-VST-${new Date().getFullYear()}-`}
          />
          {tokenError && (
            <p className="text-xs text-red-500 mt-1">{tokenError}</p>
          )}
        </div>

        <div>
          <Label htmlFor="inspection-pdf" className="text-xs">
            Anexar PDF do Termo de Vistoria (Limite: 20MB)
          </Label>
          <div className="mt-2">
            {!pdfFile ? (
              <label htmlFor="inspection-pdf" className="cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition-colors flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Clique para anexar PDF (máx. 20MB)
                  </span>
                </div>
                <input
                  id="inspection-pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="border border-border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-foreground">{pdfFile.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700"
                >
                  Remover
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
