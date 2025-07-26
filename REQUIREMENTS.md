# Requisitos do Projeto Nexus

Este documento detalha os requisitos funcionais e não funcionais do projeto Nexus, servindo como base para o desenvolvimento e a criação do schema do banco de dados com Prisma.

## Requisitos Funcionais

### VSL Player
- **Gerenciamento de Mídia:**
  - Upload de novos vídeos.
  - Editar configurações de vídeo (título).
  - Organizar vídeos em pastas.
  - Excluir VSLs.
- **Incorporação e Segurança:**
  - Gerar e copiar script/iframe para incorporar em páginas externas.
  - Definir domínios permitidos para reprodução do VSL.
- **Personalização do Player:**
  - Definir proporção do vídeo (aspect ratio).
  - Configurar controles do player (botão de play com templates, tamanho, cores, full screen, pause, volume).
  - Adicionar botões de ação (CTAs) durante o vídeo.
  - Habilitar "Smart Auto Play".
  - Exibir barra de progresso fictícia.
  - Habilitar funcionalidade "Continuar de onde parou".
- **Análise e Otimização:**
  - Dashboard com métricas: visualizações (hoje, semana), tempo médio, últimas visualizações.
  - Detalhes por VSL: gráfico de visualizações (últimos 7 dias), visualizações por navegador/dispositivo, taxa de retenção.
  - Configurar testes A/B em um VSL.

### Funil Builder
- **Gerenciamento de Funis:**
  - Criar funil a partir de templates ou do zero.
  - Clonar funil existente com todas as etapas.
  - Excluir funil.
- **Configuração do Funil:**
  - Definir domínio para o funil.
  - Adicionar/remover etapas (páginas) do funil.
  - Reordenar etapas do funil.
- **Editor de Páginas:**
  - Editor visual (arrastar e soltar) para construir páginas do funil.
  - Adicionar elementos: texto, imagens, vídeos, formulários.
- **Análise:**
  - Visualizar estatísticas de conversão para cada etapa do funil.

### Course Builder
- **Upload de Logo**: Suporte para upload de imagem (.png, .jpg, tamanho máx.: 2MB) ou URL externa.
- **Customização Visual**: Seleção de cor primária via seletor de cores (hex, RGB) com pré-visualização em tempo real.
- **Configurações Globais**: Salvamento automático em banco de dados com opção de restauração padrão.
- **Botão “Novo Curso”**: Inicia formulário para criação de curso.
- **Campos Obrigatórios**:
  - Nome do curso (máx. 100 caracteres).
  - Imagem de capa (resolução recomendada: 1920x1080px, formatos: .png, .jpg, tamanho máx.: 5MB).
  - URL de compra (opcional, validação de URL válida).
- **Funcionalidade**: Curso criado e listado automaticamente após salvamento, com ID único gerado.
- **Gerenciamento**: Editar, duplicar ou excluir cursos via interface.
- **Botão “Novo Módulo”**: Adiciona módulo a um curso específico.
- **Campos**:
  - Nome do módulo (ex.: "M1 - Introdução", máx. 50 caracteres).
  - Imagem do módulo (resolução recomendada: 1280x720px, formatos: .png, .jpg, tamanho máx.: 3MB).
- **Organização**: Módulos ordenáveis por arrastar/soltar na interface.
- **Campos**:
  - Nome da aula (máx. 100 caracteres).
  - Link da aula (suporte a vídeos ou e-books via Google Drive, YouTube, Vimeo, Kivano, Cacto, Hotmart).
  - Descrição (opcional, máx. 500 caracteres, suporte a markdown).
- **Integração de Links**: Reprodução de vídeos diretamente na plataforma (iframe para YouTube/Vimeo, visualizador para Drive).
- **Gerenciamento**: Adicionar, editar, excluir ou reordenar aulas por arrastar/soltar.
- **Importação via Link**: Suporte a links diretos de plataformas externas (Kivano, Cacto, Hotmart) sem download.
- **Validação**: Verificação de compatibilidade do link antes de salvar.
- **Botão “Olho”**: Pré-visualização do curso como administrador ou aluno.
- **Modos de Visualização**: Desktop (1200px+) e mobile (320px-768px), com alternância na interface.
- **Simulação de Aluno**: Importação de usuário teste para visualizar acesso e progresso.
- **Upload de Imagem**: Resolução recomendada (1920x300px, formatos: .png, .jpg, tamanho máx.: 3MB).
- **Funcionalidade**: Exibição de banners para promover outros produtos/cursos, com link clicável.
- **Gerenciamento**: Adicionar, editar ou excluir banners via interface.
- **Cadastro de Alunos**: Formulário com campos (nome, e-mail, senha).
- **Importação**: Suporte a importação em lote via CSV (nome, e-mail, curso inscrito).
- **Exclusão**: Remoção de alunos com confirmação de segurança.
- **Progresso**: Visualização de progresso por curso (porcentagem de conclusão, aulas assistidas).
- **Liberação de Aulas**: Ordem sequencial ou personalizada (ex.: desbloqueio manual).
- **Agendamento**: Liberação de conteúdo por data/hora (ex.: drip content).
- **Proteção**: Acesso restrito por login/senha
- **Perfil do Aluno**: Edição de informações (nome, e-mail, foto de perfil).
- **Certificados**: Geração automática de certificados em PDF ao concluir curso, com modelo personalizável.
- **Conclusão de Aula**: Botão para marcar aula como concluída, com sincronização em tempo real.
- **Relatórios**:
  - Acessos por curso/aluno (data, hora, duração).
  - Taxa de conclusão (% de aulas concluídas).
  - Tempo médio de visualização por aula.
