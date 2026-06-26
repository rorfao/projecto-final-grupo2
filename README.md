# Tugartes e Tufícios 🛠️ ❤️

Uma aplicação web CRUD (Node.js + Frontend Estático) desenvolvida para gerir um catálogo de "tugartes" (workshops e locais de artesanato/cultura). A aplicação serve uma interface estática e expõe uma API REST robusta, integrada com uma base de dados MySQL.

## 🚀 Tecnologias e Ferramentas

* **Backend:** Node.js com Express 5
* **Base de Dados:** MySQL (Driver `mysql2`)
* **Frontend:** HTML5, CSS3 e JavaScript Vanilla (sem frameworks)
* **Dependências Auxiliares:** `dotenv` (gestão de variáveis de ambiente)
* **Desenvolvimento:** `nodemon` (reinício automático do servidor)

## 📁 Estrutura do Projeto

```text
├── database.sql                 # Script SQL para criação do esquema e dados iniciais
├── package.json                 # Scripts NPM e dependências do projeto
├── package-lock.json            # Bloqueio de versões das dependências
├── server.js                    # Ponto de entrada (Servidor Express, API e Validações)
├── .env.example                 # Modelo para configuração das variáveis de ambiente
├── Frontend/                    # Ficheiros do cliente (Interface Estática)
│   ├── index.html               # Página Inicial
│   ├── catalogo.html            # Visualização do Catálogo
│   ├── registo.html             # Formulário de Registo / Edição
│   ├── about.html               # Página "Sobre Nós"
│   ├── app.js                   # Lógica Frontend e consumo da API
│   ├── styles.css               # Estilos globais da aplicação
│   └── Recursos/                # Ativos visuais (Logótipo, imagens, etc.)
└── Documentação/                # Ficheiros de organização (Opcional)
    ├── REQUISITOS_PROJETO.md
    └── TODO.md
```
### Fluxo de Funcionamento
1. O ficheiro `server.js` inicializa o servidor Express, cria um *pool* de ligações ao MySQL e serve a pasta `Frontend/` como conteúdo estático.
2. O frontend (`app.js`) realiza pedidos HTTP (`fetch`) aos endpoints da API REST sob o prefixo `/api/roteiro` para listar e manipular os dados.

---

## 🛠️ Como Configurar e Executar

### 1. Requisitos Prévios
Certifique-se de que tem o **Node.js** e o **MySQL Server** instalados na sua máquina.

### 2. Configurar a Base de Dados
Importe o ficheiro `database.sql` para o seu servidor MySQL para criar a estrutura da tabela `tugartes` e os dados de exemplo:

```bash
mysql -u <utilizador> -p <nome_da_base_de_dados> < database.sql
```

### 3. Configurar as Variáveis de Ambiente
Crie um ficheiro `.env` na raiz do projeto com as credenciais do seu banco de dados:

```ini
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=o_seu_utilizador
DATABASE_PASSWORD=a_sua_senha
DATABASE_NAME=nome_da_base_de_dados
```

### 4. Instalar Dependências e Iniciar
Instale os pacotes necessários e execute o servidor:

```bash
# Instalar dependências
npm install

# Iniciar em ambiente de produção
npm start

# Iniciar em ambiente de desenvolvimento (com recarga automática)
npm run dev
```

O servidor ficará ativo em `http://localhost:3000`. Abra este endereço no seu navegador.

---

## 🔌 Referência Rápida da API (`/api`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/api/status` | Verifica a saúde/estado da API ("API ativa") |
| **GET** | `/api/roteiro` | Lista todos os tugartes registados |
| **GET** | `/api/roteiro/:id` | Obtém os detalhes de um tugarte específico por ID |
| **POST** | `/api/roteiro` | Cria um novo tugarte (Requer validação) |
| **PUT** | `/api/roteiro/:id` | Atualiza um tugarte existente (Requer validação) |
| **DELETE**| `/api/roteiro/:id` | Elimina um tugarte por ID |

---

## 📝 Notas de Implementação

* **Validação de Dados:** O `server.js` inclui um middleware de validação que obriga o preenchimento e define limites de caracteres para os campos: `nome`, `atividade`, `distrito`, `concelho` e `descrição`.
* **Tratamento de Erros:** Todas as respostas de erro são devolvidas em formato JSON. Caso uma rota não exista (Erro 404), a API responde com:
  ```json
  { "erro": "Rota não encontrada", "rota": "/url-solicitada" }
  ```

## Equipa

Formandos:
- [**Carla Marques**](https://github.com/carlasomarques83-tech)
- [**Isabel Ramos**](https://github.com/isabelucasramos)
- [**Raquel Correia**](https://github.com/rorfao)
- [**Válter Melo**](https://github.com/ValterMelo)

Formador:
- João Pedro Barbosa De David