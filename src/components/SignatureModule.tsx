import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DigitalSignature, SignatureData } from './DigitalSignature';
import { toast } from 'sonner';

interface SignatureModuleProps {
  contractContent: string;
  onBack: () => void;
  onSignaturesComplete: (signatures: {
    locador: SignatureData | null;
    locatario: SignatureData | null;
  }) => void;
}

export const SignatureModule = ({ contractContent, onBack, onSignaturesComplete }: SignatureModuleProps) => {
  const [locadorSignature, setLocadorSignature] = useState<SignatureData | null>(null);
  const [locatarioSignature, setLocatarioSignature] = useState<SignatureData | null>(null);
  const [showLocationMap, setShowLocationMap] = useState(false);

  const handleLocadorSignature = (signature: SignatureData) => {
    setLocadorSignature(signature);
  };

  const handleLocatarioSignature = (signature: SignatureData) => {
    setLocatarioSignature(signature);
  };

  const handleFinalize = () => {
    if (!locadorSignature || !locatarioSignature) {
      toast.error('Ambas as partes devem assinar o contrato');
      return;
    }

    onSignaturesComplete({
      locador: locadorSignature,
      locatario: locatarioSignature,
    });

    toast.success('Assinaturas registradas com sucesso!');
  };

  const getLocationMapUrl = (lat?: number, lng?: number) => {
    // Default to a generic location if geolocation is not available
    const latitude = lat || -23.5505;
    const longitude = lng || -46.6333;
    return `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;
  };

  const handleShowLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const url = getLocationMapUrl(position.coords.latitude, position.coords.longitude);
          window.open(url, '_blank');
          setShowLocationMap(true);
        },
        (error) => {
          toast.error('Não foi possível obter a localização');
          console.error('Geolocation error:', error);
          // Open with default location
          window.open(getLocationMapUrl(), '_blank');
        }
      );
    } else {
      toast.error('Geolocalização não suportada pelo navegador');
      window.open(getLocationMapUrl(), '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Preview
      </Button>

      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-bold text-gradient mb-4">
          Módulo de Assinatura Eletrônica
        </h2>
        <p className="text-muted-foreground mb-6">
          As assinaturas digitais são registradas com hash criptográfico SHA-256, IP, data/hora e geolocalização para garantir a autenticidade e validade jurídica do contrato.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DigitalSignature
            contractContent={contractContent}
            onSignature={handleLocadorSignature}
            role="locador"
            disabled={!!locadorSignature}
          />

          <DigitalSignature
            contractContent={contractContent}
            onSignature={handleLocatarioSignature}
            role="locatario"
            disabled={!!locatarioSignature}
          />
        </div>

        {(locadorSignature || locatarioSignature) && (
          <div className="mb-6">
            <Button
              onClick={handleShowLocation}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              📍 Ver Localização da Assinatura no Mapa
            </Button>
          </div>
        )}

        {locadorSignature && locatarioSignature && (
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
              <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                ✅ Assinaturas Completas
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-semibold">Locador(a):</p>
                  <p>Nome: {locadorSignature.name}</p>
                  <p>IP: {locadorSignature.ip}</p>
                  <p>Data: {new Date(locadorSignature.timestamp).toLocaleString('pt-BR')}</p>
                  <p className="break-all">Hash: {locadorSignature.hash.substring(0, 16)}...</p>
                </div>
                <div>
                  <p className="font-semibold">Locatário(a):</p>
                  <p>Nome: {locatarioSignature.name}</p>
                  <p>IP: {locatarioSignature.ip}</p>
                  <p>Data: {new Date(locatarioSignature.timestamp).toLocaleString('pt-BR')}</p>
                  <p className="break-all">Hash: {locatarioSignature.hash.substring(0, 16)}...</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleFinalize}
              className="w-full bg-gradient-to-r from-primary to-teal hover:opacity-90 text-primary-foreground font-bold text-lg py-6"
            >
              ✍️ Finalizar e Gerar Contrato Assinado
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
