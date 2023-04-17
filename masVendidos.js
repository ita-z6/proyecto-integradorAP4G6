const productoStock = [
    {
      id: 1,
      title: "Parlante Sony Extra Bass XB13 SRS-XB13 portátil con bluetooth waterproof negro",
      price: 50,
      image:"./media/masVendidos/1361-8f6378a00047df90ce16748671617706-640-0.webp",
      cantidad:1
    },
    {
      id: 2,
      title: "AURICULAR INALAMBRICO HYPERX CLOUD FLIGHT - NEGRO Y ROJO",
      price: 80,
      image:"./media/masVendidos/1558733874_236778llo.jpg",
      cantidad:1
    },
    {
      id: 3,
      title: "MOUSE LOGITECH G203 LIGHTSYNC BLACK",
      price: 20,
      image:"./media/masVendidos/21598-1.jpg",
      cantidad:1
    },
    {
      id: 4,
      title: "PLACA DE VIDEO GEFORCE RTX 3070 GAMING Z TRIO 8GB RGB - MSI",
      price: 300,
      image:"./media/masVendidos/MKT0242EBX-1.jpg",
      cantidad:1
    },
    {
      id: 5,
      title: "CELULAR MOTOROLA MOTO G22 XT-2231-5 CELESTE",
      price: 175,
      image:"./media/masVendidos/Moto_G22.jpg",
      cantidad:1  
    },
    {
      id: 6,
      title: "Samsung Galaxy S23 Ultra 12gb 256gb Cream",
      price: 200,
      image:"./media/masVendidos/Samsung_S23.jpg",
      cantidad:1
    },
    {
      id: 7,
      title: 'Smart TV LED 55" Philips PUD7406 4K Smart Ultra HD',
      price: 150,
      image:"./media/masVendidos/tv2841-1.webp",
      cantidad:1
    },
    {
      id: 8,
      title: "Xiaomi Redmi Note 11 Pro 5G (Snapdragon) Dual SIM 128 GB azul atlántico 6 GB RAM",
      price: 250,
      image:"./media/masVendidos/xiaomi-redmi-note-11-pro-5g-8gb-128gb-dual-sim-azul.png",
      cantidad:1
    }
  ];
  let carrito = []
 

  const masVendidos = document.querySelector('.masVendidos')
  const carritoContenedor = document.querySelector('#carritoContenedor')
  const vaciarCarrito = document.querySelector('#vaciarCarrito')
  const precioTotal = document.querySelector('#precioTotal')
  const procesarCompra = document.querySelector('#procesarCompra')
  const activarFuncion = document.querySelector('#activarFuncion')
  const totalProceso = document.querySelector('#totalProceso')
  const formulario = document.querySelector('#procesar-pago')

  if(activarFuncion){
  activarFuncion.addEventListener('click', procesarPedido)
  }
  
document.addEventListener('DOMContentLoaded', ()=>{
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    mostrarCarrito();

    if(activarFuncion){
    document.querySelector('#activarFuncion'.click(procesarPedido))
}
});
if(formulario){
    formulario.addEventListener('#activarFuncion',enviarPedido)
  } 
  
  productoStock.forEach((prod) => {
    const{id,title,price,image,cantidad}=prod
    
    masVendidos.innerHTML += `
    <div class="cardVendido">
      <div class="cara frente">
        <img src="${image}" alt="imagen">
      </div>
      <div class="cara atras">
        <p>${title}</p>
        <p>Precio: $${price}</p>
        <button onclick="agregarProducto(${id})" class="btn btn-warning">Comprar</button>
      </div>
    </div>
    `
    
  })

  if(procesarCompra){
  procesarCompra.addEventListener('click',() =>{
    if(carrito.length === 0){
        Swal.fire({
            title: "¡Tu carrito está vacio!",
            text: "Compra algo para continuar con la compra",
            icon: "error",
            confirmButtonText: "Aceptar",
            });
    }else {
         location.href= "compra.html";
            }
    });
  }

  if(vaciarCarrito){
  vaciarCarrito.addEventListener('click',() =>{
    carrito.length =[]
    mostrarCarrito()
  })
}
  function agregarProducto(id){

    const existe = carrito.some(prod => prod.id ===id)
    if(existe){
        const prod = carrito.map(prod =>{
            if(prod.id === id){
                prod.cantidad++
            }
        })
    } else{
        
    const item = productoStock.find((prod)=>prod.id ===id)
    carrito.push(item)
    }

    mostrarCarrito()
  }
  const mostrarCarrito = () =>{
    const modalBody = document.querySelector('.modal .modal-body')
    if(modalBody){

    modalBody.innerHTML = ''
    carrito.forEach((prod)=>{
        const {id,title,price,image,cantidad}=prod
        modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${image}">
        </div>
        <div>
        <p>Producto: ${title}</p>
        <p>Precio: $${price}</p>
        <p>Cantidad:${cantidad}</p>

        <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>
        </div>
        </div>
        `
    })
}
    if(carrito.length === 0){
        modalBody.innerHTML=`
        <p class="text-center parrafo">¡Tu carrito esta vacio :( !</p>
        `
    }else {
        console.log("algo")
    }

    carritoContenedor.textContent = carrito.length
    if(precioTotal){
    precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.cantidad * prod.price,0)
    }

    guardarStorage()
  }
  function eliminarProducto(id){
    const productoId = id 
    carrito = carrito.filter((prod)=>prod.id !== productoId)
    mostrarCarrito()
}

function guardarStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito))
}

function procesarPedido(){
    carrito.forEach((prod)=>{
        const listaCompra = document.querySelector('#lista-compra tbody')
        const {id,title,price,cantidad,image} = prod;
        if (listaCompra) {
        const row = document.createElement('tr')
        row.innerHTML += `
            <td>
            <img class="img-fluid img-carrito" src="${image}">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${cantidad}</td>
            <td>${price * cantidad}</td>
        `
        listaCompra.appendChild(row)
        }
    })
    totalProceso.innerText = carrito.reduce((acc, prod)=> acc + prod.cantidad * prod.price,0);
}
function enviarPedido(e){
    e.preventDeFault()
    const cliente = documente.querySelector('#cliente').value

    if(cliente === ''){
        Swal.fire({
            title: "¡Debes completar tu nombre!",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
        }
        else{
            console.log('pasaste');
        }
    }
