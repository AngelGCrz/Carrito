// Variables
const carrito = document.querySelector( '#carrito' );
const listaCursos = document.querySelector( '#lista-cursos' );
const contenedorCarrito = document.querySelector( '#lista-carrito tbody' );
const vaciarCarritoBtn = document.querySelector( '#vaciar-carrito' );
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners () {
    // Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener( 'click', agregarCurso );

    // Cuando se elimina un curso del carrito
    carrito.addEventListener( 'click', eliminarCurso );

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener( 'click', vaciarCarrito );

}

// Función que añade el curso al carrito
function agregarCurso ( e ) {
    e.preventDefault();

    if ( e.target.classList.contains( 'agregar-carrito' ) ) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso( curso );
    }
}

// Lee los datos del curso
function leerDatosCurso ( curso ) {
    const infoCurso = {
        imagen: curso.querySelector( 'img' ).src,
        titulo: curso.querySelector( 'h4' ).textContent,
        precio: curso.querySelector( '.precio span' ).textContent,
        id: curso.querySelector( 'a' ).getAttribute( 'data-id' ),
        cantidad: 1
    }

    if ( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) {
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        } )
        articulosCarrito = [ ...cursos ];
    } else {
        articulosCarrito = [ ...articulosCarrito, infoCurso ];
    }

    // console.log(articulosCarrito)
    carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso ( e ) {
    e.preventDefault();
    if ( e.target.classList.contains( 'borrar-curso' ) ) {
        // e.target.parentElement.parentElement.remove();
        const cursoId = e.target.getAttribute( 'data-id' )

        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML();
    }
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML () {
    vaciarCarrito();

    articulosCarrito.forEach( curso => {
        const row = document.createElement( 'tr' );
        row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
        contenedorCarrito.appendChild( row );
    } );

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito () {
    // forma rapida (recomendada)
    while ( contenedorCarrito.firstChild ) {
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
}
