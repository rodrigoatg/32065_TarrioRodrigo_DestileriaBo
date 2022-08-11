class Contenedor{
    constructor(name){
        this.nombre = name;
        this.fs = require('fs'); 
        this.fs.readFile(name, 'UTF-8', (error, contenido) => {
            if (error) {
                throw new Error('Error en lectura ' + error);
            }
        
            console.log('Lectura exitosa');
            this.info = JSON.parse(JSON.stringify(contenido));
            console.log(this.info, typeof(this.info));
        });
    }

    save(objeto){

        const nuevoId = this.info[this.info.length() - 1] + 1;

        const nuevoObjeto = {nuevoId, ...objeto};

        this.info = {...this.info, ...nuevoObjeto};
        this.fs.writeFile(this.name, JSON.stringify(this.info, null, 2), error => {
            if (error) {
                throw new Error('Error en escritura');
            }
            console.log('Escritura exitosa');
            return nuevoId;
        })        
    }

    getById(idRecibido){
        for( const producto of this.info){
            if(producto.id === idRecibido){
                return producto;
            }
        }
        return null
    }

    getAll(){
        return this.info
    }


    getPosById(idRecibido){
        let pos = 0;
        for( const producto of this.info){
            if(producto.id === idRecibido){
                return pos;
            }
            pos++;
        }
        return -1
    }

    deleteByID(idRecibido){
        let i = 0;
        for( const producto of this.info){
            if(producto.id === idRecibido){
                this.info.slice(i,1);//esto funciona en array
            }
            i++;
        }
        for(let i = 0; i < this.info.length(); i++){
            if(this.info.id === idRecibido){
                this.info.splice(i,1);
            }
        }
        this.fs.writeFile(this.name, JSON.stringify(this.info, null, 2), error => {
            if (error) {
                throw new Error('Error en eliminación del objeto.');
            }
            console.log('Escritura exitosa');
        })        
    }

    

    deleteAll(){
        this.fs.writeFile(this.name, "", error => {
            if (error) {
                throw new Error('Error borrando el archivo.');
            }
        });
    }
}

module.exports = Contenedor;

// const test = new Contenedor("productos.txt");

// const objetoTest = {title: "Producto 4", price: 400, thumbnail:""}

// console.log(test);
// test.save(objetoTest);
// console.log(test);
// console.log(test.getById(2));
// console.log(test.getAll());
// test.deleteByID(3);
// test.deleteAll();
// console.log(test);