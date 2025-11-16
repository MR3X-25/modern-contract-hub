import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

export const HashVerifier = () => {
  const [hash, setHash] = useState('');
  const [token, setToken] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const handleVerify = () => {
    if (!hash || !token) {
      toast.error('Preencha o hash e o token para verificar');
      return;
    }

    // Simulação de verificação - em produção isso seria uma chamada ao backend
    const isValid = hash.length === 64 && token.startsWith('MR3X-CTR-');
    
    if (isValid) {
      setVerificationResult({
        valid: true,
        message: 'Hash verificado com sucesso! O contrato é autêntico e não foi alterado.'
      });
      toast.success('Contrato autêntico!');
    } else {
      setVerificationResult({
        valid: false,
        message: 'Hash inválido! O contrato pode ter sido alterado ou o token está incorreto.'
      });
      toast.error('Contrato inválido!');
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gradient">Verificador de Autenticidade</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Verifique a autenticidade de um contrato MR3X usando o hash e token de segurança.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="token-verify">Token do Contrato</Label>
          <Input
            id="token-verify"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="MR3X-CTR-2024-XXXXXXXXXX"
            className="bg-input border-border text-foreground font-mono"
          />
        </div>

        <div>
          <Label htmlFor="hash-verify">Hash de Verificação</Label>
          <Input
            id="hash-verify"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Cole o hash SHA-256 do contrato"
            className="bg-input border-border text-foreground font-mono text-xs"
          />
        </div>

        <Button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r from-primary to-teal hover:opacity-90 text-primary-foreground"
        >
          Verificar Autenticidade
        </Button>

        {verificationResult && (
          <Card className={`p-4 ${verificationResult.valid ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
            <div className="flex items-start gap-3">
              {verificationResult.valid ? (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`font-bold mb-1 ${verificationResult.valid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {verificationResult.valid ? 'Contrato Autêntico' : 'Contrato Inválido'}
                </h3>
                <p className="text-sm text-foreground/80">
                  {verificationResult.message}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};