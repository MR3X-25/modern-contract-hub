import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';

interface CepInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onAddressFound?: (address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => void;
}

export const CepInput = ({ id, label, value, onChange, onAddressFound }: CepInputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const formatCep = (cep: string) => {
    const numbers = cep.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = async (cep: string) => {
    const formatted = formatCep(cep);
    onChange(formatted);

    const numbers = cep.replace(/\D/g, '');
    if (numbers.length === 8) {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${numbers}/json/`);
        
        if (response.data.erro) {
          toast.error('CEP não encontrado');
          return;
        }

        const address = {
          street: response.data.logradouro || '',
          neighborhood: response.data.bairro || '',
          city: response.data.localidade || '',
          state: response.data.uf || '',
        };

        onAddressFound?.(address);
        toast.success('Endereço encontrado automaticamente!');
      } catch (error) {
        toast.error('Erro ao buscar CEP');
        console.error('CEP search error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => handleCepChange(e.target.value)}
        className="bg-input border-border text-foreground"
        placeholder="00000-000"
        maxLength={9}
        disabled={isLoading}
      />
      {isLoading && (
        <p className="text-xs text-muted-foreground mt-1">Buscando endereço...</p>
      )}
    </div>
  );
};
