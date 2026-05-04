# Guia de Instalação - Modern Panel SGA

## Pré-requisitos

- Node.js 22.13.0 ou superior
- npm ou pnpm instalado
- Acesso a um servidor Novo SGA CE v2.2.0
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## Instalação Local

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd modern-panel-sga
```

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O painel estará disponível em `http://localhost:3000`

## Configuração Inicial

### 1. Acessar as Configurações

Ao abrir o painel pela primeira vez, você será automaticamente redirecionado para a página de Configurações.

### 2. Preencher Dados do Servidor Novo SGA

Na aba **Conexão**, configure:

- **URL do Servidor**: Endereço completo do seu servidor (ex: `http://seu-servidor:8080`)
- **Nome do Módulo**: Geralmente `novo-sga`
- **Client ID**: Obtido ao registrar a aplicação no Novo SGA
- **Client Secret**: Chave secreta fornecida pelo Novo SGA
- **Usuário**: Credencial de acesso
- **Senha**: Credencial de acesso

### 3. Testar Conexão

Clique em **"Testar Conexão"** para validar as configurações. Se bem-sucedido, a lista de unidades será carregada automaticamente.

### 4. Selecionar Unidade e Serviços

- Escolha a unidade desejada no dropdown
- Marque os serviços que deseja monitorar
- Clique em **"Salvar"**

## Configurações Opcionais

### Vocalização de Senhas

Na aba **Vocalização**:
- Marque "Ativar vocalização de senhas"
- Escolha a voz (feminina ou masculina)
- Selecione o idioma (Português BR, Espanhol ou Inglês)

### Vídeo de Fundo

Na aba **Vídeo**:
- Cole a URL de um vídeo MP4
- O vídeo será reproduzido em loop como fundo
- Exemplo: `https://exemplo.com/video-background.mp4`

### Personalização Visual

Na aba **Aparência**:
- Escolha entre tema claro ou escuro
- Ajuste o tamanho da fonte
- Customize as cores primária e secundária

## Build para Produção

### 1. Compilar o Projeto

```bash
pnpm build
```

### 2. Testar a Build de Produção

```bash
pnpm preview
```

### 3. Deploy

O arquivo de build estará em `dist/`. Você pode fazer deploy em:

- **Plataformas Manus**: Use o botão Publish na interface
- **Servidores Próprios**: Copie o conteúdo de `dist/` para seu servidor web
- **Docker**: Crie um container com Node.js e execute `pnpm start`

## Estrutura de Arquivos

```
modern-panel-sga/
├── client/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes React reutilizáveis
│   │   ├── contexts/        # React Contexts (PanelContext)
│   │   ├── pages/           # Páginas (Home, Settings)
│   │   ├── services/        # Serviços (API, Speech)
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Ponto de entrada
│   │   └── index.css        # Estilos globais
│   └── index.html           # Template HTML
├── server/                  # Servidor Express (placeholder)
├── package.json             # Dependências do projeto
└── README.md                # Documentação
```

## Variáveis de Ambiente

O projeto usa `localStorage` para persistência de configurações. Não há variáveis de ambiente obrigatórias para o desenvolvimento local.

Para produção, você pode configurar:
- `VITE_API_URL`: URL base da API (se necessário)
- `VITE_APP_TITLE`: Título da aplicação

## Troubleshooting

### Erro: "Cannot find module"

Solução: Execute `pnpm install` novamente para garantir que todas as dependências estão instaladas.

### Erro: "Port 3000 already in use"

Solução: Use uma porta diferente com `pnpm dev -- --port 3001`

### Vocalização não funciona

Solução: Verifique se o navegador suporta Web Speech API (Chrome, Edge, Safari). Firefox pode exigir configuração adicional.

### Vídeo não carrega

Solução: Verifique se a URL é acessível e se o arquivo é um MP4 válido. Teste a URL em outro navegador.

## Performance

O painel é otimizado para:
- Carregamento rápido (< 2s em conexão 4G)
- Atualização em tempo real (polling a cada 2 segundos)
- Suporte a múltiplas resoluções de tela

## Segurança

- Senhas não são armazenadas em cookies ou localStorage (apenas em memória durante a sessão)
- Tokens OAuth são gerenciados automaticamente
- HTTPS é recomendado para produção
- Valide sempre as URLs de vídeo antes de usar em produção

## Suporte e Documentação

- Documentação do Novo SGA: Consulte a documentação oficial
- Issues e Pull Requests: Contribuições são bem-vindas
- Contato: Entre em contato com o time de desenvolvimento

---

**Última atualização**: Maio de 2026
