class GestionarProductos {

    iniciar(){

        productos = [

            {
                "id": 1,
                "nombre": "BASIC PACK",
                "tipoDeCliente": "MEJOR OPCION PARA PRINCIPIANTES",
                "descripcion": "Estrategia de robot conservadora con riesgo minimo y rentabilidad confiable.",
                "rendimiento": "La red estatica cotiza a un nivel de rendimiento bajo: hasta 10%/mes.",
                "precio": "40",
                "destacado": 1
            },
            {
                "id": 2,
                "nombre": "PREMIUM PACK",
                "tipoDeCliente": "MEJOR OPCION PARA INTERMEDIOS",
                "descripcion": "Estrategia de robot progresiva con riesgo medio y alta rentabilidad.",
                "rendimiento": "En saltos bruscos en el maricat, puede facilmente ganar hasta un 20%.",
                "precio": "63",
                "destacado": 1
            },
            {
                "id": 3,
                "nombre": "PRO IA",
                "tipoDeCliente": "MEJOR OPCION PARA EXPERIMENTADOS",
                "descripcion": "Estrategia de robot progresiva con riesgo medio y alta rentabilidad.",
                "rendimiento": "En saltos bruscos en el maricat, puede facilmente ganar hasta un 30%.",
                "precio": "80",
                "destacado": 1
            },
            {
                "id": 4,
                "nombre": "MASTER IA",
                "tipoDeCliente": "MEJOR OPCION PARA EXPERIMENTADOS",
                "descripcion": "Estrategia de robot progresiva con riesgo medio y alta rentabilidad.",
                "rendimiento": "En saltos bruscos en el maricat, puede facilmente ganar hasta un 40%.",
                "precio": "95",
                "destacado": 1
            }

        ]
        
        let productosDestacados = productos.filter(prod => prod.destacado == 1) ;

        this.cargarProductos(productosDestacados);
        this.mostrarCarrito();
        this.actulizarContador();

    }
    // carga de todos los productos del arreglo productos
    cargarProductos(productos){
        const divProductos = document.querySelector("#productos");
        divProductos.innerHTML = "";

        if(productos.length === 0){
            this.mostrarHeader ("NO HAY PRODUCTOS DISPONIBLES")
        }else{
            productos.forEach(producto => {
                let prod = document.createElement('div');
                prod.classList.add ('d-flex', 'producto', 'cajaRobot', producto.id);
                prod.setAttribute('id','row_' + producto.id)

                prod.innerHTML = `

                    <div>
                        <h2> ${producto.nombre} </h2>
                    </div>
                    <div>
                        <h5> ${producto.tipoDeCliente} </h5>
                    </div>
                    <div>
                        <p> ${producto.descripcion} </p>
                    </div>
                    <div>
                        <p> ${producto.rendimiento} </p>
                    </div>
                    <div class="priceGrande", "precioStandar">
                         PRICE:  
                    </div>
                    <div class="priceChico">
                        <span class="precio">$ ${producto.precio}</span> /Mes
                    </div>
                    <div class="botonCard">
                        <a href="javascript:addCarrito(${producto.id})" class="botonRobot">Agregar al carrito</a>
                    </div>

                    `;

                    divProductos.appendChild(prod);
                    


            });
        }

    }
    // funcion del search
    buscar( q ) { 

        let resultado = productos.filter( producto => producto.nombre.toLowerCase().includes( q.toLowerCase() ) || producto.descripcion.toLowerCase().includes( q.toLowerCase() ));      
        this.cargarProductos( resultado );                   
    }
    // funcion de agregar al carrito
    addCart( infoProducto ) {
        
        
        const existe = carrito.some( producto => producto.id === infoProducto.id );
    
        // si ya existe necesito aumentar el contador
        if(existe) 
        {
            
            const articulos = carrito.map( producto => {
    
                if(producto.id === infoProducto.id)
                {
                    producto.cantidad++;
                    return producto;
                }
                else
                {
                    return producto;
                }
    
                         
    
            })
    carrito = articulos;      
    Swal.fire({
        position: 'top-end',
        text: 'Producto agregado nuevamente',
        showConfirmButton: false,
        background: '#1038ee',
        color: '#f5f5f5',
        width: '380px',

        timer: 2500
      })
    
        }
        else 
        {
            // Como no existe lo agrego
            carrito.push(infoProducto);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado correctamente',
                showConfirmButton: false,
                iconColor: '#cb9b00',
                background: '#1038ee',
                color: '#f5f5f5',
                timer: 2500
              })
    
        }
    
        this.actualizarCarrito();
        }
    
        //Contabilizo las cantidad de productos
        contarProductos() { 
    
            let contadorProductos = 0;
    
            carrito.forEach(( producto ) => {
    
                contadorProductos = contadorProductos + parseInt(producto.cantidad);
            })
    
            return contadorProductos;
        }
    // funcion de actualizar el carrito
    actualizarCarrito(){
        
        this.actulizarContador();

        this.mostrarCarrito(); 
        this.guardarCarrito();
    }
    // funcion de actualizar el contador
    actulizarContador(){
        let totalProductos = this.contarProductos();
        let countCarrito = document.querySelector('#badgeCarritoEditado');
        countCarrito.innerHTML = totalProductos;
    }

    contarProductos(){
        let contadorProductos = 0 ;
        carrito.forEach ((producto) =>{
            // suma el total de los precio de todas las cantidades de productos elegidos
            contadorProductos = contadorProductos + producto.cantidad;
        })

        return contadorProductos ;
    }
        // elimina un articulo del carrito
        eliminarArticulo( id ) { 

            Swal.fire({
                title: '¿Estas seguro?',
                text: "Se eliminaran los productos seleccionados del carrito.",
                icon: 'warning',
                showCancelButton: true,
                iconColor: '#cb9b00',
                background: '#1038ee',
                color: '#f5f5f5',
                confirmButtonColor: '#cb9b00',
                cancelButtonColor: '#cb9b00',
                confirmButtonText: 'Si'
              }).then((result) => {
                
                if (result.isConfirmed) 
                {
                    carrito = carrito.filter( articulo => articulo.id != id);
                    this.actualizarCarrito();
    
                    // Mostramos un msg con el resultado de la operacion
                    Swal.fire({
                        title: 'Eliminado!',
                        text: 'Se eliminaron tus productos correctamente.',
                        icon: 'success',
                        iconColor: '#cb9b00',
                        background: '#1038ee',
                        color: '#f5f5f5',
                        confirmButtonColor: '#cb9b00'
                      })
                }            
              })            
        
    }
    // guarda el carrito el localStorage (usando JSON)
    guardarCarrito(){

        localStorage.setItem('carrito', JSON.stringify(carrito));
        
    }
    // Funcion que inserta a html los productos seleccionados
    mostrarCarrito(){

        let detalleCarrito = document.querySelector("#idCarrito");
        detalleCarrito.innerHTML = "";

        let total = 0 ;
        carrito.forEach( (producto) =>{


            const row = document.createElement ("div");
            row.classList.add("row");
            total += parseInt(producto.precio*producto.cantidad);

            row.innerHTML = `
                        <div class="col-4 d-flex aling-items-center p-2 border-bottom">
                            ${producto.nombre}
                        </div>
                        <div class="col-4 d-flex aling-items-center justyfy-content-end p-2 border-bottom">
                            $ ${producto.precio}
                        </div>
                        <div class="col-2 d-flex aling-items-center justyfy-content-end p-2 border-bottom">
                            ${producto.cantidad}
                        </div>

                        <div class="col-2 d-flex aling-items-center justyfy-content-end p-2 border-bottom">
                            <a href="javascript:eliminar(${producto.id})">
                                <i class="fa-solid botonEliminar fa-square-minus fa-2x"></i>
                            </a>
                        </div>
                        

            `;
        

        detalleCarrito.appendChild(row);
    })
        let row = document.createElement("div");
        row.classList.add("row");

        row.innerHTML= `
                    <div class="col-4 d-flex aling-items-center justify-content-start p-2 border-bottom">
                        Total a pagar:
                    </div>
                    <div class="col-8 d-flex aling-items-center justify-content-end p-2 border-bottom">
                        <b> $ ${total}</b>
                    </div>

        `;
        detalleCarrito.appendChild(row);

        

    }
    // mensaje automatizado
    mostrarHeader(msj){
        const headerProductos = document.querySelector("#headerProductos");
        headerProductos.innerHTML = msj ;
    }

}