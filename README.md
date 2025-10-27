# SPA React - Gerenciamento de Seleções Copa 2022

Single Page Application desenvolvida em React com TypeScript, focada na criação de componentes reutilizáveis e gerenciamento de estado global para administração de seleções da Copa do Mundo 2022.

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Zustand
- CSS3

## Descrição

Este projeto demonstra a criação de componentes React reutilizáveis, gerenciamento de estado local e global seguindo boas práticas de desenvolvimento. A aplicação permite adicionar, visualizar e remover seleções de futebol, com persistência automática de dados no navegador usando Zustand.

## Componentes Criados

### 1. Button

Componente de botão reutilizável com suporte a diferentes variantes visuais e tipos.

**Props:**

| Prop     | Tipo                                 | Obrigatório | Descrição                                  |
| -------- | ------------------------------------ | ----------- | ------------------------------------------ |
| children | React.ReactNode                      | Sim         | Conteúdo do botão                          |
| onClick  | () => void                           | Sim         | Função executada ao clicar                 |
| variant  | "primary" \| "secondary" \| "danger" | Não         | Variante visual do botão (padrão: primary) |
| disabled | boolean                              | Não         | Se o botão está desabilitado               |
| type     | "button" \| "submit" \| "reset"      | Não         | Tipo do botão HTML (padrão: button)        |

**Exemplo de uso:**

```typescript
<Button onClick={handleClick} variant="primary">
  Clique aqui
</Button>

<Button onClick={handleDelete} variant="danger" disabled>
  Excluir
</Button>

<Button type="submit" variant="primary">
  Enviar
</Button>
```

### 2. Card

Componente de card para agrupar conteúdo relacionado com título e rodapé opcionais.

**Props:**

| Prop     | Tipo            | Obrigatório | Descrição                              |
| -------- | --------------- | ----------- | -------------------------------------- |
| title    | string          | Não         | Título do card                         |
| children | React.ReactNode | Sim         | Conteúdo principal do card             |
| footer   | React.ReactNode | Não         | Conteúdo do rodapé (geralmente botões) |

**Exemplo de uso:**

```typescript
<Card
  title="Brasil"
  footer={
    <>
      <Button variant="secondary" onClick={handleView}>
        Ver Detalhes
      </Button>
      <Button variant="primary" onClick={handleEdit}>
        Editar
      </Button>
    </>
  }
>
  <p>Grupo G - Pontos: 9</p>
  <p>Títulos: 5</p>
</Card>
```

### 3. Input

Componente de input controlado com label opcional e suporte a diferentes tipos.

**Props:**

| Prop        | Tipo                    | Obrigatório | Descrição                         |
| ----------- | ----------------------- | ----------- | --------------------------------- |
| label       | string                  | Não         | Texto do label acima do input     |
| type        | string                  | Não         | Tipo do input HTML (padrão: text) |
| placeholder | string                  | Não         | Texto de placeholder              |
| value       | string                  | Sim         | Valor atual do input              |
| onChange    | (value: string) => void | Sim         | Função chamada ao mudar o valor   |
| disabled    | boolean                 | Não         | Se o input está desabilitado      |

**Exemplo de uso:**

```typescript
<Input
  label="Nome da Seleção"
  placeholder="Digite o nome..."
  value={nome}
  onChange={setNome}
/>

<Input
  label="Títulos"
  type="number"
  value={String(titulos)}
  onChange={(value) => setTitulos(Number(value))}
/>
```

### 4. SelecaoForm

Componente de formulário para adicionar novas seleções, demonstrando uso de múltiplos estados locais.

**Props:**

| Prop     | Tipo                     | Obrigatório | Descrição                                 |
| -------- | ------------------------ | ----------- | ----------------------------------------- |
| onSubmit | (selecao: {...}) => void | Sim         | Callback executado ao submeter formulário |

**Exemplo de uso:**

```typescript
<SelecaoForm onSubmit={adicionarSelecao} />
```

## Gerenciamento de Estado

### useState (Estado Local)

O hook `useState` é utilizado para estado local de componentes:

**No formulário (SelecaoForm):**

- Gerencia o estado de cada campo do formulário (nome, grupo, títulos)
- Permite criar inputs controlados onde React controla o valor
- Limpa os campos após submissão

**Características:**

- Estado privado do componente
- Não compartilhado com outros componentes
- Ideal para formulários e interações locais

---

### Zustand (Estado Global)

O Zustand é uma biblioteca minimalista para gerenciamento de estado global no React.

#### Por que usar Zustand?

**Problema do Prop Drilling:**

```
App (tem estado)
 ├── Form (precisa da função adicionar)
 ├── Card (precisa da função deletar)
 └── Card
     └── Button (precisa da função deletar)
```

Passar props por múltiplos níveis é trabalhoso e dificulta manutenção.

**Solução com Zustand:**

```
Store Global (estado centralizado)
    ↓
Qualquer componente acessa diretamente
```

#### Estrutura da Store

**Localização:** `src/store/selecaoStore.ts`

A store é composta por:

**1. Interface do Estado:**

```typescript
interface SelecaoState {
  selecoes: Selecao[];              // estado (array de seleções)
  adicionarSelecao: (...) => void;  // ação para adicionar
  deletarSelecao: (...) => void;    // ação para deletar
}
```

**2. Criação da Store:**

```typescript
export const useSelecaoStore = create(
  persist<SelecaoState>(
    (set) => ({
      // estado inicial e ações
    }),
    { name: "selecoes-storage" }
  )
);
```

**3. Estado Inicial:**

```typescript
selecoes: [];
```

**4. Ações (Funções que modificam o estado):**

