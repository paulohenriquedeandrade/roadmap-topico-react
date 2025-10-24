# SPA React - Gerenciamento de Seleções Copa 2022

Single Page Application desenvolvida em React com TypeScript, focada na criação de componentes reutilizáveis para gerenciamento de seleções da Copa do Mundo 2022.

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- CSS3

## Descrição

Este projeto demonstra a criação de componentes React reutilizáveis seguindo boas práticas de desenvolvimento. A aplicação simula uma interface de gerenciamento de seleções de futebol, permitindo visualizar informações de diferentes times.

## Componentes Criados

### 1. Button

Componente de botão reutilizável com suporte a diferentes variantes visuais.

**Props:**

| Prop     | Tipo                                 | Obrigatório | Descrição                                  |
| -------- | ------------------------------------ | ----------- | ------------------------------------------ |
| children | React.ReactNode                      | Sim         | Conteúdo do botão                          |
| onClick  | () => void                           | Sim         | Função executada ao clicar                 |
| variant  | "primary" \| "secondary" \| "danger" | Não         | Variante visual do botão (padrão: primary) |
| disabled | boolean                              | Não         | Se o botão está desabilitado               |

**Exemplo de uso:**

```typescript
<Button onClick={handleClick} variant="primary">
  Clique aqui
</Button>

<Button onClick={handleDelete} variant="danger" disabled>
  Excluir
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
│   └── Input.css
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

## Funcionalidades Demonstradas

- Interface de listagem de seleções em grid responsivo
- Utilização de componentes reutilizáveis com props diferentes
- Estilização modular com CSS
- Interações com eventos (onClick)
- Renderização condicional (title e footer opcionais no Card)

## Exemplo de Aplicação

A aplicação demonstra o uso dos componentes criando uma interface de gerenciamento que exibe:

- Cards com informações de 4 seleções (Brasil, Argentina, França, Alemanha)
- Cada card mostra: grupo, pontuação, títulos conquistados e jogadores-chave
- Botões de ação no rodapé de cada card
- Layout responsivo em grid de 3 colunas
