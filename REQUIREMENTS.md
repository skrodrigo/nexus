# Requisitos do Projeto Nexus

Este documento detalha os requisitos funcionais e não funcionais do projeto Nexus, servindo como base para o desenvolvimento e a criação do schema do banco de dados com Prisma.

## Requisitos Funcionais

### 1. Criador de Criativos
- **Geração por Texto:** Usuário pode gerar imagens a partir de um prompt de texto.
- **Geração por Imagem e Texto:** Usuário pode enviar uma imagem e um prompt para gerar variações.
- **Histórico:** Armazena e exibe histórico de criativos gerados pelo usuário em uma barra lateral.

### 2. Gerenciador de VSL (Video Sales Letter)
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

### 3. Construtor de Funis
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

### 4. Área de Membros
#### Configurações Iniciais
- Upload da logo (imagem ou URL).
- Escolha de cor primária para customização visual.

#### Criação de Cursos
- Botão “Novo Curso”.
- Campos obrigatórios:
  - Nome do curso.
  - Imagem de capa (com resolução recomendada).
  - URL de compra (opcional).
- Curso criado automaticamente após salvar.

#### Cadastro de Módulos
- Botão “Módulo”.
- Campos:
  - Nome do módulo (ex: "m1").
  - Upload de imagem do módulo.

#### Cadastro de Aulas
- Campos:
  - Nome da aula.
  - Link da aula (vídeo ou e-book via Drive).
  - Descrição (opcional).
- Suporte a:
  - Links de plataformas externas (Kivano, Cacto, Hotmart, etc.).
  - YouTube, Vimeo.
  - Links do Google Drive (abertura dentro da plataforma).

#### Importação de Aulas
- Importação via link direto de plataformas externas (sem download).
- Suporte a plugin externo para capturar links (ex: Video Helper do Lodge).

#### Visualização
- Botão “Olho” para prévia do curso.
- Visualização em modo desktop e mobile.
- Importar aluno (teste) para simular acesso como aluno.

#### Cadastro de Banners
- Upload de imagem com dimensão recomendada.
- Uso para promover outros produtos.

#### Gerenciamento de Usuários
- Cadastro e importação de alunos.
- Exclusão de alunos.
- Visualização de progresso do aluno por curso.

#### Controle de Acesso
- Liberação/desbloqueio de aulas por ordem.
- Agendamento de liberação de conteúdo.
- Conteúdo protegido por login e senha.

#### Personalização da Experiência
- Perfil do aluno (edição de informações pessoais).
- Certificados de conclusão de curso.
- Funcionalidade para marcar aula como concluída.

#### Suporte e Comunicação
- Canal de suporte (chat, link ou botão de ajuda).
- Comentários em aulas ou sistema de feedback.

#### Estatísticas
- Relatórios de acesso e visualização por curso/aluno.
- Controle de engajamento (ex: taxa de conclusão, tempo de visualização).

#### Integrações
- Integração com ferramentas de pagamento (ex: Hotmart, Kivano).
- Integração com ferramentas de e-mail marketing.
- Suporte a webhooks ou API para eventos (ex: inscrição, conclusão).

#### Responsividade e Acessibilidade
- Interface responsiva com visualização otimizada para mobile.
- Suporte a acessibilidade (navegação por teclado e compatibilidade com leitores de tela).

#### Requisitos Técnicos
- Imagens com resolução sugerida para capas e banners.
- Links de vídeo compatíveis com plataformas suportadas.
- Plugins auxiliares para importação de links (opcional).

### 5. Chat AI
- **Interface de Chat Conversacional:**
  - Interação em tempo real com a IA.
  - Histórico de conversas anteriores.
  - Capacidade de iniciar, salvar e nomear sessões de chat.
- **Canvas de IA (Área de Trabalho):**
  - Espaço de trabalho livre para colaboração com a IA em tarefas complexas.
  - Ideal para brainstorming, criação de outlines para VSLs, planejamento de funis, etc.
  - Salvar e carregar diferentes projetos no canvas.