```typescript
adicionarSelecao: (dados) => {
  set((state) => ({
    selecoes: [...state.selecoes, { id: ..., ...dados }]
  }));
}

deletarSelecao: (id) => {
  set((state) => ({
    selecoes: state.selecoes.filter(s => s.id !== id)
  }));
}
```

#### Como usar a Store

**Acessar estado e ações:**

```typescript
// Pegar apenas as seleções
const selecoes = useSelecaoStore((state) => state.selecoes);

// Pegar apenas uma função
const adicionarSelecao = useSelecaoStore((state) => state.adicionarSelecao);

// Pegar múltiplas coisas
const { selecoes, adicionarSelecao, deletarSelecao } = useSelecaoStore();
```

**Em qualquer componente:**

```typescript
import { useSelecaoStore } from "./store/selecaoStore";

function MeuComponente() {
  const selecoes = useSelecaoStore((state) => state.selecoes);

  return <div>Total: {selecoes.length}</div>;
}
```

#### Middleware Persist

O Zustand utiliza o middleware `persist` para salvar automaticamente no localStorage:

**Configuração:**

```typescript
persist<SelecaoState>(
  (set) => ({ ... }),
  {
    name: 'selecoes-storage', // chave no localStorage
  }
)
```

**Funcionamento:**

- Toda mudança no estado é automaticamente salva no localStorage
- Ao carregar a página, o estado é restaurado automaticamente
- Não precisa de useEffect manual
- Funciona de forma transparente

**Verificar no navegador:**

1. F12 → Application/Storage
2. Local Storage → localhost
3. Chave: `selecoes-storage`
4. Valor: JSON com todas as seleções

#### Vantagens do Zustand

**1. Sem Prop Drilling:**

- Componentes acessam estado diretamente
- Não precisa passar props por múltiplos níveis
- Código mais limpo e manutenível

**2. Simplicidade:**

- API minimalista e intuitiva
- Menos boilerplate que Redux
- Fácil de aprender e usar

**3. TypeScript First:**

- Suporte completo a tipos
- Autocomplete em todas as operações
- Type safety garantido

**4. Performance:**

- Componentes só re-renderizam quando suas dependências mudam
- Seleção granular de estado
- Otimizado por padrão

**5. Persistência Fácil:**

- Middleware persist integrado
- Configuração em 2 linhas
- Sincronização automática

**6. DevTools:**

- Integração com Redux DevTools
- Debug facilitado
- Inspeção de estado e ações

#### Comparação: useState vs Zustand

| Aspecto          | useState                    | Zustand                          |
| ---------------- | --------------------------- | -------------------------------- |
| Escopo           | Local (componente)          | Global (aplicação)               |
| Compartilhamento | Via props (prop drilling)   | Acesso direto                    |
| Persistência     | useEffect manual            | Middleware persist               |
| Performance      | Re-renderiza componente pai | Re-renderiza apenas consumidores |
| Complexidade     | Simples para estado local   | Simples para estado global       |
| Melhor para      | Formulários, toggles        | Estado compartilhado, cache      |

### useEffect

O hook `useEffect` foi inicialmente usado para sincronizar com localStorage, mas foi substituído pelo middleware `persist` do Zustand que faz isso automaticamente.

**Uso anterior (com useState):**

```typescript
useEffect(() => {
  localStorage.setItem("selecoes", JSON.stringify(selecoes));
}, [selecoes]);
```

**Atualmente (com Zustand persist):**

- Não precisa de useEffect
- Persistência automática
- Menos código para manter

### Comunicação Entre Componentes

**Pai para Filho (Props):**

- App passa `onSubmit` para SelecaoForm
- Dados fluem de cima para baixo

**Filho para Pai (Callbacks):**

- SelecaoForm notifica App via callback
- Eventos fluem de baixo para cima

**Acesso Global (Zustand):**

- Qualquer componente acessa a store diretamente
- Não precisa de props ou callbacks
- Comunicação direta com o estado

## Estrutura do Projeto

```
src/
├── components/
│   ├── Button.tsx
│   ├── Button.css
│   ├── Card.tsx
│   ├── Card.css
│   ├── Input.tsx
│   ├── Input.css
│   └── SelecaoForm.tsx
├── store/
│   └── selecaoStore.ts
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Funcionalidades da Aplicação

- Adicionar novas seleções através de formulário
- Visualizar lista de seleções em cards
- Deletar seleções existentes
- Persistência automática de dados com Zustand persist
- Estado global acessível por qualquer componente
- Interface responsiva e componentizada
- Validação de tipos em tempo de desenvolvimento com TypeScript

## Como Executar

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
pnpm build
```

### Preview da Build

```bash
pnpm preview
```

## Conceitos React Demonstrados

- **Componentes Funcionais:** Todos os componentes usam função + hooks
- **Props:** Passagem de dados de pai para filho
- **Callbacks:** Comunicação de filho para pai
- **useState:** Gerenciamento de estado local (formulários)
- **Zustand:** Gerenciamento de estado global (lista de seleções)
- **Controlled Components:** Inputs controlados pelo React
- **Renderização Condicional:** Elementos opcionais baseados em props
- **Listas e Keys:** Renderização dinâmica com .map()
- **Event Handling:** Manipulação de eventos de formulário e cliques
- **Middleware:** Uso de persist para localStorage
- **Imutabilidade:** Atualização de estado sem mutação

## Entregas Implementadas

### Tópico 17: Componentes Reutilizáveis

- Button, Card, Input
- Props tipadas com TypeScript
- Variants e customização

### Tópico 18: Estado e Comunicação

- useState para estado local
- Props e callbacks para comunicação
- Formulários controlados

### Tópico 19: Estado Global com Zustand

- Store centralizada
- Ações imutáveis
- Middleware persist para localStorage
- Eliminação de prop drilling
