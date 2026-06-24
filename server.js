require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
const mysql = require("mysql2/promise")
const PORT = 3000
const path = require("path")

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

function validar(req,res,next)
{
    const {nome, atividade, distrito, concelho, morada, email, website, descricao, url_imagem} = req.body

    const nomeLimpo = String(nome).trim()
    const atividadeLimpo = String(atividade).trim()
    const distritoLimpo = String(distrito).trim()
    const concelhoLimpo = String(concelho).trim()

    next()
}


app.get("/api/estado", (req,res) => {res.send("API activa")})

app.get("/api/roteiro", async (req,res) => 
{
    const query = "SELECT * FROM tugartes"
    const [roteiro] = await pool.execute(query)
    res.status(200).json(roteiro)
})


app.get("/api/roteiro/:id", async (req,res) => 
{
    const id = Number(req.params.id)
    const query = "SELECT * FROM tugartes WHERE id = ?"
    const [atelier] = await pool.execute(query,[id])
    if(atelier.length === 0)
    {
        res.status(404).json({erro: "Este atelier não existe no catálogo"})
    }
    res.status(200).json(atelier[0])
})

app.post("/api/roteiro", validar, async (req,res) => 
{
    const {nome, atividade, distrito, concelho, morada, email, website, descricao, url_imagem} = req.body
    if(!nome || !atividade || !distrito || !concelho || !descricao)
    {
        return res.status(400).json({erro: "Faltam campos obrigatórios!"})
    }
    const query = "INSERT INTO tugartes (nome, atividade, distrito, concelho, morada, email, website, descricao, url_imagem) VALUES (?,?,?,?,?,?,?,?,?)"
    const resposta = await pool.execute(query,[nome, atividade, distrito, concelho, morada||null, email||null, website||null, descricao, url_imagem||null])
    res.status(201).json({mensagem: "Atelier adicionado com sucesso"})
})

app.put("/api/roteiro/:id", validar, async (req,res) =>
{
    const id = Number(req.params.id)
    const query = "SELECT * FROM tugartes WHERE id = ?"
    const [atelier] = await pool.execute(query,[id])
    if(atelier.length === 0)
    {
        res.status(404).json({erro: `Atelier com id ${id} não existe!`})
    }
    const nome = req.body.nome ?? atelier.nome
    const atividade = req.body.atividade ?? atelier[0].atividade
    const distrito = req.body.distrito ?? atelier[0].distrito 
    const concelho = req.body.concelho ?? atelier[0].concelho 
    const morada = req.body.morada ?? atelier[0].morada
    const email = req.body.email ?? atelier[0].email
    const website = req.body.website ?? atelier[0].website
    const descricao = req.body.descricao ?? atelier[0].descricao
    const url_imagem = req.body.url_imagem ?? atelier[0].url_imagem
    const query2 = "UPDATE tugartes SET nome=?, atividade=?, distrito=?, concelho=?, morada=?, email=?, website=?, descricao=?, url_imagem=? WHERE id=?"
    const [resultado] = await pool.execute(query2, [nome, atividade, distrito, concelho, morada, email, website, descricao, url_imagem, id])
    res.status(200).json({mensagem: "Atelier actualizado com sucesso"})
})

app.delete("/api/roteiro/:id", async (req,res) =>
{
    const id = Number(req.params.id)
    const query = "SELECT * FROM tugartes WHERE id = ?"
    const [atelier] = await pool.execute(query,[id])
    if(atelier.length === 0)
    {
        res.status(404).json({erro: `Atelier com id ${id} não existe!`})
    }
    const query2 = "DELETE FROM tugartes WHERE id=?"
    const [resposta] = await pool.execute(query2,[id])
    res.status(200).json({mensagem: "Atelier eliminado do roteiro com sucesso."})
})


app.use((req,res) => {res.status(404).json({erro: "Rota não encontrada", rota: req.url})})

app.use((erro,req,res,next) =>
{
    console.log("Erro: ", erro.mensagem )
    res.status(500).json({erro: "Erro no servidor!", rota:req.url, req:req.method})
})


app.listen(PORT, async () => 
{
    console.log(`O servidor está rolando na porta ${PORT}`)
    try
    {
        await pool.execute("SELECT 1")
        console.log("Ligada à base de dados")
    } 
    catch (error) 
    {
        console.log(error)
    }
})