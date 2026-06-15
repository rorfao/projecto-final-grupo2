# Guia de Tarefas do Projecto

## Fase 1: Planeamento e Configuração Inicial

- [x] Definir tema do projecto: roteiro/catálogo de oficinas tradicionais de artesanato
- [x] Definir nome do projecto: TUGARTES E TUFÍCIOS
- [x] Procurar exemplos

| Nome     | Actividade | Localização | Telefone | Email | Website |
|----------|------------|-------------|----------|-------|---------|
| Olaria Periquito | Olaria | R. Prof. João Porto 21, 6050-344 Nisa | 927531183 | | |
| Porches Pottery | Olaria | EN125, 8400-451 Porches, Lagoa | | | https://www.porchespottery.com |
| Nuno Nunes: Instrumentos Musicais de Corda | Instrumentos Musicais | Rua Ciprião de Figueiredo, n.º 15 – Nossa Senhora da Conceição, 9700-053 Angra do Heroísmo | 962985354 | n_nunes57@outlook.pt | https://ciudadespatrimonio.eu/pt-pt/artesanos/instrumentos-musicales-de-cuerda-viola-da-terra/ |
| José Manuel Chinarro: Atelier de Pintura Alentejana | Pintura de mobiliário | Rua de São João Nr.25, Évora | 967068683 | josemanuelchinarro@gmail.com | https://www.facebook.com/josemanuel.chinarro |
| Capuchinhas | | | | | | 


- [x] Identificar os 4 campos adicionais além do id (incluir texto, número/booleano/data): 

```sql
id -- chave primária, auto-incrementada
nome -- obrigatório
atividade -- exemplo: olaria
distrito -- obrigatório
concelho -- 
morada -- opcional
telefone -- opcional, campo numérico
email -- opcional
website -- opcional
descricao -- 
imagem -- opcional?
```

- [x] Configurar a Estrutura de Pastas 
    - [x] Criar a pasta raiz do projeto. 
    - [x] Criar a pasta frontend/. 

- [] Inicializar o Projeto Node.js 
    - [] Correr npm init -y na raiz. 
    - [] Instalar dependências obrigatórias (express, dotenv, mysql2). 
    - [] Instalar dependências de desenvolvimento (nodemon). 
    - [] Configurar os scripts "dev" e "start" no package.json. 

- [] Configurar Variáveis de Ambiente 

    Criar o ficheiro .env com as credenciais locais. 

    Criar o ficheiro .env.example sem dados sensíveis. 

## Fase 2: Fase 2: Base de Dados (MySQL) 

    Escolher a Tecnologia de Acesso 

    Decidir entre mysql2 (SQL manual) ou prisma. 

    Criar a Estrutura da Base de Dados 

    Se usar mysql2: Criar o ficheiro database.sql com CREATE DATABASE, CREATE TABLE (com id auto-incremento) e alguns INSERT de teste. 

    Se usar Prisma: Criar o schema.prisma, definir o modelo e gerar o cliente (npx prisma generate). 

    Testar Conectividade 

    Garantir que o MySQL está ligado e comunica com a aplicação. 