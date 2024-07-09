const textoIngresado = document.getElementById('textoIngresado');
const textoEncriptado = document.getElementById('textoEncriptado');

const reglasDeEncriptacion = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

const reglasDeDesencriptacion = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
};

function encriptarTexto(cadenaDesencriptada, reglaDeEncriptacion) {
    let arregloEncriptado = cadenaDesencriptada.split("").map(
        letra => reglaDeEncriptacion[letra] || letra
    );
    return arregloEncriptado.join("");
}

function desencriptarTexto(cadenaEncriptada, reglaDeDesencriptacion) {
    let cadenaDesencriptada = cadenaEncriptada;
    for (let letraEncriptada in reglaDeDesencriptacion) {
        cadenaDesencriptada = cadenaDesencriptada.split(letraEncriptada).join(reglaDeDesencriptacion[letraEncriptada]);
    }
    return cadenaDesencriptada;
}

function mostrarEncriptacion() {
    textoEncriptado.innerText = encriptarTexto(textoIngresado.value, reglasDeEncriptacion);
    mostrarOcultarTexto();
}

function mostrarDesencriptacion() {
    textoEncriptado.innerText = desencriptarTexto(textoIngresado.value, reglasDeDesencriptacion);
    mostrarOcultarTexto();
}

function mostrarOcultarTexto() {
    const contenedorVacio = document.querySelector('.contendor__encriptado__vacio');
    const contenedorLleno = document.querySelector('.contendor__encriptado__lleno');

    if(textoIngresado.value.length > 0) {
        contenedorLleno.style.display = "flex";
        contenedorVacio.style.display = "none";
    } else {
        contenedorVacio.style.display = "flex";
        contenedorLleno.style.display = "none";
    }
}

//Función para poner año en footer
function year() {
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.innerText = currentYear;
}

window.addEventListener('load', function() {
    year()
});