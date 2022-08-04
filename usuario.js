class Usuario{
    /*
    nombre: String
    apellido: String
    libros: Object[]
    mascotas: String[]
    */
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    static sarasa;

    getFullName() {
        return `${this.apellido} ${this.nombre}`
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
      return this.mascotas.length;
    }

    addBook(Titulo, Autor){
      let newLibro = new Libro(Titulo, Autor)
      this.libros.push(newLibro);
    }

  getBookNames(){
    let tituloLibros = []
    this.libros.forEach(e => {
      tituloLibros.push(e.getTitulo())
    });
    return tituloLibros;
  }
}

//Clase Libro
class Libro {
  constructor(titulo, autor) {
    this.titulo = titulo,
    this.autor = autor
  }

  getTitulo(){
    return this.titulo;
  }
  getAutor(){
    return this.autor
  }  
}

let libro1 = new Libro("Un mundo Feliz", "Aldous Huxley")
let libro2 = new Libro("Cronicas Marcianas", "Ray Bradbury")

test = new Usuario("Rodrigo","Tarrio",[libro1, libro2], ["Chopper", "Nala"]);

console.log(test);
console.log(`Nombre Completo: ${test.getFullName()}`);

console.log(`Cantidad de mascotas: ${test.countMascotas()}`);
test.addMascota("Suri");
console.log(`Cantidad de mascotas: ${test.countMascotas()}`);

//console.log(test);

console.log(test.getBookNames());
test.addBook("Soy Leyenda", "Richard Matheson");
console.log(test.getBookNames());
