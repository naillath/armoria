# ⚔️ Armoria

Uma API REST desenvolvida em **Node.js + Express** para gerenciar equipamentos de um arsenal.

Este projeto faz parte dos meus estudos de **desenvolvimento back-end**, com foco em construção de APIs REST, rotas HTTP, manipulação de dados e operações CRUD.

---

## 🛡️ Sobre o projeto

O **Armoria** permite cadastrar, consultar, atualizar e remover equipamentos através de uma API REST.

A aplicação utiliza um array em memória para armazenar os equipamentos e implementa as operações básicas de CRUD, incluindo validações na atualização completa dos registros.

> **Status:** 🚧 Em desenvolvimento

---

## 🛠️ Tecnologias

- **Node.js**
- **Express.js**
- **JavaScript**
- **JSON**
- **Postman** para testes das requisições

---

## 📂 Estrutura atual

```text
armoria/
├── node_modules/
├── src/
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/naillath/armoria.git
```

### 2. Acesse a pasta

```bash
cd armoria
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor

```bash
node app.js
```

O servidor será iniciado na porta:

```text
http://localhost:3000
```

Ao iniciar, o terminal deverá exibir:

```text
Armoria está rodando na porta 3000.
```

---

## 📜 Rotas disponíveis

### 🏠 Página inicial

**GET**

```http
GET /
```

Retorna uma mensagem indicando que a API está online.

Resposta:

```text
Armoria está online.
```

---

### 📦 Listar equipamentos

**GET**

```http
GET /equipamentos
```

Retorna a lista de equipamentos registrados.

Exemplo de resposta:

```json
{
    "mensagem": "Lista de equipamentos registrados:",
    "equipamentos": [
        {
            "id": 1,
            "nome": "Espada Sombria",
            "tipo": "Espada",
            "raridade": "Incomum",
            "dano": 10,
            "nivel": 0
        }
    ]
}
```

---

### 🔎 Buscar equipamento por ID

**GET**

```http
GET /equipamentos/:id
```

Exemplo:

```http
GET /equipamentos/1
```

Resposta:

```json
{
    "id": 1,
    "nome": "Espada Sombria",
    "tipo": "Espada",
    "raridade": "Incomum",
    "dano": 10,
    "nivel": 0
}
```

Caso o equipamento não exista, a API retorna:

```json
{
    "mensagem": "Equipamento não encontrado."
}
```

Status HTTP: `404 Not Found`.

---

### ➕ Cadastrar equipamento

**POST**

```http
POST /equipamentos
```

Exemplo de corpo da requisição:

```json
{
    "nome": "Arco Flamejante",
    "tipo": "Arco elemental",
    "raridade": "Épico",
    "dano": 35,
    "nivel": 3
}
```

A API gera o ID do equipamento e retorna o registro cadastrado.

Status HTTP: `201 Created`.

Exemplo de resposta:

```json
{
    "mensagem": "Equipamento registrado:",
    "equipamento": {
        "id": 1,
        "nome": "Arco Flamejante",
        "tipo": "Arco elemental",
        "raridade": "Épico",
        "dano": 35,
        "nivel": 3
    }
}
```

---

### ✏️ Atualizar equipamento

**PUT**

```http
PUT /equipamentos/:id
```

O método PUT permite atualizar um equipamento existente, enviando os dados do registro.

Exemplo:

```http
PUT /equipamentos/1
```

Corpo da requisição:

```json
{
    "nome": "Espada Sombria",
    "tipo": "Espada",
    "raridade": "Lendária",
    "dano": 50,
    "nivel": 10
}
```

A API verifica se o equipamento existe e se os campos obrigatórios foram informados: `nome`, `tipo`, `raridade`, `dano` e `nivel`.

Caso o equipamento não exista:

```json
{
    "mensagem": "Equipamento não encontrado."
}
```

Status HTTP: `404 Not Found`.

Caso um dos campos obrigatórios não seja informado, a API retorna uma mensagem de validação.

Exemplo:

```json
{
    "mensagem": "Nome do equipamento é obrigatório."
}
```

Status HTTP: `400 Bad Request`.

---

### 🔧 Atualizar parcialmente um equipamento

**PATCH**

```http
PATCH /equipamentos/:id
```

O método PATCH permite atualizar apenas os campos desejados de um equipamento, preservando os demais dados.

Exemplo:

```http
PATCH /equipamentos/1
```

Corpo da requisição:

```json
{
    "dano": 75
}
```

Nesse exemplo, somente o dano do equipamento será atualizado.

A API também verifica se o equipamento existe e retorna um erro caso o corpo da requisição esteja vazio.

Se o equipamento não existir, retorna `404 Not Found`.

Se nenhum campo for informado, retorna `400 Bad Request`:

```json
{
    "mensagem": "Informe ao menos um campo para atualizar o equipamento."
}
```

---

### 🗑️ Remover equipamento

**DELETE**

```http
DELETE /equipamentos/:id
```

Exemplo:

```http
DELETE /equipamentos/1
```

Remove o equipamento correspondente ao ID informado.

A resposta inclui uma mensagem de confirmação e os dados do equipamento removido.

Exemplo:

```json
{
    "mensagem": "Equipamento deletado com sucesso:",
    "equipamento": {
        "id": 1,
        "nome": "Espada Sombria",
        "tipo": "Espada",
        "raridade": "Lendária",
        "dano": 75,
        "nivel": 10
    }
}
```

Caso o equipamento não exista, a API retorna `404 Not Found`.

---

## 🧪 Testando com Postman

As requisições podem ser testadas utilizando o **Postman**.

Exemplo para cadastrar um equipamento:

```text
POST http://localhost:3000/equipamentos
```

No **Body**, selecione:

```text
raw → JSON
```

Envie os dados do equipamento e, em seguida, utilize:

```text
GET http://localhost:3000/equipamentos
```

para visualizar os equipamentos cadastrados.

As demais rotas podem ser testadas utilizando os métodos HTTP `GET`, `PUT`, `PATCH` e `DELETE`, conforme a operação desejada.

---

## ⚠️ Persistência dos dados

Atualmente, os equipamentos são armazenados em um **array em memória**:

```javascript
const equipamentos = [];
```

Isso significa que os dados não são persistidos em um banco de dados.

Se o servidor for encerrado ou reiniciado, os equipamentos cadastrados serão perdidos.

---

## 🗺️ Funcionalidades implementadas

- [x] GET `/`
- [x] GET `/equipamentos`
- [x] GET `/equipamentos/:id`
- [x] POST `/equipamentos`
- [x] PUT `/equipamentos/:id`
- [x] Validações dos campos obrigatórios no PUT
- [x] PATCH `/equipamentos/:id`
- [x] Verificação de corpo vazio no PATCH
- [x] DELETE `/equipamentos/:id`
- [x] Respostas JSON com mensagens e status HTTP

---

## 🎯 Objetivo do projeto

Este projeto tem como objetivo praticar os fundamentos do desenvolvimento **back-end com Node.js**, aplicando conceitos como:

- HTTP e métodos HTTP
- Rotas e parâmetros de rota
- Status codes
- JSON
- Operações CRUD
- Express.js
- Manipulação de arrays e objetos
- Validação de requisições
- Manipulação de requisições e respostas

---

## ⚔️ Evolução

Armoria está sendo desenvolvido por etapas, com foco em compreender os fundamentos por trás de cada funcionalidade e construir uma base sólida em desenvolvimento back-end.

**Cada equipamento cadastrado, cada funcionalidade implementada e cada problema resolvido fortalecem os alicerces da Armoria.** ⚔️