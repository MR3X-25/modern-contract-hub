import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsAcceptanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export const TermsAcceptanceModal = ({ open, onOpenChange, onAccept }: TermsAcceptanceModalProps) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onAccept();
      onOpenChange(false);
      setAccepted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">ISENÇÃO DE RESPONSABILIDADE — MR3X</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 text-sm text-foreground">
            <p>
              A MR3X atua exclusivamente como plataforma tecnológica para disponibilização de modelos, 
              ferramentas de edição, automação documental e geração de contratos, acordos e notificações, 
              incluindo recursos de hash criptográfico, registro de IP, data, hora e localização. A MR3X 
              não produz, revisa, analisa, confere, valida, interpreta ou fiscaliza o conteúdo inserido, 
              editado ou aprovado pelos usuários, tampouco interfere nas negociações, condições, valores, 
              obrigações ou responsabilidades pactuadas entre as partes.
            </p>
            
            <p>
              Todos os documentos gerados são inteiramente de responsabilidade dos usuários que os criam 
              e assinam, incluindo a veracidade das informações, adequação jurídica, legalidade das cláusulas, 
              atualização de dados e cumprimento das obrigações assumidas.
            </p>
            
            <p>
              A MR3X não participa e não se responsabiliza por qualquer tipo de inadimplência, atraso, 
              descumprimento contratual, acordo firmado, divergência entre partes, cobranças, pagamentos, 
              disputas, perdas, danos, litígios, rescisões ou consequências oriundas dos documentos 
              elaborados pelos usuários, ainda que gerados a partir de modelos disponibilizados na plataforma.
            </p>
            
            <p>
              Os modelos disponibilizados pela plataforma são meramente referenciais e podem ser livremente 
              editados pelo usuário, que ao gerar e aceitar o contrato declara ciência plena de que o 
              documento é de sua exclusiva autoria e responsabilidade.
            </p>
            
            <p className="font-bold">
              Ao utilizar o gerador de contratos, o usuário reconhece que a MR3X fornece apenas o meio 
              tecnológico, não assumindo qualquer responsabilidade sobre eventos, resultados, acordos, 
              cobranças ou relações jurídicas decorrentes dos documentos produzidos.
            </p>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="accept-terms" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label
              htmlFor="accept-terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Li e aceito os termos de isenção de responsabilidade
            </label>
          </div>
          
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAccept}
              disabled={!accepted}
              className="flex-1 bg-gradient-to-r from-primary to-teal"
            >
              Aceitar e Continuar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
