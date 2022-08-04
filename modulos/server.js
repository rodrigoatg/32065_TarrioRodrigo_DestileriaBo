/*Preguntar como importar de mi otro archivo*/
//import { Contenedor } from './contenedor.js'

//Variables
const express = require('express');
const app = express();

app.use(express.json());

const contenedor = require('./contenedor');
const productos = new contenedor("../productos.txt");

//Funciones
app.get('/', (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})

app.get('/productos', (req, res) => {
    res.json(productos.getAll());
})

app.get('/productoRandom', (req, res) => {
    const random = Math.ceil(Math.random() * 3);
    console.log("id: ", random);
    res.json(productos.getById(random));
})

const server = app.listen(8080, () =>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));

