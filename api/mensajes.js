class MensajesApi {
    constructor() {
        this.mensajes = []
    }


    save(mensaje){
        this.mensajes.push(...mensaje);
    }
}

module.exports = MensajesApi