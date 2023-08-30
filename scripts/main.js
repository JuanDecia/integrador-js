// ######### MAIN
const contenedor = document.querySelector('.cont-merch');

// Funcion que renderiza una lista de productos

const createProductTemplate = (product) => {
    const { id, nombre, valor, cardImg } = product;

    return `
    
    <div class="card-product">
    <div class="cont-img">
        <img class="img-product" src=${cardImg} alt=${nombre}>
    </div>

    <div class="cont-descripcion-producto">

        <div class="producto-nombre">
            ${nombre}
        </div>

        <div class="producto-valor">
            $${valor}
        </div>

    </div>

    <button class='btn-add'
    data-id='${id}'
    data-name='${nombre}'
    data-valor='${valor}'
    >ADD</button>
</div>
    `
}

const renderProducts = (productsList) => {
    contenedor.innerHTML += productsList
    .map(createProductTemplate)
    .join("");
};

// Función inicializadora
const init = () => {
    renderProducts(productos);
};

init();


// ######### PÁGINA INICIO SESIÓN
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

// ######### PÁGINA REGISTRO

function validar(formulario) {

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
