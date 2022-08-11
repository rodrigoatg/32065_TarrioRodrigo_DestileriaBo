/*Preguntar como importar de mi otro archivo*/
//import { Contenedor } from './contenedor.js'

//Variables
const express = require('express');
const { isNull } = require('util');
const app = express();

//configuraciones necesarias
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const contenedor = require('./contenedor');
const productos = new contenedor("../productos.txt");

//Funciones
app.get('/', (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})

app.get('/productos', (req, res) => {
    res.send({productos: productos.getAll()});
})

app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    let pos = -1;
    let i = 0
    const productoBuscado = {};
    productoBuscado = productos.getById(id) ;
    if(!isNull(productoBuscado)){
        res.send({ buscado: productoBuscado });
    }else{
        res.send('<h3 style="color:red;">Producto no encontrado</h3>')
    }
})

//recibe un producto y lo agrega, retorna el id  y el producto
app.post('/productos', (req, res) => {
    const { producto } = req.body;
    const newId = parseInt(productos.length) + 1;
    productos.push({id: newId, ...producto});
    res.send(productos[parseInt(productos.length) - 1]);
})

//recibe un producto y lo updatea segun su id
app.put('/api/productos/:id', (req, res) => {
    const { producto } = req.body;
    const { id } = req.params;
    const posProductoBuscado = 0;
    
    posProductoBuscado = productos.getPosById(id) ;
    productos[pos] = producto;
})

//elimina un producto segun su id
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    productos.deleteByID(id);
})

const server = app.listen(8080, () =>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));

