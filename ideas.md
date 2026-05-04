# Brainstorm de Design - Painel Moderno de Chamadas SGA

## Contexto
Criar um painel de chamada de senhas moderno, intuitivo e compatível com a API do Novo SGA CE v2.2.0. O painel deve exibir informações de senhas chamadas de forma clara e legível à distância, com suporte a vídeo de fundo, vocalização de senhas e configurações personalizáveis.

---

## Resposta 1: Design Minimalista Corporativo com Foco em Legibilidade

**Design Movement:** Modernismo Corporativo / Bauhaus Digital

**Core Principles:**
1. **Hierarquia Clara:** Informações críticas (senha/local) ocupam espaço máximo com tipografia grande
2. **Espaço Negativo Estratégico:** Uso generoso de whitespace para reduzir poluição visual
3. **Contraste Alto:** Cores primárias (azul/laranja) contra fundo neutro para máxima legibilidade
4. **Funcionalidade Pura:** Cada elemento visual tem propósito, nada é decorativo

**Color Philosophy:**
- **Primário:** Azul profundo (#1E3A8A) para confiança e corporatividade
- **Secundário:** Laranja vibrante (#F97316) para chamadas/alertas
- **Neutro:** Cinza claro (#F3F4F6) como fundo, cinza escuro (#1F2937) para texto
- **Branco:** (#FFFFFF) para clareza máxima
- **Intenção:** Paleta corporativa que transmite profissionalismo e urgência quando necessário

**Layout Paradigm:**
- **Divisão Assimétrica:** Área principal (70%) para senha/local em destaque + sidebar (30%) para histórico e relógio
- **Orientação Vertical:** Informação flui de cima para baixo, facilitando leitura à distância
- **Vídeo de Fundo:** Posicionado atrás da área de destaque com overlay semi-transparente para manter legibilidade

**Signature Elements:**
1. **Card de Destaque Flutuante:** Senha e local em um card com sombra suave, destacado sobre o vídeo
2. **Indicador de Prioridade:** Barra lateral colorida (azul normal, laranja prioritário) que muda conforme a urgência
3. **Histórico Compacto:** Lista vertical com ícones de status (chamada, atendida, etc.)

**Interaction Philosophy:**
- **Feedback Imediato:** Animações suaves ao chamar uma nova senha (fade-in da card, pulsação do indicador)
- **Transições Fluidas:** Mudanças de estado com transições de 300-500ms
- **Hover Effects:** Elementos interativos (menu, botões) com mudança de cor/elevação

**Animation:**
- **Entrada de Senha:** Fade-in + scale-up (0.3s) quando uma nova senha é chamada
- **Indicador de Prioridade:** Pulsação suave (1.5s) para senhas prioritárias
- **Transição de Histórico:** Slide-in dos itens do lado direito
- **Hover de Botões:** Elevação com sombra aumentada + mudança de cor

**Typography System:**
- **Display:** Poppins Bold 120px para número da senha
- **Heading:** Poppins SemiBold 48px para local
- **Body:** Inter Regular 18px para texto de suporte
- **Pequeno:** Inter Regular 14px para histórico e detalhes

**Probability:** 0.08

---

## Resposta 2: Design Moderno com Elementos Geométricos Dinâmicos

**Design Movement:** Neomorfismo Contemporâneo com Geometria Abstrata

**Core Principles:**
1. **Formas Geométricas:** Uso de retângulos, triângulos e círculos para criar composição visual interessante
2. **Gradientes Sutis:** Transições suaves entre cores para profundidade
3. **Movimento Contínuo:** Elementos animados que sugerem fluxo de dados
4. **Equilíbrio Dinâmico:** Composição assimétrica mas equilibrada visualmente

**Color Philosophy:**
- **Primário:** Azul gradiente (#0EA5E9 a #1E40AF) para modernidade
- **Secundário:** Laranja gradiente (#FB923C a #EA580C) para destaque
- **Fundo:** Gradiente cinza (#F8FAFC a #E2E8F0) para profundidade
- **Acentos:** Branco e cinza escuro para contraste
- **Intenção:** Paleta dinâmica que transmite energia e inovação

**Layout Paradigm:**
- **Composição em Z:** Informação principal no topo-esquerda, histórico no topo-direita, vídeo/controles na base
- **Overlays Flutuantes:** Elementos de informação flutuam sobre o vídeo com bordas arredondadas
- **Rede de Elementos:** Pequenos indicadores conectados visualmente ao elemento principal

**Signature Elements:**
1. **Card com Borda Gradiente:** Senha/local em card com borda que muda de cor conforme prioridade
2. **Indicadores Circulares:** Pontos animados que indicam status de conexão e chamadas
3. **Linhas Dinâmicas:** Linhas que conectam elementos principais, sugerindo fluxo de dados

**Interaction Philosophy:**
- **Micro-interações:** Cada ação gera feedback visual (botão pressionado expande, ícone gira)
- **Efeitos de Partículas:** Pequenas animações ao chamar uma senha
- **Transformações Suaves:** Elementos mudam de forma/cor com transições fluidas

**Animation:**
- **Entrada de Senha:** Desenho da borda gradiente (0.6s) + fade-in do conteúdo
- **Indicadores Circulares:** Rotação contínua lenta (3s) para indicar atividade
- **Linhas Dinâmicas:** Animação de traçado (0.8s) ao atualizar dados
- **Pulsação de Prioridade:** Expansão e contração do indicador (1s)

**Typography System:**
- **Display:** Montserrat Bold 110px para número da senha
- **Heading:** Montserrat SemiBold 44px para local
- **Body:** Roboto Regular 16px para texto de suporte
- **Pequeno:** Roboto Regular 12px para histórico

**Probability:** 0.07

---

## Resposta 3: Design Elegante com Foco em Tipografia e Espaço

**Design Movement:** Design Suíço Contemporâneo com Minimalismo Elegante

**Core Principles:**
1. **Tipografia como Protagonista:** Hierarquia tipográfica forte, sem imagens decorativas
2. **Proporção Áurea:** Layout baseado em proporções harmônicas
3. **Monocromático com Acentos:** Paleta principalmente cinza com acentos em azul/laranja
4. **Silêncio Visual:** Máximo de espaço em branco, mínimo de elementos

**Color Philosophy:**
- **Primário:** Azul profundo (#0F172A) para texto e estrutura
- **Secundário:** Laranja (#FF6B35) apenas para alertas críticos
- **Fundo:** Branco puro (#FFFFFF) com áreas cinza muito claro (#F9FAFB)
- **Neutro:** Cinza em várias tonalidades para hierarquia
- **Intenção:** Elegância através da simplicidade, confiança através da clareza

**Layout Paradigm:**
- **Grid Simétrico:** Divisão 2/3 (conteúdo) e 1/3 (sidebar) com alinhamento rigoroso
- **Linhas Guia Invisíveis:** Elementos alinhados em múltiplos de 8px
- **Vídeo Integrado:** Vídeo ocupa fundo com overlay semi-transparente branco (80% opacidade) para máxima legibilidade

**Signature Elements:**
1. **Tipografia em Escala:** Números enormes com espaçamento generoso
2. **Linha Divisória Sutil:** Linha horizontal cinza clara separando seções
3. **Indicador de Status Minimalista:** Pequeno quadrado colorido indicando prioridade

**Interaction Philosophy:**
- **Transições Suaves:** Mudanças de estado com fade (200-300ms)
- **Hover Minimalista:** Apenas mudança de cor ou peso de fonte
- **Feedback Textual:** Mensagens claras de status em tipografia pequena

**Animation:**
- **Entrada de Senha:** Fade-in simples (0.3s) com aumento de tamanho
- **Mudança de Prioridade:** Mudança de cor da linha indicadora (0.5s)
- **Transição de Histórico:** Slide suave do lado direito (0.4s)
- **Hover de Elementos:** Mudança de cor de fonte (0.2s)

**Typography System:**
- **Display:** Playfair Display Bold 140px para número da senha
- **Heading:** Playfair Display SemiBold 52px para local
- **Body:** Lato Regular 16px para texto de suporte
- **Pequeno:** Lato Regular 13px para histórico e detalhes

**Probability:** 0.06

---

## Decisão de Design Escolhida

**Selecionado: Resposta 1 - Design Minimalista Corporativo com Foco em Legibilidade**

Este design foi escolhido porque:

1. **Legibilidade à Distância:** A hierarquia clara e o contraste alto garantem que as informações sejam lidas facilmente de longe
2. **Profissionalismo:** Paleta corporativa transmite confiança e seriedade apropriada para ambiente público
3. **Funcionalidade Pura:** Cada elemento tem propósito, facilitando manutenção e customização
4. **Compatibilidade com Vídeo:** O overlay semi-transparente permite usar vídeos de fundo sem comprometer legibilidade
5. **Acessibilidade:** Design simples e com alto contraste beneficia usuários com deficiências visuais

### Diretrizes de Implementação

- **Tipografia:** Poppins para display (números), Inter para corpo
- **Cores Primárias:** Azul #1E3A8A, Laranja #F97316, Cinza #F3F4F6
- **Espaçamento:** Múltiplos de 8px para consistência
- **Animações:** Transições suaves de 300-500ms
- **Vídeo:** Overlay com 60% de opacidade para manter legibilidade
- **Responsividade:** Priorizar telas grandes (displays públicos), mas manter usabilidade em tablets

