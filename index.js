const express = require("express")
const app = express()

const port = 3000

app.listen(port, () => console.log(`Aplicación ejecutándose por el puerto ${port}`))


app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`)
})

app.get("/curso", (req, res) => {
    res.sendFile(`${__dirname}/views/curso.html`)
})


app.get("*", (req, res) => { //Ruta por defecto, se ejecuta cuando nos solicitan una ruta no definida.
    // res.send("Ruta no definida en la aplicación.")
    res.sendFile(`${__dirname}/views/error.html`)
})