- **Visualização**: Gráficos interativos
- **Ferramentas de Pagamento**: Integração com Hotmart, Kivano, Stripe via API.
- **E-mail Marketing**: Suporte a webhooks
- **API/Webhooks**: Eventos para inscrição, conclusão de curso, progresso de aluno.

### Self Checkout
- **Upload de Logo**: Suporte para upload de imagem (.png, .jpg, tamanho máx.: 2MB) ou URL externa.
- **Personalização Visual**: 
  - Seleção de cor primária (hex, RGB) com pré-visualização em tempo real.
  - Adição de vídeos promocionais (YouTube, Vimeo ou upload, máx.: 10MB).
  - Edição de elementos da página (textos, botões, fontes) via editor visual.
- **Configurações Globais**: Salvamento automático em banco de dados com opção de restauração padrão.
- **Botão “Novo Produto”**: Inicia formulário para cadastro de produto.
- **Campos Obrigatórios**:
  - Nome do produto (máx. 100 caracteres).
  - Imagem do produto (resolução recomendada: 1920x1080px, formatos: .png, .jpg, tamanho máx.: 5MB).
  - Preço (suporte a moedas: BRL, USD, EUR).
  - URL de redirecionamento pós-compra (opcional, para área de membros ou entrega digital).
- **Funcionalidades**:
  - Suporte a produtos ilimitados sem restrições.
  - Adição de order bumps e upsells personalizáveis por produto.
  - Geração automática de checkout para cada produto ou checkout único para múltiplos produtos.
- **Gateways Suportados**:
  - PushinPay, GhostsPay, Lunox Pay, PagBank, Pagar.me, Mercado Pago, Appmax, Asaas, Stripe, PayPal, Open Pix.
- **Funcionalidades**:
  - Recebimento instantâneo via Pix ou cartão diretamente na conta do usuário.
  - Configuração de chaves de API (ex.: Public Key, Access Token) para cada gateway.
  - Suporte a parcelamento (configurável via painel do gateway, ex.: Mercado Pago).
- **Segurança**:
  - Criptografia de dados de pagamento (AES-256).
  - Sistema anti-fraude integrado (ex.: verificação de chargeback, validação de transações).
- **Editor Visual**:
  - Customização de layout (cores, fontes, botões) via interface drag-and-drop.
  - Adição de imagens e textos promocionais.
  - Suporte a múltiplos checkouts personalizados por produto.
- **Relatórios Avançados**:
  - Vendas por produto, data ou gateway (valor, quantidade, taxa de conversão).
  - Taxa de reembolso e chargeback.
  - Tempo médio de conclusão de compra.
- **Visualização**:
  - Gráficos interativos (ex.: Chart.js).
  - Exportação de relatórios em CSV ou PDF.
- **Notificações**:
  - Alertas de vendas em tempo real via aplicativo mobile (iOS/Android) e e-mail.
  - Resumo diário de vendas e engajamento.
- **UTMfy API**: Rastreamento de campanhas via parâmetros UTM.
- **Facebook Ads**: Integração para conversão de eventos (ex.: pixel de rastreamento).
- **Webhooks**: Suporte a eventos (ex.: compra realizada, reembolso solicitado) para integração com ferramentas externas (ex.: ActiveCampaign, Zapier).
- **Controle Total**:
  - Painel para aprovar/rejeitar pedidos de reembolso.
  - Registro de motivo e histórico de reembolsos.
- **Automação**: Configuração de regras automáticas (ex.: reembolso em até 7 dias).

### Chat AI

- **Interface de Chat Conversacional**: Interface responsiva para troca de mensagens com a IA.
- **Histórico de Conversas**: Armazenamento de conversas anteriores com acesso fácil via interface (ex.: lista lateral com títulos e datas).
- **Gerenciamento de Sessões**:
  - Criar novas sessões de chat com nomes personalizados.
  - Salvar automaticamente o progresso da conversa.
  - Opção para renomear, excluir ou exportar sessões.
- **Integração com API de IA**: Suporte para modelos de linguagem.
- **Geração de imagens por Texto**:
  - Botão que ativa a função de geração de imagens por texto.
  - Visualização em galeria com opção de download (.png, .jpg).
- **Geração de imagens por Imagem e Texto**:
  - Upload de imagem como base (formatos suportados: .png, .jpg, .jpeg, tamanho máx.: 10MB).
  - Campo para prompt de texto complementar para gerar variações.
  - Exibição de resultados com comparação lado a lado (imagem original vs. gerada).
- **Feedback ao Usuário**: Indicadores de progresso durante a geração (ex.: barra de loading) e mensagens de erro claras.
- **Barra Lateral para Artefatos**:
  - Exibição de conteúdos gerados (ex.: códigos extensos, PDFs, imagens) em uma barra lateral expansível.
  - Cada item na barra lateral inclui título, data de criação e tipo de conteúdo (ex.: "Código Python", "PDF Gerado").
  - Suporte a visualização rápida (preview) de conteúdos sem sair da interface principal.
  - Opção de abrir artefatos em tela cheia ou em uma aba separada para edição detalhada.
- **Funcionalidades do Canvas**:
  - Renderização de conteúdos complexos (ex.: código com destaque de sintaxe, PDFs renderizados, diagramas).
  - Ferramentas de interação: copiar código, baixar arquivos (ex.: .py, .pdf), compartilhar via link.
  - Organização de artefatos: arrastar/soltar para reordenar, agrupar em pastas ou marcar como favoritos.
- **Gerenciamento de Projetos**:
  - Salvar artefatos automaticamente com nomes personalizáveis.
  - Carregar artefatos anteriores com histórico de revisões.
  - Suporte a múltiplos artefatos abertos simultaneamente (ex.: abas na barra lateral).



