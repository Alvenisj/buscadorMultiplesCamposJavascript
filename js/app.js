// VARIABLES DEL PROYECTO
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado'); // CONTENEDOR DE LOS RESULTADOS EN EL HTML
const yearMax = new Date().getFullYear(); //MÉTODO QUE RETORNA EL AÑO ACTUAL, EJEMPLO: "2023"
const yearMin = yearMax - 10;

// GENERAR UN OBJETO CON LA BUSQUEDA
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// EVENTOS GLOBALES DEL PROYECTO 
document.addEventListener('DOMContentLoaded', ( ) => {

    // IMPRIME EN EL HTML LAS CARACTERISTICAS DEL AUTO
         mostrarAutos( autos );
    // LLENA LAS OPCIONES DEL SELECT AÑOS
         llenarSelectAnios( );
})

// EVENTOS PARA LOS SELECT DE BUSQUEDA DEL PROYECTO
    marca.addEventListener('change', ( e ) => {
        datosBusqueda.marca = e.target.value;
        filtrarAuto( );
    });
    year.addEventListener('change', ( e ) => {
        datosBusqueda.year = parseInt(e.target.value);
        filtrarAuto( );
    });
    minimo.addEventListener('change', ( e ) => {
        datosBusqueda.minimo = e.target.value;
        filtrarAuto( );
    });
    maximo.addEventListener('change', ( e ) => {
        datosBusqueda.maximo = e.target.value;
        filtrarAuto( );
    });
    puertas.addEventListener('change', ( e ) => {
        datosBusqueda.puertas = parseInt(e.target.value);
        filtrarAuto( );
    });
    transmision.addEventListener('change', ( e ) => {
        datosBusqueda.transmision = e.target.value;
        filtrarAuto( );
    });
    color.addEventListener('change', ( e ) => {
        datosBusqueda.color = e.target.value;
        filtrarAuto( );
    });


// FUNCIONES DEL PROYECTO

function mostrarAutos( autos ) {

    // LIMPIA Y ELIMINA EL HTML PREVIO, ANTES DE RECORRER EL ARREGLO Y Y MOSTRAR LA BUSQUEDA
        limpiarHtml( ); // 

    autos.forEach( auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHtml = document.createElement('P');

        autoHtml.textContent = `
             ${marca}  ${modelo} - ${year} - ${puertas} Puertas - ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        // INSERTAR EL HTML EN EL DOCUMENTO
        resultado.appendChild( autoHtml );
    } );


}

function limpiarHtml( ) {
    while( resultado.firstChild ) {
        resultado.removeChild( resultado.firstChild )
    }
}


function llenarSelectAnios( ) {
   
    for( let i = yearMax; i >= yearMin; i-- ) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild( opcion ) //AGREGA LAS OPCIONES DE AÑO AL SELECT
    }
}

// Filtra TODOS LOS AUTOS DEL ARRAY
function filtrarAuto( ) {

    const resultado = autos
            .filter( filtrarMarca )
            .filter( filtrarYear )
            .filter( filtrarMinimo )
            .filter( filtrarMaximo)
            .filter( filtrarPuertas )
            .filter( filtrarTransmision )
            .filter( filtrarColor )

    if( resultado.length ) {
         // console.log(resultado)
         mostrarAutos( resultado );
    } else {
        noResultado( );
    }
}

// MUESTRA AL USUARIO CUANDO NO HAY RESULTADOS
function noResultado( ) {
    limpiarHtml( );

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados en la busqueda, intenta con otros terminos de busqueda';
    resultado.appendChild( noResultado );
}

// FILTRA DEPENDIENDO DE LA MARCA
function filtrarMarca( auto ) {
    const { marca } = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }

    return auto;
}


function filtrarYear( auto ) {
    const { year } = datosBusqueda;
    if( year ) {
        return auto.year === year;
    }

    return auto;
}

function filtrarMinimo( auto ) {
    const { minimo } = datosBusqueda;
    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo( auto ) {
    const { maximo } = datosBusqueda;
    if( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}


function filtrarPuertas( auto ) {
    const { puertas } = datosBusqueda;
    if ( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision( auto ) {
    const { transmision } = datosBusqueda;
    if ( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor( auto ) {
    const { color } = datosBusqueda;
    if ( color ) {
        return auto.color === color;
    }
    return auto;
}

