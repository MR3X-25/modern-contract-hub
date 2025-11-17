import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

interface WhatsAppSenderProps {
  pdfBlob: Blob | null;
  contractToken: string;
  onClose: () => void;
}

export const WhatsAppSender = ({ pdfBlob, contractToken, onClose }: WhatsAppSenderProps) => {
  const [open, setOpen] = useState(true);
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);

  const validatePhone = (phone: string) => {
    // Remove non-digits
    const cleaned = phone.replace(/\D/g, '');
    // Brazilian phone: 55 + DDD (2 digits) + number (8 or 9 digits)
    return cleaned.length >= 12 && cleaned.length <= 13;
  };

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  const handleSend = async () => {
    if (!validatePhone(phone)) {
      toast.error('Número de WhatsApp inválido. Use formato: +55 (11) 98888-8888');
      return;
    }

    if (!pdfBlob) {
      toast.error('PDF não disponível');
      return;
    }

    setSending(true);

    try {
      // Create message text
      const message = `*Contrato MR3X - ${contractToken}*\n\nO contrato foi gerado e assinado digitalmente com sucesso!\n\nO PDF do contrato está anexado a esta mensagem.\n\nVerifique a autenticidade em: https://mr3x.com.br/verify/${contractToken}`;

      // Format phone number
      const formattedPhone = formatPhoneForWhatsApp(phone);

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');

      toast.success('WhatsApp aberto! Envie o PDF manualmente através do WhatsApp.');
      toast.info('Nota: O PDF deve ser enviado manualmente devido a limitações da API do WhatsApp Web.');
      
      setOpen(false);
      onClose();
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
      toast.error('Erro ao abrir WhatsApp');
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) onClose();
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>📱 Enviar Contrato via WhatsApp</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="whatsapp-phone">Número do WhatsApp</Label>
            <Input
              id="whatsapp-phone"
              type="tel"
              placeholder="+55 (11) 98888-8888"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Formato: +55 (DDD) número
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3 text-xs">
            <p className="font-semibold text-yellow-800 dark:text-yellow-200">⚠️ Atenção:</p>
            <p className="text-yellow-700 dark:text-yellow-300 mt-1">
              O WhatsApp será aberto com a mensagem pré-preenchida. Você precisará enviar o PDF manualmente 
              através do WhatsApp devido a limitações da API do WhatsApp Web.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                onClose();
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSend}
              disabled={sending || !phone}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-500"
            >
              <Send className="w-4 h-4 mr-2" />
              {sending ? 'Abrindo...' : 'Abrir WhatsApp'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
