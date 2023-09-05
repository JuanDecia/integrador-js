// Elementos Menu
const menuBtn = document.querySelector('.menu-label');
const barsMenu = document.querySelector('.navbar-list');
const overlay = document.querySelector('.overlay');

const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    overlay.classList.toggle('show-overlay');
}

const validar = (formulario) => {

    // Validamos el email a traves de una expresión regular //
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.email.value)) {
        alert("Email inválido");
        return false;
    }

    // Confirmamos Usuario
    if (formulario.email.value != formulario.confirmarEmail.value) {
        alert("Los usuarios no coinciden");
        return false;
    }

    // Contraseña obligatoria //
    if (formulario.contraseña.value.trim().length == 0) {
        alert("Contraseña Obligatoria");
        return false;
    }

    // Contraseña minimo 8 caracteres //
    if (formulario.contraseña.value.length < 8) {
        alert("Debe ingresar una contraseña mínima de 8 caracteres");
        return false;
    }

    // Validar contraseña //
    if (formulario.contraseña.value != formulario.confirmarContraseña.value) {
        alert("Las contraseñas no coinciden");
        return false;
    }
}

const init = () => {
    // Llamada a abrir y cerrar Menu
    menuBtn.addEventListener('click', toggleMenu);
}
init();