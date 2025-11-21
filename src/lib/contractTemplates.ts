export const contractTemplates = {
  residencial_pf: {
    name: "Locação Residencial - Proprietário x Pessoa Física",
    fields: [
      "NOME_LOCADOR", "CPF_LOCADOR", "RG_LOCADOR", "PROFISSAO_LOCADOR",
      "CEP_LOCADOR", "ENDERECO_LOCADOR", "NUMERO_LOCADOR", "COMPLEMENTO_LOCADOR",
      "BAIRRO_LOCADOR", "CIDADE_LOCADOR", "ESTADO_LOCADOR",
      "EMAIL_LOCADOR", "TELEFONE_LOCADOR",
      "NOME_LOCATARIO", "CPF_LOCATARIO", "RG_LOCATARIO", "PROFISSAO_LOCATARIO",
      "CEP_LOCATARIO", "ENDERECO_LOCATARIO", "NUMERO_LOCATARIO", "COMPLEMENTO_LOCATARIO",
      "BAIRRO_LOCATARIO", "CIDADE_LOCATARIO", "ESTADO_LOCATARIO",
      "EMAIL_LOCATARIO", "TELEFONE_LOCATARIO",
      "CEP_IMOVEL", "ENDERECO_IMOVEL", "NUMERO_IMOVEL", "COMPLEMENTO_IMOVEL",
      "BAIRRO_IMOVEL", "CIDADE_IMOVEL", "ESTADO_IMOVEL",
      "DESCRICAO_IMOVEL", "VALOR_ALUGUEL", "DIA_VENCIMENTO",
      "PRAZO_CONTRATO", "DATA_INICIO", "DATA_FIM",
      "INDICE_REAJUSTE"
    ],
    template: `CONTRATO DE LOCAÇÃO RESIDENCIAL

LOCADOR: [NOME_LOCADOR], [ESTADO_CIVIL_LOCADOR], [PROFISSAO_LOCADOR], portador do CPF nº [CPF_LOCADOR] e RG nº [RG_LOCADOR], residente e domiciliado na [ENDERECO_LOCADOR], nº [NUMERO_LOCADOR], [COMPLEMENTO_LOCADOR], Bairro [BAIRRO_LOCADOR], [CIDADE_LOCADOR]/[ESTADO_LOCADOR], CEP [CEP_LOCADOR], E-mail: [EMAIL_LOCADOR], Telefone: [TELEFONE_LOCADOR].

LOCATÁRIO: [NOME_LOCATARIO], [ESTADO_CIVIL_LOCATARIO], [PROFISSAO_LOCATARIO], portador do CPF nº [CPF_LOCATARIO] e RG nº [RG_LOCATARIO], residente e domiciliado na [ENDERECO_LOCATARIO], nº [NUMERO_LOCATARIO], [COMPLEMENTO_LOCATARIO], Bairro [BAIRRO_LOCATARIO], [CIDADE_LOCATARIO]/[ESTADO_LOCATARIO], CEP [CEP_LOCATARIO], E-mail: [EMAIL_LOCATARIO], Telefone: [TELEFONE_LOCATARIO].

DO OBJETO

CLÁUSULA 1ª - O LOCADOR é legítimo proprietário do imóvel situado na [ENDERECO_IMOVEL], nº [NUMERO_IMOVEL], [COMPLEMENTO_IMOVEL], Bairro [BAIRRO_IMOVEL], [CIDADE_IMOVEL]/[ESTADO_IMOVEL], CEP [CEP_IMOVEL], doravante denominado simplesmente "IMÓVEL".

CLÁUSULA 2ª - Por este contrato, o LOCADOR dá em locação ao LOCATÁRIO o IMÓVEL acima descrito, destinado exclusivamente para fins residenciais, compreendendo: [DESCRICAO_IMOVEL].

DO PRAZO

CLÁUSULA 3ª - O prazo de locação é de [PRAZO_CONTRATO] meses, com início em [DATA_INICIO] e término em [DATA_FIM], podendo ser prorrogado mediante acordo entre as partes.

DO ALUGUEL E ENCARGOS

CLÁUSULA 4ª - O LOCATÁRIO pagará ao LOCADOR, a título de aluguel mensal, o valor de R$ [VALOR_ALUGUEL], com vencimento todo dia [DIA_VENCIMENTO] de cada mês.

CLÁUSULA 5ª - O não pagamento do aluguel na data estabelecida sujeitará o LOCATÁRIO ao pagamento de multa de 10% (dez por cento) sobre o valor em atraso, acrescido de juros de mora de 1% (um por cento) ao mês e correção monetária pelo índice [INDICE_REAJUSTE].

DAS OBRIGAÇÕES DO LOCATÁRIO

CLÁUSULA 6ª - O LOCATÁRIO obriga-se a:
a) Utilizar o imóvel exclusivamente para fins residenciais;
b) Manter o imóvel em perfeito estado de conservação;
c) Pagar pontualmente o aluguel e encargos;
d) Não realizar alterações no imóvel sem autorização prévia do LOCADOR;
e) Restituir o imóvel nas mesmas condições em que o recebeu.

DAS OBRIGAÇÕES DO LOCADOR

CLÁUSULA 7ª - O LOCADOR obriga-se a:
a) Entregar o imóvel em perfeitas condições de uso;
b) Garantir ao LOCATÁRIO o uso pacífico do imóvel;
c) Realizar reparos estruturais necessários.

DA RESCISÃO

CLÁUSULA 8ª - Este contrato poderá ser rescindido:
a) Por acordo entre as partes;
b) Por infração de qualquer cláusula contratual;
c) Por denúncia cheia ou vazia, conforme Lei do Inquilinato.

DISPOSIÇÕES GERAIS

CLÁUSULA 9ª - As partes elegem o foro da comarca de [CIDADE_IMOVEL]/[ESTADO_IMOVEL] para dirimir quaisquer questões oriundas deste contrato.

E por estarem justos e contratados, assinam o presente instrumento em duas vias de igual teor e forma.

[CIDADE_IMOVEL], [DATA_INICIO].

_________________________________
LOCADOR
[NOME_LOCADOR]
CPF: [CPF_LOCADOR]

_________________________________
LOCATÁRIO
[NOME_LOCATARIO]
CPF: [CPF_LOCATARIO]`
  },

  comercial_pj: {
    name: "Locação Comercial - Proprietário x Pessoa Jurídica",
    fields: [
      "NOME_LOCADOR", "CPF_LOCADOR", "RG_LOCADOR", "PROFISSAO_LOCADOR",
      "CEP_LOCADOR", "ENDERECO_LOCADOR", "NUMERO_LOCADOR", "COMPLEMENTO_LOCADOR",
      "BAIRRO_LOCADOR", "CIDADE_LOCADOR", "ESTADO_LOCADOR",
      "EMAIL_LOCADOR", "TELEFONE_LOCADOR",
      "RAZAO_SOCIAL_LOCATARIO", "CNPJ_LOCATARIO", "INSCRICAO_ESTADUAL",
      "REPRESENTANTE_LEGAL", "CPF_REPRESENTANTE", "RG_REPRESENTANTE",
      "CEP_LOCATARIO", "ENDERECO_LOCATARIO", "NUMERO_LOCATARIO", "COMPLEMENTO_LOCATARIO",
      "BAIRRO_LOCATARIO", "CIDADE_LOCATARIO", "ESTADO_LOCATARIO",
      "EMAIL_LOCATARIO", "TELEFONE_LOCATARIO",
      "CEP_IMOVEL", "ENDERECO_IMOVEL", "NUMERO_IMOVEL", "COMPLEMENTO_IMOVEL",
      "BAIRRO_IMOVEL", "CIDADE_IMOVEL", "ESTADO_IMOVEL",
      "DESCRICAO_IMOVEL", "AREA_IMOVEL", "VALOR_ALUGUEL", "DIA_VENCIMENTO",
      "PRAZO_CONTRATO", "DATA_INICIO", "DATA_FIM", "INDICE_REAJUSTE"
    ],
    template: `CONTRATO DE LOCAÇÃO COMERCIAL

LOCADOR: [NOME_LOCADOR], [ESTADO_CIVIL_LOCADOR], [PROFISSAO_LOCADOR], portador do CPF nº [CPF_LOCADOR] e RG nº [RG_LOCADOR], residente e domiciliado na [ENDERECO_LOCADOR], nº [NUMERO_LOCADOR], [COMPLEMENTO_LOCADOR], Bairro [BAIRRO_LOCADOR], [CIDADE_LOCADOR]/[ESTADO_LOCADOR], CEP [CEP_LOCADOR], E-mail: [EMAIL_LOCADOR], Telefone: [TELEFONE_LOCADOR].

LOCATÁRIO: [RAZAO_SOCIAL_LOCATARIO], pessoa jurídica de direito privado, inscrita no CNPJ sob nº [CNPJ_LOCATARIO], Inscrição Estadual nº [INSCRICAO_ESTADUAL], com sede na [ENDERECO_LOCATARIO], nº [NUMERO_LOCATARIO], [COMPLEMENTO_LOCATARIO], Bairro [BAIRRO_LOCATARIO], [CIDADE_LOCATARIO]/[ESTADO_LOCATARIO], CEP [CEP_LOCATARIO], neste ato representada por [REPRESENTANTE_LEGAL], portador do CPF nº [CPF_REPRESENTANTE] e RG nº [RG_REPRESENTANTE], E-mail: [EMAIL_LOCATARIO], Telefone: [TELEFONE_LOCATARIO].

DO OBJETO

CLÁUSULA 1ª - O LOCADOR é legítimo proprietário do imóvel comercial situado na [ENDERECO_IMOVEL], nº [NUMERO_IMOVEL], [COMPLEMENTO_IMOVEL], Bairro [BAIRRO_IMOVEL], [CIDADE_IMOVEL]/[ESTADO_IMOVEL], CEP [CEP_IMOVEL], com área total de [AREA_IMOVEL] m², doravante denominado "IMÓVEL".

CLÁUSULA 2ª - O IMÓVEL destina-se exclusivamente ao exercício de atividade comercial, compreendendo: [DESCRICAO_IMOVEL].

DO PRAZO

CLÁUSULA 3ª - O prazo de locação é de [PRAZO_CONTRATO] meses, com início em [DATA_INICIO] e término em [DATA_FIM].

DO ALUGUEL E REAJUSTE

CLÁUSULA 4ª - O LOCATÁRIO pagará ao LOCADOR o valor mensal de R$ [VALOR_ALUGUEL], com vencimento todo dia [DIA_VENCIMENTO] de cada mês.

CLÁUSULA 5ª - O aluguel será reajustado anualmente pelo índice [INDICE_REAJUSTE].

DAS DESPESAS E ENCARGOS

CLÁUSULA 6ª - Serão de responsabilidade do LOCATÁRIO todas as despesas com:
a) Consumo de água, luz, telefone e demais serviços públicos;
b) Impostos, taxas e contribuições incidentes sobre o imóvel;
c) Condomínio, se houver;
d) Manutenção e conservação do imóvel.

DAS OBRIGAÇÕES DO LOCATÁRIO

CLÁUSULA 7ª - O LOCATÁRIO obriga-se a:
a) Utilizar o imóvel dentro das normas legais;
b) Manter o imóvel em perfeito estado de conservação;
c) Não ceder ou sublocar o imóvel sem autorização;
d) Permitir vistorias periódicas;
e) Restituir o imóvel ao término do contrato.

DA RESCISÃO

CLÁUSULA 8ª - A rescisão antecipada por qualquer das partes implicará no pagamento de multa equivalente a 03 (três) aluguéis vigentes.

DISPOSIÇÕES GERAIS

CLÁUSULA 9ª - As partes elegem o foro de [CIDADE_IMOVEL]/[ESTADO_IMOVEL] para dirimir questões deste contrato.

[CIDADE_IMOVEL], [DATA_INICIO].

_________________________________
LOCADOR
[NOME_LOCADOR]
CPF: [CPF_LOCADOR]

_________________________________
LOCATÁRIO
[RAZAO_SOCIAL_LOCATARIO]
CNPJ: [CNPJ_LOCATARIO]
Representante: [REPRESENTANTE_LEGAL]
CPF: [CPF_REPRESENTANTE]`
  },

  administracao_imobiliaria: {
    name: "Administração de Imóvel - Imobiliária x Locador",
    fields: [
      "NOME_IMOBILIARIA", "CNPJ_IMOBILIARIA", "CRECI_IMOBILIARIA",
      "CEP_IMOBILIARIA", "ENDERECO_IMOBILIARIA", "NUMERO_IMOBILIARIA",
      "BAIRRO_IMOBILIARIA", "CIDADE_IMOBILIARIA", "ESTADO_IMOBILIARIA",
      "EMAIL_IMOBILIARIA", "TELEFONE_IMOBILIARIA",
      "REPRESENTANTE_IMOBILIARIA", "CPF_REPRESENTANTE_IMOB",
      "NOME_LOCADOR", "CPF_LOCADOR", "RG_LOCADOR",
      "CEP_LOCADOR", "ENDERECO_LOCADOR", "NUMERO_LOCADOR", "COMPLEMENTO_LOCADOR",
      "BAIRRO_LOCADOR", "CIDADE_LOCADOR", "ESTADO_LOCADOR",
      "EMAIL_LOCADOR", "TELEFONE_LOCADOR",
      "CEP_IMOVEL", "ENDERECO_IMOVEL", "NUMERO_IMOVEL", "COMPLEMENTO_IMOVEL",
      "BAIRRO_IMOVEL", "CIDADE_IMOVEL", "ESTADO_IMOVEL",
      "DESCRICAO_IMOVEL", "VALOR_ALUGUEL", "PERCENTUAL_ADMINISTRACAO",
      "PRAZO_CONTRATO", "DATA_INICIO"
    ],
    template: `CONTRATO DE ADMINISTRAÇÃO DE IMÓVEL

ADMINISTRADORA: [NOME_IMOBILIARIA], pessoa jurídica inscrita no CNPJ nº [CNPJ_IMOBILIARIA], CRECI nº [CRECI_IMOBILIARIA], com sede na [ENDERECO_IMOBILIARIA], nº [NUMERO_IMOBILIARIA], Bairro [BAIRRO_IMOBILIARIA], [CIDADE_IMOBILIARIA]/[ESTADO_IMOBILIARIA], CEP [CEP_IMOBILIARIA], representada por [REPRESENTANTE_IMOBILIARIA], CPF nº [CPF_REPRESENTANTE_IMOB], E-mail: [EMAIL_IMOBILIARIA], Telefone: [TELEFONE_IMOBILIARIA].

PROPRIETÁRIO: [NOME_LOCADOR], portador do CPF nº [CPF_LOCADOR] e RG nº [RG_LOCADOR], residente na [ENDERECO_LOCADOR], nº [NUMERO_LOCADOR], [COMPLEMENTO_LOCADOR], Bairro [BAIRRO_LOCADOR], [CIDADE_LOCADOR]/[ESTADO_LOCADOR], CEP [CEP_LOCADOR], E-mail: [EMAIL_LOCADOR], Telefone: [TELEFONE_LOCADOR].

DO OBJETO

CLÁUSULA 1ª - O PROPRIETÁRIO confere à ADMINISTRADORA a administração do imóvel situado na [ENDERECO_IMOVEL], nº [NUMERO_IMOVEL], [COMPLEMENTO_IMOVEL], Bairro [BAIRRO_IMOVEL], [CIDADE_IMOVEL]/[ESTADO_IMOVEL], CEP [CEP_IMOVEL], compreendendo: [DESCRICAO_IMOVEL].

DAS ATRIBUIÇÕES DA ADMINISTRADORA

CLÁUSULA 2ª - Compete à ADMINISTRADORA:
a) Procurar locatários para o imóvel;
b) Celebrar contratos de locação em nome do PROPRIETÁRIO;
c) Receber os aluguéis e repassar ao PROPRIETÁRIO;
d) Fiscalizar o uso do imóvel;
e) Promover a cobrança de aluguéis em atraso;
f) Realizar vistorias periódicas.

DA REMUNERAÇÃO

CLÁUSULA 3ª - O PROPRIETÁRIO pagará à ADMINISTRADORA, a título de taxa de administração, o percentual de [PERCENTUAL_ADMINISTRACAO]% sobre o valor do aluguel recebido.

CLÁUSULA 4ª - O valor estimado do aluguel é de R$ [VALOR_ALUGUEL] mensais.

DO PRAZO

CLÁUSULA 5ª - Este contrato terá vigência de [PRAZO_CONTRATO] meses, a partir de [DATA_INICIO], renovável automaticamente por iguais períodos.

DA RESCISÃO

CLÁUSULA 6ª - Qualquer das partes poderá rescindir este contrato mediante aviso prévio de 30 (trinta) dias.

DISPOSIÇÕES GERAIS

CLÁUSULA 7ª - As partes elegem o foro de [CIDADE_IMOVEL]/[ESTADO_IMOVEL].

[CIDADE_IMOVEL], [DATA_INICIO].

_________________________________
ADMINISTRADORA
[NOME_IMOBILIARIA]
CNPJ: [CNPJ_IMOBILIARIA]
Representante: [REPRESENTANTE_IMOBILIARIA]

_________________________________
PROPRIETÁRIO
[NOME_LOCADOR]
CPF: [CPF_LOCADOR]`
  },

  rural_pf: {
    name: "Locação Rural - Imobiliária x Pessoa Física",
    fields: [
      "NOME_IMOBILIARIA", "CNPJ_IMOBILIARIA", "CRECI_IMOBILIARIA",
      "CEP_IMOBILIARIA", "ENDERECO_IMOBILIARIA", "NUMERO_IMOBILIARIA",
      "BAIRRO_IMOBILIARIA", "CIDADE_IMOBILIARIA", "ESTADO_IMOBILIARIA",
      "NOME_LOCADOR", "CPF_LOCADOR", "RG_LOCADOR",
      "CEP_LOCADOR", "ENDERECO_LOCADOR", "NUMERO_LOCADOR",
      "BAIRRO_LOCADOR", "CIDADE_LOCADOR", "ESTADO_LOCADOR",
      "NOME_LOCATARIO", "CPF_LOCATARIO", "RG_LOCATARIO",
      "CEP_LOCATARIO", "ENDERECO_LOCATARIO", "NUMERO_LOCATARIO",
      "BAIRRO_LOCATARIO", "CIDADE_LOCATARIO", "ESTADO_LOCATARIO",
      "CEP_IMOVEL", "ENDERECO_IMOVEL", "AREA_IMOVEL", "MATRICULA_IMOVEL",
      "CIDADE_IMOVEL", "ESTADO_IMOVEL",
      "FINALIDADE_USO", "VALOR_ALUGUEL", "DIA_VENCIMENTO",
      "PRAZO_CONTRATO", "DATA_INICIO", "DATA_FIM"
    ],
    template: `CONTRATO DE LOCAÇÃO DE IMÓVEL RURAL

ADMINISTRADORA: [NOME_IMOBILIARIA], CNPJ nº [CNPJ_IMOBILIARIA], CRECI nº [CRECI_IMOBILIARIA], situada na [ENDERECO_IMOBILIARIA], nº [NUMERO_IMOBILIARIA], [BAIRRO_IMOBILIARIA], [CIDADE_IMOBILIARIA]/[ESTADO_IMOBILIARIA], CEP [CEP_IMOBILIARIA].

LOCADOR: [NOME_LOCADOR], CPF nº [CPF_LOCADOR], RG nº [RG_LOCADOR], residente na [ENDERECO_LOCADOR], nº [NUMERO_LOCADOR], [BAIRRO_LOCADOR], [CIDADE_LOCADOR]/[ESTADO_LOCADOR], CEP [CEP_LOCADOR].

LOCATÁRIO: [NOME_LOCATARIO], CPF nº [CPF_LOCATARIO], RG nº [RG_LOCATARIO], residente na [ENDERECO_LOCATARIO], nº [NUMERO_LOCATARIO], [BAIRRO_LOCATARIO], [CIDADE_LOCATARIO]/[ESTADO_LOCATARIO], CEP [CEP_LOCATARIO].

DO IMÓVEL RURAL

CLÁUSULA 1ª - Imóvel rural localizado em [ENDERECO_IMOVEL], [CIDADE_IMOVEL]/[ESTADO_IMOVEL], CEP [CEP_IMOVEL], com área total de [AREA_IMOVEL] hectares, matrícula nº [MATRICULA_IMOVEL].

DA FINALIDADE

CLÁUSULA 2ª - O imóvel destina-se a: [FINALIDADE_USO].

DO PRAZO E ALUGUEL

CLÁUSULA 3ª - Prazo de [PRAZO_CONTRATO] meses, de [DATA_INICIO] a [DATA_FIM].

CLÁUSULA 4ª - Aluguel mensal de R$ [VALOR_ALUGUEL], vencimento dia [DIA_VENCIMENTO].

DAS OBRIGAÇÕES

CLÁUSULA 5ª - O LOCATÁRIO deve conservar o imóvel e respeitar as leis ambientais.

[CIDADE_IMOVEL], [DATA_INICIO].

_________________________________
LOCADOR
[NOME_LOCADOR]
CPF: [CPF_LOCADOR]

_________________________________
LOCATÁRIO
[NOME_LOCATARIO]
CPF: [CPF_LOCATARIO]`
  },

  rural_pj: {
    name: "Locação Rural - Imobiliária x Pessoa Jurídica",
    fields: [
      "NOME_IMOBILIARIA", "CNPJ_IMOBILIARIA", "CRECI_IMOBILIARIA",
      "CEP_IMOBILIARIA", "ENDERECO_IMOBILIARIA", "NUMERO_IMOBILIARIA",
      "BAIRRO_IMOBILIARIA", "CIDADE_IMOBILIARIA", "ESTADO_IMOBILIARIA",
      "NOME_LOCADOR", "CPF_LOCADOR", "RG_LOCADOR",
      "CEP_LOCADOR", "ENDERECO_LOCADOR", "NUMERO_LOCADOR",
      "BAIRRO_LOCADOR", "CIDADE_LOCADOR", "ESTADO_LOCADOR",
      "RAZAO_SOCIAL_LOCATARIO", "CNPJ_LOCATARIO",
      "REPRESENTANTE_LEGAL", "CPF_REPRESENTANTE",
      "CEP_LOCATARIO", "ENDERECO_LOCATARIO", "NUMERO_LOCATARIO",
      "BAIRRO_LOCATARIO", "CIDADE_LOCATARIO", "ESTADO_LOCATARIO",
      "CEP_IMOVEL", "ENDERECO_IMOVEL", "AREA_IMOVEL", "MATRICULA_IMOVEL",
      "CIDADE_IMOVEL", "ESTADO_IMOVEL",
      "FINALIDADE_USO", "VALOR_ALUGUEL", "DIA_VENCIMENTO",
      "PRAZO_CONTRATO", "DATA_INICIO", "DATA_FIM"
    ],
    template: `CONTRATO DE LOCAÇÃO DE IMÓVEL RURAL - PESSOA JURÍDICA

ADMINISTRADORA: [NOME_IMOBILIARIA], CNPJ nº [CNPJ_IMOBILIARIA], CRECI nº [CRECI_IMOBILIARIA], situada na [ENDERECO_IMOBILIARIA], nº [NUMERO_IMOBILIARIA], [BAIRRO_IMOBILIARIA], [CIDADE_IMOBILIARIA]/[ESTADO_IMOBILIARIA], CEP [CEP_IMOBILIARIA].

LOCADOR: [NOME_LOCADOR], CPF nº [CPF_LOCADOR], RG nº [RG_LOCADOR], residente na [ENDERECO_LOCADOR], nº [NUMERO_LOCADOR], [BAIRRO_LOCADOR], [CIDADE_LOCADOR]/[ESTADO_LOCADOR], CEP [CEP_LOCADOR].

LOCATÁRIO: [RAZAO_SOCIAL_LOCATARIO], CNPJ nº [CNPJ_LOCATARIO], com sede na [ENDERECO_LOCATARIO], nº [NUMERO_LOCATARIO], [BAIRRO_LOCATARIO], [CIDADE_LOCATARIO]/[ESTADO_LOCATARIO], CEP [CEP_LOCATARIO], representada por [REPRESENTANTE_LEGAL], CPF nº [CPF_REPRESENTANTE].

DO IMÓVEL RURAL

CLÁUSULA 1ª - Imóvel rural em [ENDERECO_IMOVEL], [CIDADE_IMOVEL]/[ESTADO_IMOVEL], CEP [CEP_IMOVEL], área [AREA_IMOVEL] hectares, matrícula [MATRICULA_IMOVEL].

DA FINALIDADE

CLÁUSULA 2ª - Destinado a: [FINALIDADE_USO].

DO PRAZO E PAGAMENTO

CLÁUSULA 3ª - Prazo: [PRAZO_CONTRATO] meses ([DATA_INICIO] a [DATA_FIM]).

CLÁUSULA 4ª - Aluguel: R$ [VALOR_ALUGUEL], dia [DIA_VENCIMENTO].

[CIDADE_IMOVEL], [DATA_INICIO].

_________________________________
LOCADOR
[NOME_LOCADOR]
CPF: [CPF_LOCADOR]

_________________________________
LOCATÁRIO
[RAZAO_SOCIAL_LOCATARIO]
CNPJ: [CNPJ_LOCATARIO]
Rep.: [REPRESENTANTE_LEGAL]`
  }
};

export type ContractType = keyof typeof contractTemplates;

export const getTemplateById = (id: string) => {
  return contractTemplates[id as ContractType];
};

export const getAllTemplates = () => {
  return Object.entries(contractTemplates).map(([id, template]) => ({
    id,
    name: template.name,
    fields: template.fields,
    template: template.template
  }));
};
