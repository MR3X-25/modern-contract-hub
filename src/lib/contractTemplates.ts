export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
}

export const contractTemplates: ContractTemplate[] = [
  {
    id: "residential-pf-pf",
    name: "Locação Residencial - CPF x CPF",
    description: "Contrato entre pessoas físicas para imóvel residencial",
    content: `CONTRATO DE LOCAÇÃO RESIDENCIAL

Pelo presente instrumento particular de contrato de locação residencial, as partes:

LOCADOR(A):
Nome: [NOME_LOCADOR]
CPF: [CPF_LOCADOR]
Endereço: [ENDERECO_LOCADOR]
E-mail: [EMAIL_LOCADOR]
Telefone: [TELEFONE_LOCADOR]

LOCATÁRIO(A):
Nome: [NOME_LOCATARIO]
CPF: [CPF_LOCATARIO]
Endereço: [ENDERECO_LOCATARIO]
E-mail: [EMAIL_LOCATARIO]
Telefone: [TELEFONE_LOCATARIO]

Têm entre si, justo e contratado, o que segue:

CLÁUSULA 1 - OBJETO DO CONTRATO

1.1. O LOCADOR(a) dá em locação ao LOCATÁRIO(a) o imóvel de sua propriedade, localizado à [ENDERECO_IMOVEL], composto de [DESCRICAO_IMOVEL].

1.2. A locação destina-se exclusivamente para fins residenciais, sendo vedada qualquer outra utilização.

CLÁUSULA 2 - PRAZO

2.1. O prazo da locação será de [PRAZO_MESES] meses, com início em [DATA_INICIO] e término em [DATA_FIM], podendo ser prorrogado por acordo entre as partes.

2.2. Após o término, caso o LOCATÁRIO continue no imóvel sem oposição, a locação prorrogar-se-á por prazo indeterminado, nos termos do artigo 47 da Lei nº 8.245/91.

CLÁUSULA 3 - VALOR E FORMA DE PAGAMENTO

3.1. O aluguel mensal será de R$ [VALOR_ALUGUEL], com vencimento todo dia [DIA_VENCIMENTO] de cada mês, mediante pagamento via plataforma digital MR3X, Pix, boleto ou outro meio acordado.

3.2. O valor será reajustado anualmente, com base no índice [INDICE_REAJUSTE], conforme a legislação vigente.

CLÁUSULA 4 - ENCARGOS

4.1. Ficam a cargo do LOCATÁRIO:
- Pagamento do aluguel nas datas pactuadas;
- Despesas de consumo: água, luz, gás, internet, etc.;
- IPTU e taxa de condomínio (caso aplicável);
- Pequenos reparos decorrentes do uso normal do imóvel.

4.2. Ficam a cargo do LOCADOR:
- Impostos extraordinários;
- Obras estruturais;
- Garantir a entrega do imóvel em condições de uso.

CLÁUSULA 5 - MULTA E JUROS POR ATRASO

5.1. Em caso de atraso no pagamento do aluguel ou encargos, incidirá:
- Multa de 10% (dez por cento) sobre o valor devido (art. 413 do Código Civil);
- Juros moratórios de 1% (um por cento) ao mês;
- Correção monetária conforme índice pactuado.

CLÁUSULA 6 - GARANTIA LOCATÍCIA

6.1. O presente contrato será garantido por [TIPO_GARANTIA], nos termos dos artigos 37 e 38 da Lei do Inquilinato.

CLÁUSULA 7 - RESCISÃO CONTRATUAL

7.1. Em caso de rescisão antecipada por iniciativa do LOCATÁRIO, será devida multa proporcional ao tempo restante do contrato, limitada a 3 (três) aluguéis.

7.2. O LOCADOR poderá rescindir o contrato em caso de inadimplência superior a 3 (três) meses ou descumprimento contratual.

CLÁUSULA 8 - FORO

8.1. Fica eleito o foro da comarca de [COMARCA], para dirimir eventuais dúvidas ou litígios.

E por estarem assim justos e contratados, firmam o presente instrumento em 2 (duas) vias de igual teor e forma, para que produza seus efeitos legais.

[CIDADE], [DATA_ASSINATURA]

_________________________________
LOCADOR(A)

_________________________________
LOCATÁRIO(A)`
  },
  {
    id: "commercial-cnpj-cnpj",
    name: "Locação Comercial - CNPJ x CNPJ",
    description: "Contrato entre pessoas jurídicas para imóvel comercial",
    content: `CONTRATO DE LOCAÇÃO COMERCIAL ENTRE PESSOAS JURÍDICAS

Pelo presente instrumento particular de contrato de locação comercial, as partes abaixo identificadas:

LOCADOR(A):
Razão Social: [RAZAO_SOCIAL_LOCADOR]
CNPJ: [CNPJ_LOCADOR]
Endereço: [ENDERECO_LOCADOR]
Representante Legal: [REPRESENTANTE_LOCADOR]
Cargo: [CARGO_LOCADOR]
CPF: [CPF_REPRESENTANTE_LOCADOR]
E-mail: [EMAIL_LOCADOR]
Telefone: [TELEFONE_LOCADOR]

LOCATÁRIO(A):
Razão Social: [RAZAO_SOCIAL_LOCATARIO]
CNPJ: [CNPJ_LOCATARIO]
Endereço: [ENDERECO_LOCATARIO]
Representante Legal: [REPRESENTANTE_LOCATARIO]
Cargo: [CARGO_LOCATARIO]
CPF: [CPF_REPRESENTANTE_LOCATARIO]
E-mail: [EMAIL_LOCATARIO]
Telefone: [TELEFONE_LOCATARIO]

CLÁUSULA 1 – OBJETO

1.1. O LOCADOR dá em locação ao LOCATÁRIO o imóvel comercial localizado à [ENDERECO_IMOVEL], registrado sob matrícula nº [MATRICULA] no Cartório de Registro de Imóveis da comarca de [COMARCA].

1.2. O imóvel destina-se exclusivamente à instalação de [ATIVIDADE_COMERCIAL] da LOCATÁRIA, sendo vedado o uso para fins diversos ou residenciais sem autorização expressa do LOCADOR.

CLÁUSULA 2 – PRAZO

2.1. O prazo da locação será de [PRAZO_MESES] meses, iniciando-se em [DATA_INICIO] e encerrando-se em [DATA_FIM], podendo ser renovado mediante acordo entre as partes.

2.2. Caso o LOCATÁRIO permaneça no imóvel sem oposição após o término contratual, o contrato será automaticamente prorrogado por tempo indeterminado, regido pelas normas da Lei nº 8.245/91.

CLÁUSULA 3 – VALOR DO ALUGUEL

3.1. O aluguel mensal é de R$ [VALOR_ALUGUEL], com vencimento todo dia [DIA_VENCIMENTO] de cada mês.

3.2. O pagamento será realizado via Pix, boleto, transferência bancária ou pela plataforma MR3X, conforme opção do LOCADOR.

3.3. O valor será reajustado anualmente com base no índice [INDICE_REAJUSTE], conforme legislação vigente.

CLÁUSULA 4 – ENCARGOS

4.1. O LOCATÁRIO será responsável por:
- Contas de água, energia elétrica, gás, internet, limpeza e vigilância;
- IPTU e taxas municipais incidentes sobre o imóvel;
- Despesas condominiais ordinárias (se houver);
- Manutenção e reparos decorrentes do uso comum.

4.2. O LOCADOR será responsável por:
- Obrigações fiscais não transferíveis;
- Manutenção estrutural do imóvel e vícios ocultos;
- Regularização documental do imóvel perante órgãos públicos.

CLÁUSULA 5 – GARANTIA LOCATÍCIA

5.1. O presente contrato será garantido por meio de [TIPO_GARANTIA], conforme previsto nos artigos 37 a 40 da Lei nº 8.245/91.

CLÁUSULA 6 – MULTAS E ATRASOS

6.1. Em caso de inadimplência, será aplicada:
- Multa de 10% (dez por cento) sobre o valor da obrigação vencida;
- Juros de mora de 1% (um por cento) ao mês;
- Correção monetária pelo índice pactuado no contrato.

CLÁUSULA 7 – RESCISÃO

7.1. A rescisão antecipada por qualquer das partes deverá ser comunicada com antecedência mínima de 90 (noventa) dias, sob pena de multa correspondente a 3 (três) aluguéis.

CLÁUSULA 8 - FORO

8.1. Fica eleito o foro da comarca de [COMARCA], com renúncia expressa a qualquer outro, por mais privilegiado que seja.

E por estarem assim justos e contratados, firmam o presente contrato em 2 (duas) vias de igual teor e forma.

[CIDADE], [DATA_ASSINATURA]

_________________________________
LOCADOR(A)

_________________________________
LOCATÁRIO(A)`
  },
  {
    id: "platform-service",
    name: "Adesão ao Plano MR3X",
    description: "Contrato de adesão aos serviços da plataforma MR3X",
    content: `CONTRATO DE ADESÃO AO PLANO DE SERVIÇOS DA PLATAFORMA MR3X

MR3X TECNOLOGIA LTDA
CNPJ: 27.960.990/0001-66

1. DAS PARTES CONTRATANTES

CONTRATADA:
MR3X TECNOLOGIA LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 27.960.990/0001-66, com sede em [ENDERECO_MR3X], doravante denominada "MR3X".

CONTRATANTE:
Nome/Razão Social: [NOME_CONTRATANTE]
CPF/CNPJ: [DOCUMENTO_CONTRATANTE]
Endereço: [ENDERECO_CONTRATANTE]
E-mail: [EMAIL_CONTRATANTE]
Telefone: [TELEFONE_CONTRATANTE]

2. DO OBJETO

2.1. O presente contrato tem por objeto a contratação de licença de uso, por adesão, de software do tipo SaaS (Software as a Service), denominado "MR3X", voltado à gestão de aluguéis, locações, cobranças, notificações e funcionalidades relacionadas.

2.2. A adesão se dará mediante seleção de um dos planos disponíveis: [PLANO_SELECIONADO]

3. DOS PLANOS E VALORES

3.1. Plano contratado: [PLANO_SELECIONADO]
3.2. Valor mensal: R$ [VALOR_PLANO]
3.3. Forma de pagamento: [FORMA_PAGAMENTO]
3.4. Dia de vencimento: [DIA_VENCIMENTO]

4. DA VIGÊNCIA

4.1. Este contrato tem início na data de aceite eletrônico e vigência de [PERIODO_VIGENCIA], renovando-se automaticamente.

4.2. O CONTRATANTE poderá solicitar o cancelamento a qualquer momento, por meio do painel da conta ou contato oficial.

5. DOS DIREITOS E OBRIGAÇÕES

5.1. A MR3X se compromete a:
- Manter a plataforma disponível e funcional;
- Garantir suporte técnico conforme o plano contratado;
- Proteger os dados do CONTRATANTE conforme a LGPD.

5.2. O CONTRATANTE se compromete a:
- Utilizar a plataforma de forma lícita e ética;
- Manter seus dados cadastrais atualizados;
- Realizar o pagamento pontual das mensalidades.

6. DA PROTEÇÃO DE DADOS (LGPD)

6.1. A MR3X atua como controladora dos dados cadastrais e de uso da plataforma, comprometendo-se a:
- Tratar os dados pessoais exclusivamente para as finalidades do serviço;
- Implementar medidas de segurança técnicas e administrativas;
- Não compartilhar dados com terceiros sem autorização, salvo obrigação legal.

7. DAS PENALIDADES

7.1. O inadimplemento superior a 30 (trinta) dias poderá resultar na suspensão temporária do acesso.

7.2. O uso indevido da plataforma poderá acarretar o cancelamento imediato do contrato.

8. DO FORO

8.1. Fica eleito o foro da comarca de [COMARCA], para dirimir eventuais dúvidas ou litígios decorrentes deste contrato.

E por estarem assim justos e contratados, as partes confirmam o aceite eletrônico deste instrumento.

Data de aceite: [DATA_ACEITE]

Confirmação eletrônica via plataforma MR3X.`
  }
];

export const getTemplateById = (id: string): ContractTemplate | undefined => {
  return contractTemplates.find(template => template.id === id);
};
