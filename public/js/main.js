const ProductosApi = require("../../api/productos");

const socket = io.connect();

//------------------------------------------------------------------------------------
const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')
const formPublicarMensaje = document.getElementById('formPublicarMensaje')
const formAgregarProducto = document.getElementById('formAgregarProducto')

const productos = new ProductosApi();

formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    //Armar objeto producto y emitir mensaje a evento update
    const producto = {
        title: document.getElementById('nombre').value,
        price: document.getElementById('precio').value,
        thumbnail: document.getElementById('foto').value
    };

    socket.emit('new-producto', producto);

    formPublicarMensaje.reset()
    inputMensaje.focus()
    return false;   //esto hace que no se refresque la pagina al tocar enviar
    
})

socket.on('productos', productos => {
    //generar el html y colocarlo en el tag productos llamando a la funcion makeHtmlTable
    html = makeHtmlTable(productos);
    document.getElementById('productos').innerHTML = html;
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------
/*CHAT*/
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const mensaje = {
        email: inputUsername.value,
        date: Date.now(),
        text: inputMensaje.value
    };

    socket.emit('new-message', mensaje);
    formPublicarMensaje.reset();
    inputMensaje.focus()
    return false;   //esto hace que no se refresque la pagina al tocar enviar
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    //Armar nuestro html para mostrar los mensajes como lo hicimos en clase
    const html = mensajes.map((mensaje) => {
        return(`<div><strong>${mensaje.email}</strong>:[${mensaje.date}] <em>${mensaje.text}</em></div>`)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})

