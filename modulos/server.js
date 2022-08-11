/*Preguntar como importar de mi otro archivo*/
//import { Contenedor } from './contenedor.js'

//Variables
const express = require('express');
const { Router } = express;
const { isNull } = require('util');
const app = express();

//configuraciones necesarias
router.use(express.json());
router.use(express.urlencoded({extended: true}));


const router = new Router();
const contenedor = require('./contenedor');
const productos = new contenedor("../productos.txt");

//Funciones
router.get('/', (req, res) => {
    res.send({productos: productos.getAll()});
})

router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
    const { producto } = req.body;
    const newId = parseInt(productos.length) + 1;
    productos.push({id: newId, ...producto});
    res.send(productos[parseInt(productos.length) - 1]);
})

//recibe un producto y lo updatea segun su id
router.put('/:id', (req, res) => {
    const { producto } = req.body;
    const { id } = req.params;
    const posProductoBuscado = 0;
    
    posProductoBuscado = productos.getPosById(id) ;
    productos[pos] = producto;
})

//elimina un producto segun su id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productos.deleteByID(id);
})

//uses
app.use('/api/productos', router);

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`));

