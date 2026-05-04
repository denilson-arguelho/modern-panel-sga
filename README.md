# Modern Panel SGA - Painel de Chamadas Moderno

Um painel moderno e intuitivo para chamada de senhas compatível com a API do **Novo SGA CE v2.2.0**. Desenvolvido com React 19, Tailwind CSS 4 e suporte a vídeo de fundo, vocalização de senhas e personalização completa da interface.

## 🎯 Características Principais

### Painel Principal
- **Exibição em Destaque**: Senha e local em tipografia grande e legível à distância
- **Indicador de Prioridade**: Barra colorida que muda conforme a urgência (azul normal, laranja prioritário)
- **Vídeo de Fundo**: Suporte a vídeos MP4 em loop como fundo com overlay semi-transparente
- **Histórico de Chamadas**: Sidebar com últimas 10 chamadas para referência rápida
- **Relógio Digital**: Exibição de hora e data em tempo real

### Configurações
- **Conexão com Novo SGA**: Configuração completa de servidor, módulo, credenciais OAuth
- **Seleção de Unidade e Serviços**: Interface intuitiva para escolher quais serviços monitorar
- **Teste de Conexão**: Validação imediata da configuração com feedback visual
- **Vocalização de Senhas**: 
  - Ativar/desativar vocalização
  - Escolher entre voz feminina ou masculina
  - Suporte a múltiplos idiomas (Português BR, Espanhol, Inglês)
- **Vídeo de Fundo**: URL configurável para vídeo de fundo
- **Personalização Visual**:
  - Tema claro/escuro
  - Tamanho de fonte (pequeno, médio, grande)
  - Cores primária e secundária personalizáveis

## 🚀 Como Usar

### 1. Acesso Inicial
Ao abrir o painel, você será redirecionado para a página de Configurações se nenhuma configuração estiver salva.

### 2. Configurar Conexão com Novo SGA

1. Clique na aba **"Conexão"**
2. Preencha os dados do servidor:
   - **URL do Servidor**: Endereço do seu servidor Novo SGA (ex: `http://localhost:8080`)
   - **Nome do Módulo**: Geralmente `novo-sga`
   - **Client ID**: ID da aplicação OAuth
   - **Client Secret**: Chave secreta da aplicação
   - **Usuário**: Usuário de acesso
   - **Senha**: Senha do usuário

3. Clique em **"Testar Conexão"** para validar as configurações
4. Selecione a **Unidade** desejada
5. Marque os **Serviços** que deseja monitorar
6. Clique em **"Salvar"**

### 3. Configurar Vocalização

1. Clique na aba **"Vocalização"**
2. Marque **"Ativar vocalização de senhas"** se desejar
3. Escolha a **Voz** (feminina ou masculina)
4. Selecione o **Idioma**
5. Clique em **"Salvar"**

### 4. Adicionar Vídeo de Fundo

1. Clique na aba **"Vídeo"**
2. Cole a URL de um vídeo MP4 no campo **"URL do Vídeo"**
   - Exemplo: `https://exemplo.com/video.mp4`
   - O vídeo será reproduzido em loop como fundo
3. Clique em **"Salvar"**

### 5. Personalizar Aparência

1. Clique na aba **"Aparência"**
2. Escolha o **Tema** (claro ou escuro)
3. Ajuste o **Tamanho da Fonte**
4. Customize as **Cores**:
   - Clique no quadrado de cor ou digite o código hexadecimal
5. Clique em **"Salvar"**

### 6. Usar o Painel

Após configurar, clique em **"Voltar"** ou use o botão de Configurações (⚙️) no painel para retornar à tela principal.

O painel exibirá:
- **Área Principal**: Senha e local da chamada atual em destaque
- **Sidebar Direita**: Histórico das últimas chamadas e relógio
- **Botão de Configurações**: Acesso rápido às configurações (canto superior esquerdo)
- **Status de Conexão**: Indicador de conexão no canto superior direito

## 🎨 Design e Paleta de Cores

### Paleta Corporativa
- **Primário**: Azul Profundo (#1E3A8A) - Confiança e corporatividade
- **Secundário**: Laranja Vibrante (#F97316) - Alertas e prioridades
- **Fundo**: Branco (#FFFFFF) com opções de tema escuro
- **Neutro**: Cinza (#F3F4F6 a #1F2937) - Hierarquia e legibilidade

### Tipografia
- **Display**: Poppins Bold (números de senha)
- **Heading**: Poppins SemiBold (locais)
- **Body**: Inter Regular (textos de suporte)

## 🔧 Tecnologias

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Speech Synthesis**: Web Speech API

## 📋 Requisitos

- Servidor Novo SGA CE v2.2.0 configurado e acessível
- Credenciais OAuth válidas
- Navegador moderno com suporte a Web Speech API (para vocalização)

## 🔐 Segurança

- Todas as configurações são armazenadas localmente no `localStorage`
- Senhas são armazenadas em campo de tipo `password` (não exibidas)
- A conexão com o servidor Novo SGA usa protocolo HTTPS recomendado
- Tokens de autenticação são gerenciados automaticamente

## 📱 Responsividade

O painel é otimizado para:
- **Displays Públicos**: Telas grandes (1080p, 4K)
- **Tablets**: Interfaces adaptáveis
- **Desktops**: Experiência completa

## 🐛 Troubleshooting

### Erro de Conexão
- Verifique se a URL do servidor está correta
- Confirme que as credenciais OAuth estão válidas
- Teste a conectividade com o servidor

### Vocalização Não Funciona
- Verifique se o navegador suporta Web Speech API
- Confirme se o áudio está ativado no dispositivo
- Teste em outro navegador

### Vídeo Não Carrega
- Verifique se a URL é acessível
- Confirme que o formato é MP4
- Teste a URL em outro navegador

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Novo SGA ou entre em contato com o suporte técnico.

---

**Desenvolvido com ❤️ para melhorar a experiência de chamada de senhas**
