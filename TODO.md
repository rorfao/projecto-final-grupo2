# Guia de Tarefas do Projecto

## Fase 1: Planeamento e Configuração Inicial

- [x] Definir tema do projecto: roteiro/catálogo de oficinas tradicionais de artesanato
- [x] Definir nome do projecto: TUGARTES E TUFÍCIOS

| Nome     | Actividade | Localização | Telefone | Email | Website |
|----------|------------|-------------|----------|-------|---------|
| Olaria Periquito | Olaria | R. Prof. João Porto 21, 6050-344 Nisa | 927531183 | | |
| Porches Pottery | Olaria | EN125, 8400-451 Porches, Lagoa | | | https://www.porchespottery.com |
| Nuno Nunes: Instrumentos Musicais de Corda | Instrumentos Musicais | Rua Ciprião de Figueiredo, n.º 15 – Nossa Senhora da Conceição, 9700-053 Angra do Heroísmo | 962985354 | n_nunes57@outlook.pt | https://ciudadespatrimonio.eu/pt-pt/artesanos/instrumentos-musicales-de-cuerda-viola-da-terra/ |
| José Manuel Chinarro: Atelier de Pintura Alentejana | Pintura de mobiliário | Rua de São João Nr.25, Évora | 967068683 | josemanuelchinarro@gmail.com | https://www.facebook.com/josemanuel.chinarro |
| Capuchinhas | | | | | | 

| Sites Exemplo e com Informação |
|--------------------------------|
| https://programasaberfazer.gov.pt/mapa |
| https://www.cearte.pt/gpaos/index.html?alias=gpao_ptc&type=list_all | 
| https://artesanato.azores.gov.pt/ | 


- [x] Identificar os 4 campos adicionais além do id (incluir texto, número/booleano/data): 

```sql
id -- chave primária, obrigatório, auto-incrementado
nome -- obrigatório
atividade -- exemplo: olaria
distrito -- obrigatório
concelho -- obrigatório
morada -- opcional
telefone -- opcional, campo numérico
email -- opcional
website -- opcional
descricao -- obrigatório
imagem -- opcional?
```

- [x] Configurar a Estrutura de Pastas 
    - [x] Criar a pasta raiz do projeto. 
    - [x] Criar a pasta frontend

- [x] Inicializar o Projeto Node.js 
    - [x] Correr npm init -y na raiz. 
    - [x] Instalar dependências obrigatórias (express, dotenv, mysql2). 
    - [x] Instalar dependências de desenvolvimento (nodemon). 
    - [x] Configurar os scripts "dev" e "start" no package.json.
    - [x] Criar o .gitignore e adicionar o node_modules e .env

- [x] Configurar Variáveis de Ambiente 
    - [x] Criar o ficheiro .env com as credenciais locais. 
    - [x] Criar o ficheiro .env.example sem dados sensíveis. 

## Fase 2: Fase 2: Base de Dados (MySQL) 

- [x] Escolher a Tecnologia de Acesso, mysql2 ou prisma: mysql2
- [x] Criar a Estrutura da Base de Dados 
    - [x] Mysql: Criar o ficheiro database.sql com CREATE DATABASE, CREATE TABLE (com id auto-incremento) e alguns INSERT de teste.
- [x] Testar Conectividade: garantir que o MySQL está ligado e comunica com a aplicação. 

## Fase 3: Backend (Express API) 

- [x] Criar o Servidor Base (server.js) 
    - [x] Configurar o Express e o middleware express.json(). 

- [x] Desenhar as Rotas da API REST
    - [x] Rota GET /api/estado (verificação de status). 
    - [x] Rota GET /api/recurso (listar todos). 
    - [x] Rota GET /api/recurso/:id (detalhe de um). 
    - [x] Rota POST /api/recurso (criar novo). 
    - [x] Rota PUT /api/recurso/:id (atualizar completo) ou PATCH.
    - [x] Rota DELETE /api/recurso/:id (remover). 

- [x] Implementar Validação de Dados e Erros 
    - [x] Validar campos obrigatórios vazios, tipos numéricos e tamanho de texto no POST/PUT. 
    - [x] Responder com Status HTTP 400 e mensagem JSON em caso de erro de validação. 
    - [x] Tratar erros globais e responder com os códigos HTTP adequados.

## Fase 4: Frontend (interface web)

- [x] Criar a Estrutura de Ficheiros 
    - [x] frontend/index.html 
    - [x] frontend/styles.css 
    - [x] frontend/app.js 

- [] Desenhar a Interface (HTML/CSS) 
    - [x] Criar um formulário para inserção de dados. 
    - [] Criar uma secção/tabela para listagem dos registos.

- [] Implementar a Lógica (JavaScript & DOM) 
    - [] Usar fetch para listar os registos ao carregar a página. 
    - [] Capturar o evento do formulário e usar fetch (POST) para criar registos. 
    - [] Adicionar botões de apagar e associar ao fetch (DELETE). 
    - [] Criar funcionalidade para editar ou alternar um estado (ex: marcar como favorito). 
    - [] Mostrar mensagens visuais de sucesso ou erro para o utilizador. 

- [] Checklist páginas prontas:
    - [x] index.html
    - [] catalogo.html
    - [] registo.hmtl
    - [] about.html

## Fase 5: Documentação e Preparação da Entrega 

- [] Escrever o README.md 
    - [] Incluir nome do projeto, objetivo e tecnologias. 
    - [] Adicionar instruções passo a passo para instalar dependências e correr o projeto. 
    - [] Listar as rotas da API criadas. 

- [x] Exportar Base de Dados 
    - [x] Gerar o ficheiro final database.sql (via MySQL Workbench ou terminal) com estrutura e dados de teste. 

- [x] Limpeza de Ficheiros 
    - [x] Verificar que a pasta node_modules NÃO está incluída na entrega. 
    - [x] Confirmar que o ficheiro .env NÃO vai com passwords reais.

## Fase 6: Checklist de Testes Finais (Autoavaliação) 

- [] O projeto corre numa pasta limpa após fazer npm install? 
- [] O frontend foi aberto corretamente (via Live Server ou Express) e NÃO por file://? 
- [] Consigo criar, listar, editar e apagar registos diretamente pela interface (sem Postman)? 
- [] Se enviar dados em branco, o sistema exibe o erro 400 corretamente? 
- [] Removi todos os caminhos absolutos do código que só funcionam no meu PC?