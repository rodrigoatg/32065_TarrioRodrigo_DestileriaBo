const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

// const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
// const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

const ProductosApi = require('../api/productos.js')
const MensajesApi = require('../api/mensajes.js')
const productosApi = new ProductosApi()
const mensajesApi = new MensajesApi()

// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


//--------------------------------------------

// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado');
    //productos
    socket.emit('producto', productosApi);
    socket.on('new-producto', data => {
        productosApi.push(data);
        io.sockets.emit('productos', productosApi);
    });
    //mensajes
    socket.emit('mensajes', mensajesApi);

    socket.on('new-message', data => {
        mensajesApi.save(data);
        io.sockets.emit('mensajes', mensajesApi);
    });
});

//--------------------------------------------

// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------

//Set engine
app.set('view engine', 'hbs');
app.set("views", "public/plantillas");

//--------------------------------------------



// app.post('/productos', (req, res) => {
// })

// app.get('/productos', (req, res) => {
// });

//--------------------------------------------

// inicio el servidor

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
