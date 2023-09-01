const productos = [
    {
        id: 1,
        nombre: 'Camiseta Almagro',
        valor: 5000,
        cardImg: './img/camiseta.webp' ,
    },
    {
        id: 2,
        nombre: 'Short Amarillo',
        valor: 2500,
        cardImg: './img/Short.jpeg',
    },
    {
        id: 3,
        nombre: 'Conjunto Amarillo',
        valor: 7000,
        cardImg: './img/conjunto.jpeg',
    },
    {
        id: 4,
        nombre: 'Pelota Futbol',
        valor: 3000,
        cardImg: './img/pelota.jpg',
    },
    {
        id: 5,
        nombre: 'Alquiler Cancha 11',
        valor: 30000,
        cardImg: './img/cancha.jpg',
    },
    {
        id: 6,
        nombre: 'Hazte Socio',
        valor: 1500,
        cardImg: './img/socio.webp',
    },
];

// Función divide en grupos el objeto productos

const divideProductsInParts = (size) => {
    let productsList = [];
    for (let i = 0; i < productos.length; i += size)
      productsList.push(productos.slice(i, i + size))
    return productsList;
  };

// Objeto para agrupar (concepto estado)

const appState = {
    products: divideProductsInParts(3),
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(3).length
};