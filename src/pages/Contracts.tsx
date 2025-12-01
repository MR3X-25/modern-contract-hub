import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Download, Eye, FileText, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Contract {
  id: string;
  token: string;
  hash: string;
  contract_type: string;
  content: string;
  form_data: any;
  inspection_token?: string;
  inspection_pdf_url?: string;
  created_at: string;
}

export default function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [contractTypeFilter, setContractTypeFilter] = useState<string>('all');
  const [previewContract, setPreviewContract] = useState<Contract | null>(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    filterContracts();
  }, [contracts, searchTerm, contractTypeFilter]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContracts(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar contratos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterContracts = () => {
    let filtered = [...contracts];

    // Filtrar por tipo
    if (contractTypeFilter !== 'all') {
      filtered = filtered.filter(c => c.contract_type === contractTypeFilter);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.token.toLowerCase().includes(term) ||
        c.content.toLowerCase().includes(term) ||
        JSON.stringify(c.form_data).toLowerCase().includes(term)
      );
    }

    setFilteredContracts(filtered);
  };

  const downloadContract = (contract: Contract) => {
    const blob = new Blob([contract.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrato-${contract.token}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getContractTypeName = (type: string) => {
    const types: Record<string, string> = {
      residencial_pf: 'Residencial PF',
      residencial_pj: 'Residencial PJ',
      comercial_pf: 'Comercial PF',
      comercial_pj: 'Comercial PJ',
      administracao_locacao_comercial_pj: 'Administração Locação Comercial PJ',
      rural_pf: 'Rural PF'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-purple to-teal flex items-center justify-center">
        <Card className="p-8">
          <p className="text-lg">Carregando contratos...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple to-teal p-4">
      <div className="container mx-auto max-w-7xl">
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contratos Salvos</h1>
              <p className="text-gray-600 mt-1">{filteredContracts.length} contrato(s) encontrado(s)</p>
            </div>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Novo Contrato
            </Button>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar por token, conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="residencial_pf">Residencial PF</SelectItem>
                <SelectItem value="residencial_pj">Residencial PJ</SelectItem>
                <SelectItem value="comercial_pf">Comercial PF</SelectItem>
                <SelectItem value="comercial_pj">Comercial PJ</SelectItem>
                <SelectItem value="administracao_locacao_comercial_pj">Adm. Locação Comercial PJ</SelectItem>
                <SelectItem value="rural_pf">Rural PF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lista de Contratos */}
          <div className="space-y-4">
            {filteredContracts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Nenhum contrato encontrado</p>
              </div>
            ) : (
              filteredContracts.map((contract) => (
                <Card key={contract.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="text-primary" size={24} />
                        <div>
                          <h3 className="font-bold text-lg">{getContractTypeName(contract.contract_type)}</h3>
                          <p className="text-sm text-gray-600">Token: {contract.token}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>Criado em: {format(new Date(contract.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
                        </div>
                        {contract.inspection_token && (
                          <div>
                            <span className="text-green-600 font-semibold">✓ Com vistoria</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewContract(contract)}
                      >
                        <Eye size={16} className="mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadContract(contract)}
                      >
                        <Download size={16} className="mr-1" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>

        {/* Modal de Preview */}
        {previewContract && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setPreviewContract(null)}>
            <Card className="max-w-4xl max-h-[90vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{getContractTypeName(previewContract.contract_type)}</h2>
                  <p className="text-sm text-gray-600">Token: {previewContract.token}</p>
                </div>
                <Button variant="outline" onClick={() => setPreviewContract(null)}>
                  Fechar
                </Button>
              </div>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                  {previewContract.content}
                </pre>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
