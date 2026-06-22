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

app.listen(PORT, async () => {
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