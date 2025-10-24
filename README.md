# SPA React - Gerenciamento de Seleções Copa 2022

Single Page Application desenvolvida em React com TypeScript, focada na criação de componentes reutilizáveis e gerenciamento de estado para administração de seleções da Copa do Mundo 2022.

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- CSS3

## Descrição

Este projeto demonstra a criação de componentes React reutilizáveis e gerenciamento de estado seguindo boas práticas de desenvolvimento. A aplicação permite adicionar, visualizar e remover seleções de futebol, com persistência de dados no navegador.

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

## Gerenciamento de Estado e Comunicação

### useState

O hook `useState` é utilizado em diferentes contextos na aplicação:

**No formulário (SelecaoForm):**

- Gerencia o estado local de cada campo do formulário (nome, grupo, títulos)
- Permite criar inputs controlados onde React controla o valor
- Limpa os campos após submissão

**No App:**

- Gerencia a lista completa de seleções
- Permite adicionar e remover itens do array
- Causa re-renderização quando o estado muda

### useEffect

O hook `useEffect` é usado para sincronizar o estado com o localStorage:

**Carregamento inicial:**

- Ao montar o componente, verifica se existem dados salvos no localStorage
- Se existirem, carrega as seleções salvas
- Se não, inicia com array vazio

**Persistência automática:**

- Monitora mudanças no array de seleções (dependência: `[selecoes]`)
- Sempre que o array muda (adição/remoção), salva automaticamente no localStorage
- Garante que os dados persistam mesmo após recarregar a página

### Comunicação Entre Componentes

A aplicação demonstra diferentes padrões de comunicação:

**Pai para Filho (Props):**

- App passa `onSubmit` para SelecaoForm
- App passa dados de cada seleção para Card via props
- App passa funções (`deletarSelecao`) via onClick dos botões

**Filho para Pai (Callbacks):**

- SelecaoForm notifica App quando formulário é enviado via `onSubmit`
- Button notifica componentes pais via `onClick`
- Card executa callbacks recebidas nos botões do footer

**Fluxo de dados unidirecional:**

- Dados fluem de cima para baixo (App → componentes filhos)
- Eventos fluem de baixo para cima (componentes filhos → App via callbacks)
- App é a única fonte de verdade do estado

### Funcionalidades Implementadas

**Adicionar Seleção:**

1. Usuário preenche formulário
2. Ao submeter, SelecaoForm chama callback `onSubmit`
3. App recebe os dados e adiciona ao estado
4. useEffect detecta mudança e salva no localStorage
5. Componente re-renderiza mostrando nova seleção

**Deletar Seleção:**

1. Usuário clica em "Deletar" no Card
2. onClick executa callback `deletarSelecao` com o ID
3. App filtra o array removendo a seleção
4. useEffect salva estado atualizado
5. Componente re-renderiza sem a seleção deletada

**Persistência de Dados:**

- Todas as operações são automaticamente salvas no localStorage
- Ao recarregar a página, dados são restaurados
- Não há perda de informações entre sessões

### Exemplo de Fluxo Completo

```
Usuário preenche formulário
        ↓
SelecaoForm executa onSubmit(dados)
        ↓
App.adicionarSelecao() atualiza estado
        ↓
setSelecoes causa re-renderização
        ↓
useEffect detecta mudança em [selecoes]
        ↓
localStorage.setItem salva dados
        ↓
Interface atualiza mostrando novo Card
```

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
│   ├── SelecaoForm.tsx
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Princípios dos Componentes Reutilizáveis

Todos os componentes seguem os seguintes princípios:

1. **Tipagem forte com TypeScript:** Interfaces bem definidas para todas as props
2. **Flexibilidade:** Props opcionais permitem diferentes casos de uso
3. **Customização:** Variants e estilos permitem adaptar aparência
4. **Acessibilidade:** Suporte a estados desabilitados e semântica HTML correta
5. **Reutilização:** Podem ser usados múltiplas vezes com props diferentes
6. **Controle:** Inputs controlados garantem que React seja a fonte da verdade

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

## Funcionalidades da Aplicação

- Adicionar novas seleções através de formulário
- Visualizar lista de seleções em cards
- Deletar seleções existentes
- Persistência automática de dados no localStorage
- Interface responsiva e componentizada
- Validação de tipos em tempo de desenvolvimento com TypeScript
