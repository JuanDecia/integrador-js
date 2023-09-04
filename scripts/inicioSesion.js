// Elementos Menu
const menuBtn = document.querySelector('.menu-label');
const barsMenu = document.querySelector('.navbar-list');
const overlay = document.querySelector('.overlay');

// Menu y overlay
const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    overlay.classList.toggle('show-overlay');
}

const iniciarSesion = (formulario) => {

    // Validamos el email a traves de una expresión regular //
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.email.value)) {
        alert("Email inválido");
        return false;
    }
    
    // Validamos que la contraseña sea obligatoria //
    if (formulario.contraseña.value.trim().length == 0) {
        alert("Contraseña Obligatoria");
        return false;
    }

    // Contraseña mayor a 8 caracteres //
    if (formulario.contraseña.value.length < 8) {
        alert("Debe ingresar una contraseña mínima de 8 caracteres");
        return false;
    }
}

const init = () => {

    // Menu
    menuBtn.addEventListener('click', toggleMenu);
}
init();
