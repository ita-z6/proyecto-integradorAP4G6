document.addEventListener('DOMContentLoaded',traerProductos)
const contenedorProductos = document.querySelector('#contenedorProductos')
const modal = new bootstrap.Modal('#modal',{})


async function traerProductos(){
    const url = 'https://fakestoreapi.com/products/category/electronics'

    try {
        const resultado = await fetch(url)
        const respuesta = await resultado.json()
        productosElectronicos(respuesta)
        
    } catch (error) {
        console.log(error)
    }
}

function productosElectronicos(productos){
    console.log(productos);
    productos.forEach(prod => {
        const {id,title,price,category,image}= prod
        contenedorProductos.innerHTML += ` <div class="card" style="width: 18rem;">
        <img src="${image}" onclick=verProducto(${id}) class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-subtitle mb-2 text-muted">Precio: $${price}</p>
          <p class="card-subtitle mb-2">Categoria: ${category}</p>
          <button onclick="agregarProducto(${id})" class="btn btn-warning">Comprar</button>
        </div>
      </div> `
     });
}

async function verProducto(id){
    const url = `https://fakestoreapi.com/products/${id}`

    try{
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        verProductoDetalle(resultado)
    } catch(error){
        console.log(error)
    }
}

function verProductoDetalle(resultado){
    const {title,price,image,description}= resultado;
    const modalTitle = document.querySelector('.modal .modal-title')
    const modalBody = document.querySelector('.modal .modal-body')

    modalTitle.textContent = title;
    modalBody.innerHTML = `
    <img class="img-fluid" src="${image}">
    <p class="text-center">${description} </p>
    <p class="text-center text-danger">Precio: $${price}</p>
    `
    


    modal.show()
}

