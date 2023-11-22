class Book {
    constructor(title, genre, author) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.read = false;
        this.date = null;
    }
}

class Booklist {
    constructor() {
        this.arrayBooks = [];
        this.readBooks = 0;
    }

    add(book) {
        if (this.arrayBooks.length == 0) {
            this.arrayBooks.push(book);
        } else {
            for (let i = 0; i < this.arrayBooks.length; i++) {
                if (this.arrayBooks[i].title == book.title) {
                    return alert("El libro ya existe");
                }
            }
            this.arrayBooks.push(book);
        }
    }

    finishCurrentBook() {
        if (this.readBooks < this.arrayBooks.length) {
            this.arrayBooks[this.readBooks].read = true;
            this.arrayBooks[this.readBooks].date = (`${(new Date()).toLocaleDateString("es-ES")} ${(new Date().getHours())}:${(new Date().getMinutes())}:${(new Date().getSeconds())}`);
            this.readBooks++;
        }
    }

    numberOfBooksRead() {
        return this.arrayBooks.filter(books => books.read).length; // Filtramos los libros que han sido leídos y devolvemos la longitud del array
    }

    numberOfBooksNotRead() {
        return this.arrayBooks.length - this.readBooks;
    }

    numberOfAllBooks() {
        return this.arrayBooks.length;
    }
}




window.onload = () => {
    let arrayLibros = new Booklist();
    botonAñadir = document.querySelector("#añadirLibro");
    clickListaLectura = document.querySelector("#listaLectura")

    botonAñadir.addEventListener("click", () => {
        titulo = document.querySelector("#titulo").value;
        genero = document.querySelector("#genero").value;
        autor = document.querySelector("#autor").value;
        if (titulo == "" || genero == "" || autor == "") {
            return alert("Rellena todos los campos");
        } else {
            arrayLibros.add(new Book(titulo, genero, autor)); // Creamos un libro con el valor de los inputs y lo añadimos al array
            mostrarListaLibros(arrayLibros);
            titulo = document.querySelector("#titulo").value = "";
            genero = document.querySelector("#genero").value = "";
            autor = document.querySelector("#autor").value = "";
        }

    });


    function mostrarListaLibros(arrayLibros) {
        document.querySelector("#listaLectura").innerHTML = "";
        arrayLibros.arrayBooks.forEach(libro => {
            estado = libro.read ? "Leído" : "No leído";
            fecha = libro.date ? libro.date : (`${(new Date()).toLocaleDateString("es-ES")} ${(new Date().getHours())}:${(new Date().getMinutes())}:${(new Date().getSeconds())}`);
            libroAñadido = `<li>Titulo: ${libro.title}</li> <br>
            <li>Autor: ${libro.author}</li><br>
            <li>Genero: ${libro.genre}</li><br>
            <li>Fecha: ${fecha}</li><br>
            <li>Estado: ${estado}</li><br>
            <hr> <br>`;
            document.querySelector("#listaLectura").innerHTML += libroAñadido;
        });
        document.querySelector("#contadorLibros").innerHTML =`${arrayLibros.numberOfBooksRead()} de ${arrayLibros.numberOfAllBooks()}`;

    }

    clickListaLectura.addEventListener("click", () => {
        arrayLibros.finishCurrentBook();
        mostrarListaLibros(arrayLibros);
    });


}

