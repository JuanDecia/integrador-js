// ######### MAIN

// Elementos Render HTML
const contenedor = document.querySelector('.cont-render');
const showMoreBtn = document.querySelector('.cont-btn');

// Elementos Menu
const menuBtn = document.querySelector('.menu-label');
const barsMenu = document.querySelector('.navbar-list');
const overlay = document.querySelector('.overlay');

// Elementos Carrito
const cart = document.querySelector('.cart');
const cartMenu = document.querySelector('.cart-menu');

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
        
        <div class='cont-btn-add'>
          <button class='btn-add'
          data-id='${id}'
          data-name='${nombre}'
          data-valor='${valor}'
          >ADD</button>
        </div>
      </div>


    </div>
    `
};

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
}

// Función para mostrar más productos
const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add('hidden');
    }
}

// Función que imprime la lista de productos
const renderProducts = (productsList) => {
    contenedor.innerHTML += productsList.map(createProductTemplate).join("");
};

// Función para el menú del carro
const toggleCart = () => {

    // abre el menu
    cartMenu.classList.toggle('open-cart');

    if (barsMenu.classList.contains('open-menu')) {
        barsMenu.classList.remove('open-menu');
        return;
    }

    overlay.classList.toggle('show-overlay');
}

// Menu y overlay
const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    if (cartMenu.classList.contains('open-cart')) {
        cartMenu.classList.remove('open-cart');
        return;
    }
    overlay.classList.toggle('show-overlay');
}


// Función inicializadora
const init = () => {

    // Traemos el arreglo de data y solo mostramos el primer índice
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener('click', showMoreProducts);

    // Carrito
    cart.addEventListener('click', toggleCart);

    // Menu
    menuBtn.addEventListener('click', toggleMenu);
};

init();

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
