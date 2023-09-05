// ######### MAIN

// Elementos Render HTML
const contenedor = document.querySelector('.cont-render');
const showMoreBtn = document.querySelector('.cont-btn');
const successModal = document.querySelector('.add-modal');

// Elementos Menu
const menuBtn = document.querySelector('.menu-label');
const barsMenu = document.querySelector('.navbar-list');
const overlay = document.querySelector('.overlay');

// Elementos Carrito
const cartBtn = document.querySelector('.cart');
const cartMenu = document.querySelector('.cart-menu');
const productsCart = document.querySelector('.cart-container');
const total = document.querySelector('.total');
const buyBtn = document.querySelector('.btn-buy');
const deleteBtn = document.querySelector('.btn-delete');


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
          data-img='${cardImg}'
          >Agregar</button>
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

// Remueve el menú o carrito con Scroll.
const closeOnScroll = () => {
    if (!barsMenu.classList.contains('open-menu') && !cartMenu.classList.contains('open-cart')) {
        return
    };
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
};

const closeOnClick = (e) => {
    if (!e.target.classList.contains('link-header')) {
        return
    };
    barsMenu.classList.remove('open-menu');
    overlay.classList.remove('show-overlay');
};

const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderizar la compra.
const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `
        <div class='empty-message'>
            <p class='empty-msg'>No hay productos en el carrito.</p>
        </div>
        `
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join('');
};

const createCartProductTemplate = (cartProduct) => {
    const {id, name, valor, img, quantity} = cartProduct;

    console.log(cartProduct);

    return `
    <div class="card-item">
        <div class='item-img'>
            <img src=${img} alt=${name} />
        </div>
        <div class="item-data">
        <div class="item-info">
            <h3 class="item-title">${name}</h3>
            <p class="item-price">${valor}</p>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
        </div>
    </div>
    `
};

// Muestra total de la compra
const showCartTotal = () => {
    total.innerHTML = `${getCartTotal()}`
};

// Calcula el total de la compra.
const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.valor) * cur.quantity, 0)
};

// Agregar contenido al carrito.
const addProduct = (e) => {

    if (!e.target.classList.contains('btn-add')) {
        return;
    }

    const product = createProductData(e.target.dataset);

    // Comprueba si el producto esta en el carrito.
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product);
        showSuccessModal('Se agregó una unidad del producto al carrito');
    } else {
        createCartProduct(product);
        showSuccessModal('El producto se ha agregado al carrito');
    }

    updateCartState();

};

// console.log(addProduct());

// Desustructura el producto que se encuentra en el carrito.
const createProductData = ( product ) => {
    const {id, name, valor, img} = product;
    return { id, name, valor, img }
};

// Auxiliar: Verifica si el producto está en el carrito.
const isExistingCartProduct = ( product ) => {
    return cart.find((item) => item.id === product.id);
};

// Agrega una unidad ya existente.
const addUnitToProduct = ( product ) => {
    cart = cart.map((cartProduct) => 
        cartProduct.id === product.id
            ? {...cartProduct, quantity: cartProduct.quantity + 1}
            : cartProduct
    );
};

// Mensaje al usuario.
const showSuccessModal = ( msg ) => {
    successModal.classList.add('active-modal');
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove('active-modal')
    }, 1500);
};


// Creamos objeto con la info del producto a agregar
const createCartProduct = ( product ) => {
    cart = [...cart, { ...product, quantity: 1 }];
};

// Deshabilitamos los botones si el carrito está vacío.
const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
    }
};

// Actualización el carro.
const updateCartState = () => {

    saveCart();
    renderCart();
    showCartTotal();

    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};

// Maneja el evento click del boton '+' del carrito.
const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);

    addUnitToProduct(existingCartProduct);
};

// Maneja el evento click del boton '-' del carrito.
const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);

    if (existingCartProduct.quantity === 1) {
        if (window.confirm('Desea Eliminar el producto del carrito?')) {
            removeProductFromCart(existingCartProduct);
        }
        return;
    }
    substractProductUnit(existingCartProduct);
}

// Quita una unidad del producto.
const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity) -1 }
            : product;
    });
};

// Elimina un producto del carrito.
const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    updateCartState();
};

// Manejador del + y - del carrito.
const handleQuantity = (e) => {
    if (e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains('up')) {
        handlePlusBtnEvent(e.target.dataset.id);
    }
    updateCartState();
};

// Vaciar carrito.
const resetCartItems = () => {
    cart = [];
    updateCartState();
};

// Completar compra o vaciar carrito.
const CompleteCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return; // Si está vacío no hace nada.

    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }
};

const deleteCart = () => {
    CompleteCartAction('Desea vaciar el carrito?', 'No hay productos en el carrito.');
};

// Función inicializadora
const init = () => {

    // Traemos el arreglo de data y solo mostramos el primer índice.
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener('click', showMoreProducts);

    // Carrito y Menu (aperturas).
    cartBtn.addEventListener('click', toggleCart);
    menuBtn.addEventListener('click', toggleMenu);

    // Carrito y Menu (cierres).
    window.addEventListener('scroll', closeOnScroll);
    barsMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);

    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showCartTotal);
    productsCart.addEventListener('click', handleQuantity);
    contenedor.addEventListener('click', addProduct);
    deleteBtn.addEventListener('click', deleteCart);

    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};

init();
