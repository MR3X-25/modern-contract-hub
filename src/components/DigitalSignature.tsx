import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { generateHash, getClientIP } from '@/lib/security';

export interface SignatureData {
  name: string;
  cpf: string;
  email: string;
  ip: string;
  timestamp: string;
  hash: string;
  role: 'locador' | 'locatario';
}

interface DigitalSignatureProps {
  contractContent: string;
  onSignature: (signature: SignatureData) => void;
  role: 'locador' | 'locatario';
  disabled?: boolean;
}

export const DigitalSignature = ({ contractContent, onSignature, role, disabled }: DigitalSignatureProps) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSign = async () => {
    if (!name || !cpf || !email) {
      toast.error('Preencha todos os campos para assinar');
      return;
    }

    setIsLoading(true);
    try {
      const ip = await getClientIP();
      const timestamp = new Date().toISOString();
      const signatureData = `${name}|${cpf}|${email}|${contractContent}`;
      const hash = generateHash(signatureData, ip);

      const signature: SignatureData = {
        name,
        cpf,
        email,
        ip,
        timestamp,
        hash,
        role
      };

      onSignature(signature);
      toast.success(`Assinatura digital de ${role === 'locador' ? 'Locador' : 'Locatário'} registrada com sucesso!`);
      setName('');
      setCpf('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao gerar assinatura:', error);
      toast.error('Erro ao registrar assinatura digital');
    } finally {
      setIsLoading(false);
    }
  };

  const roleLabel = role === 'locador' ? 'Locador(a)' : 'Locatário(a)';

  return (
    <Card className="p-4 bg-card border-border">
      <h3 className="font-bold text-sm mb-3 text-foreground">
        ✍️ Assinatura Digital - {roleLabel}
      </h3>
      <div className="space-y-3">
        <div>
          <Label htmlFor={`name-${role}`} className="text-xs">Nome Completo</Label>
          <Input
            id={`name-${role}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled || isLoading}
            className="bg-input border-border text-foreground"
            placeholder="Nome completo"
          />
        </div>
        <div>
          <Label htmlFor={`cpf-${role}`} className="text-xs">CPF</Label>
          <Input
            id={`cpf-${role}`}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            disabled={disabled || isLoading}
            className="bg-input border-border text-foreground"
            placeholder="000.000.000-00"
          />
        </div>
        <div>
          <Label htmlFor={`email-${role}`} className="text-xs">E-mail</Label>
          <Input
            id={`email-${role}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled || isLoading}
            className="bg-input border-border text-foreground"
            placeholder="email@exemplo.com"
          />
        </div>
        <Button
          onClick={handleSign}
          disabled={disabled || isLoading}
          className="w-full bg-gradient-to-r from-primary to-teal hover:opacity-90 text-primary-foreground"
        >
          {isLoading ? 'Processando...' : `Assinar como ${roleLabel}`}
        </Button>
      </div>
    </Card>
  );
};