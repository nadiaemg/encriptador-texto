const textoIngresado = document.getElementById('textoIngresado');
const textoEncriptado = document.getElementById('textoEncriptado');
const contenedorVacio = document.querySelector('.contendor__encriptado__vacio');
const contenedorLleno = document.querySelector('.contendor__encriptado__lleno');

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

function encriptarTexto(cadenaParaEncriptar, reglaDeEncriptacion) {
    cadenaParaEncriptar = cadenaParaEncriptar.split('').map(
        letra => reglaDeEncriptacion[letra] || letra
    );
    return cadenaParaEncriptar.join('');
}

function desencriptarTexto(cadenaParaDesencriptar, reglaDeDesencriptacion) {
    for (let letraEncriptada in reglaDeDesencriptacion) {
        cadenaParaDesencriptar = cadenaParaDesencriptar.split(letraEncriptada).join(reglaDeDesencriptacion[letraEncriptada]);
    }
    return cadenaParaDesencriptar;
}

//Función para validar y mostrar el texto encriptado/desencriptado
function validarYMostrarTexto(opcion) {
    const regex = /^[a-z\s]+$/;
    const textoIngresadoValue = textoIngresado.value.trim();

    if (textoIngresadoValue.length === 0) {
        contenedorVacio.style.display = 'flex';
        contenedorLleno.style.display = 'none';
    } else if (regex.test(textoIngresadoValue)) {
        contenedorLleno.style.display = 'flex';
        contenedorVacio.style.display = 'none';
        if (opcion === 'encriptar') {
            textoEncriptado.innerText = encriptarTexto(textoIngresadoValue, reglasDeEncriptacion);
        } else if (opcion === 'desencriptar') {
            textoEncriptado.innerText = desencriptarTexto(textoIngresadoValue, reglasDeDesencriptacion);
        }
    } else {
        Swal.fire({
            icon: "info",
            text: " Solo se permiten letras minúsculas. No se aceptan caracteres especiales, números o letras mayúsculas.",
        });
    }
}

function copiarTexto() {
    //Seleccionar texto
    const rango = document.createRange();
    const seleccion = window.getSelection();

    rango.selectNodeContents(textoEncriptado);
    seleccion.removeAllRanges();
    seleccion.addRange(rango);

    //Guardar texto en portapapeles
    navigator.clipboard.writeText(textoEncriptado.innerText).then(function () {
        console.log('Texto copiado al portapapeles');
        const tooltip = document.getElementById('tooltipTexto');

        // Mostrar tooltip por 15 segundos
        tooltip.style.display = 'block'

        setTimeout(function () {
            tooltip.style.display = 'none'
        }, 5000);

    }).catch(function (err) {
        console.error('Error al copiar el texto: ', err);
    });
}

function borrarTexto() {
    textoEncriptado.innerText = "";
    textoIngresado.value = "";
    contenedorVacio.style.display = 'flex';
    contenedorLleno.style.display = 'none';
}

//Función para poner año en footer
function year() {
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.innerText = currentYear;
}

window.addEventListener('load', function () {
    year()
});