const express = require("express")
const axios = require("axios")
const { readFileSync, writeFileSync } = require("fs")
const app = express()

const port = 3000

app.listen(port, () => console.log(`Aplicación ejecutándose por el puerto ${port}`))

const URL_BASE_STARWARS = "https://swapi.dev/api"


app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`)
})

app.get("/curso", (req, res) => {
    res.sendFile(`${__dirname}/views/curso.html`)
})

app.get("/agregar-personaje", async (req, res) => {
    const idPersonaje = req.query.id_personaje
    try {
        const contentFile = readFileSync(`${__dirname}/files/personajes.txt`,"utf-8")
        const contentJS = JSON.parse(contentFile)
        const busqueda = contentJS.find(item => item.id == idPersonaje)

        if(busqueda) {
            return res.status(409).json({"message": "Personaje registrado previamente"})
        }
        
        const { data } = await axios.get(`${URL_BASE_STARWARS}/people/${idPersonaje}`)
        const personaje = { id: idPersonaje, ...data}
        contentJS.push(personaje)
        writeFileSync(`${__dirname}/files/personajes.txt`,JSON.stringify(contentJS), "utf-8")
        res.json({ message: "Personaje agregado con éxito", data: personaje })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hubo un error interno"})
    }
    
})

app.get("/listar-personajes", (req, res) => {
    const content = readFileSync(`${__dirname}/files/personajes.txt`,"utf-8")
    const contentJS = JSON.parse(content)
    // contentJS.sort((a, b) => Number(b.id) - Number(a.id)) // Orden descendente
    contentJS.sort((a, b) => Number(a.id) - Number(b.id)) // Orden ascendente
    res.json({ "message": "Listado de personajes registrados", "data": contentJS})
})


app.get("*", (req, res) => { //Ruta por defecto, se ejecuta cuando nos solicitan una ruta no definida.
    // res.send("Ruta no definida en la aplicación.")
    res.sendFile(`${__dirname}/views/error.html`)
})