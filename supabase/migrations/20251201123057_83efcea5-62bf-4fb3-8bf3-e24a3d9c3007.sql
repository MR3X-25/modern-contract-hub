-- Criar tabela de contratos
CREATE TABLE public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Metadados do contrato
  token TEXT NOT NULL UNIQUE,
  hash TEXT NOT NULL,
  contract_type TEXT NOT NULL,
  
  -- Conteúdo e dados
  content TEXT NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Vistoria
  inspection_token TEXT,
  inspection_pdf_url TEXT,
  
  -- Assinaturas
  signatures JSONB DEFAULT '{}'::jsonb,
  
  -- Informações de segurança
  ip_address TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados visualizarem seus próprios contratos
CREATE POLICY "Users can view their own contracts" 
ON public.contracts 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Política para usuários criarem seus próprios contratos
CREATE POLICY "Users can create their own contracts" 
ON public.contracts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Política para usuários atualizarem seus próprios contratos
CREATE POLICY "Users can update their own contracts" 
ON public.contracts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Política para usuários deletarem seus próprios contratos
CREATE POLICY "Users can delete their own contracts" 
ON public.contracts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Política para contratos públicos (sem autenticação) - visualização temporária
CREATE POLICY "Public can view contracts temporarily" 
ON public.contracts 
FOR SELECT 
TO anon
USING (true);

-- Política para inserção pública temporária (para permitir geração sem login)
CREATE POLICY "Public can create contracts temporarily" 
ON public.contracts 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Criar índices para melhor performance
CREATE INDEX idx_contracts_user_id ON public.contracts(user_id);
CREATE INDEX idx_contracts_token ON public.contracts(token);
CREATE INDEX idx_contracts_created_at ON public.contracts(created_at DESC);
CREATE INDEX idx_contracts_contract_type ON public.contracts(contract_type);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_contracts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_contracts_updated_at
BEFORE UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_contracts_updated_at();

-- Criar bucket de storage para PDFs de vistoria
INSERT INTO storage.buckets (id, name, public) 
VALUES ('inspection-pdfs', 'inspection-pdfs', false)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage para vistoria
CREATE POLICY "Users can upload their inspection PDFs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'inspection-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their inspection PDFs"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'inspection-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Política pública temporária para visualização de PDFs
CREATE POLICY "Public can view inspection PDFs temporarily"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'inspection-pdfs');