# Integração com Novo SGA CE v2.2.0 - Guia Técnico

## Comunicação com a API

Este documento descreve como o painel se comunica com o servidor Novo SGA e como resolver problemas comuns de integração.

## Fluxo de Autenticação

### 1. Obtenção do Token (OAuth2 Password Grant)

**Endpoint**: `POST /api/token`

**Corpo da Requisição** (URLSearchParams):
```
grant_type=password
client_id=<seu_client_id>
client_secret=<seu_client_secret>
username=<usuario>
password=<senha>
```

**Headers Obrigatórios**:
```
Content-Type: application/x-www-form-urlencoded
```

**Resposta de Sucesso** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "refresh_token_value"
}
```

### 2. Refresh do Token

**Endpoint**: `POST /api/token`

**Corpo da Requisição** (URLSearchParams):
```
grant_type=refresh_token
client_id=<seu_client_id>
client_secret=<seu_client_secret>
refresh_token=<refresh_token>
```

**Headers Obrigatórios**:
```
Content-Type: application/x-www-form-urlencoded
```

## Endpoints da API

Todos os endpoints abaixo requerem o header:
```
Authorization: Bearer <access_token>
```

### Informações da API

**GET** `/api`

Retorna informações sobre a API do servidor.

### Listar Unidades

**GET** `/api/unidades`

Retorna lista de unidades disponíveis.

**Resposta**:
```json
[
  {
    "id": 1,
    "nome": "Unidade 1",
    "descricao": "Descrição da unidade"
  }
]
```

### Listar Serviços de uma Unidade

**GET** `/api/unidades/{unityId}/servicos`

Retorna lista de serviços disponíveis para uma unidade.

**Resposta**:
```json
[
  {
    "id": 1,
    "nome": "Serviço 1",
    "descricao": "Descrição do serviço"
  }
]
```

### Obter Mensagens do Painel

**GET** `/api/unidades/{unityId}/painel?servicos=1,2,3`

Retorna as senhas chamadas para os serviços especificados.

**Query Parameters**:
- `servicos`: IDs dos serviços separados por vírgula

**Resposta**:
```json
[
  {
    "id": "123",
    "siglaSenha": "A",
    "numeroSenha": 1,
    "local": "Guichê",
    "numeroLocal": 1,
    "prioridade": "Normal",
    "peso": 0
  }
]
```

## Resolvendo Erros Comuns

### Erro: CORS Policy Blocked

**Causa**: O servidor não está configurado para aceitar requisições de origem diferente.

**Solução**:
1. Verifique se o servidor Novo SGA está configurado com CORS habilitado
2. Adicione a URL do painel à lista de origens permitidas no servidor
3. Use HTTPS em produção (não misture HTTP/HTTPS)

### Erro: net::ERR_FAILED no Token

**Causa**: Falha na conexão com o servidor de autenticação.

**Solução**:
1. Verifique se a URL do servidor está correta
2. Confirme que o servidor está acessível
3. Teste a conexão com curl: `curl -X POST http://seu-servidor/api/token -d "grant_type=password&..."`

### Erro: 401 Unauthorized

**Causa**: Token expirado ou credenciais inválidas.

**Solução**:
1. Verifique se as credenciais (client_id, client_secret, username, password) estão corretas
2. O painel tentará automaticamente renovar o token usando o refresh_token
3. Se persistir, faça login novamente

### Erro: 403 Forbidden

**Causa**: Usuário não tem permissão para acessar o recurso.

**Solução**:
1. Verifique se o usuário tem permissão para acessar a unidade e serviços
2. Confirme as permissões no servidor Novo SGA

## Implementação no Painel

### Classe SGAClient

O painel usa a classe `SGAClient` para gerenciar toda a comunicação:

```typescript
const client = new SGAClient({
  server: 'http://seu-servidor:8080',
  moduleName: 'novo-sga',
  clientId: 'seu_client_id',
  clientSecret: 'seu_client_secret',
  username: 'usuario',
  password: 'senha'
});

// Autenticar
const result = await client.authenticate(
  clientId,
  clientSecret,
  username,
  password
);

// Obter unidades
const unities = await client.getUnities();

// Obter serviços
const services = await client.getServices(unityId);

// Obter mensagens
const messages = await client.getMessages(unityId, [serviceId1, serviceId2]);
```

### Interceptadores Automáticos

O cliente implementa interceptadores que:
1. Adicionam automaticamente o token Bearer a todas as requisições
2. Renovam o token automaticamente quando expira (401)
3. Tratam erros de conexão com retry exponencial

## Polling em Tempo Real

O painel faz polling a cada 2 segundos para buscar novas mensagens:

```typescript
const interval = setInterval(async () => {
  const result = await client.getMessages(unityId, serviceIds);
  if (result.success && result.data.length > 0) {
    // Processar nova mensagem
  }
}, 2000);
```

## Melhorias Futuras

### Server-Sent Events (SSE)

Para reduzir latência, considere implementar SSE:

```typescript
const eventSource = new EventSource(
  `/api/unidades/${unityId}/painel/stream?servicos=1,2,3`,
  { headers: { Authorization: `Bearer ${token}` } }
);

eventSource.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Processar mensagem em tempo real
};
```

### WebSocket

Para comunicação bidirecional em tempo real:

```typescript
const ws = new WebSocket(
  `ws://seu-servidor/api/unidades/${unityId}/painel/ws`
);

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Processar mensagem
};
```

## Segurança

1. **HTTPS em Produção**: Sempre use HTTPS para proteger tokens
2. **Validação de Certificado**: Configure validação adequada de SSL/TLS
3. **Armazenamento de Tokens**: Tokens são armazenados apenas em memória durante a sessão
4. **Expiração de Token**: Configure tempo de expiração apropriado no servidor
5. **Refresh Token**: Use refresh tokens para renovação automática

## Debugging

### Habilitar Logs de Requisição

No console do navegador:

```javascript
// Ver todas as requisições
localStorage.setItem('debug', '*');
```

### Inspecionar Requisições

Use as Developer Tools do navegador (F12):
1. Aba Network para ver requisições HTTP
2. Aba Console para ver erros
3. Aba Storage para ver dados persistidos

### Testar Endpoints com cURL

```bash
# Obter token
curl -X POST http://seu-servidor/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&client_id=xxx&client_secret=xxx&username=xxx&password=xxx"

# Obter unidades
curl -X GET http://seu-servidor/api/unidades \
  -H "Authorization: Bearer <token>"

# Obter mensagens
curl -X GET "http://seu-servidor/api/unidades/1/painel?servicos=1,2" \
  -H "Authorization: Bearer <token>"
```

---

**Última atualização**: Maio de 2026
