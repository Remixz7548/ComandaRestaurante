
const tablaProductos = document.getElementById('tabla-empleados');
const selectCategoria = document.getElementById('categoria');
const Agregarproducto = document.getElementById('add');
const expNumeros = /^[0-9]+$/;
const expLetras = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;

//=========================================INDEX==================================================
// Función para obtener y mostrar los empleados
async function obtenerProductos() {
    try {
        const response = await axios.get('/api/productos');
        const productos = response.data;
        const tbody = tablaProductos.querySelector('tbody');

        // Limpiar el contenido de la tabla antes de mostrar los nuevos datos
        tbody.innerHTML = '';

        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.classList.add('nombreProducto');
            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.name}</td>
                <td>$${producto.price}</td>
                <td>${producto.category}</td>
                <td>${producto.status}</td>
                <td>${producto.created_at}</td>
                <td class="botones">
                <button value="${producto.id}" class="editar"><i class='bx bxs-edit-alt'></i></button>
                <button value="${producto.id}" class="eliminar"><i class='bx bxs-trash-alt'></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener los datos de productos:', error);
    }
}

//=========================================SHOW==================================================
document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
        document.querySelectorAll(".nombreProducto").forEach(nombre =>{

            nombre.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?nombre.classList.remove("filtro")
            :nombre.classList.add("filtro")
        })
    }

});

//=========================================SHOW==================================================
async function FiltradoProductos(categoriaSeleccionado) {
    try {
        const response = await axios.get('/api/productos/show', {
            params: { categoria: categoriaSeleccionado }
        });
        const productos = response.data;
        const tbody = tablaProductos.querySelector('tbody');

        tbody.innerHTML = '';

        if (productos=='') {
            swal({
                title: "Error",
                text: "¡No se encontro ningun producto con esa categoria!",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function() {
                obtenerProductos();
            });
        } 
        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.classList.add('nombreProducto');
            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.name}</td>
                <td>$${producto.price}</td>
                <td>${producto.category}</td>
                <td>${producto.status}</td>
                <td>${producto.created_at}</td>
                <td class="botones">
                <button value="${producto.id}" class="editar"><i class='bx bxs-edit-alt'></i></button>
                <button value="${producto.id}" class="eliminar"><i class='bx bxs-trash-alt'></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener los datos de productos filtrados:', error);
    }
}

obtenerProductos();

// Evento para manejar la selección del rol y mostrar los empleados filtrados
selectCategoria.addEventListener('change', () => {
    const categoriaSeleccionado = selectCategoria.value;
    if (categoriaSeleccionado === 'todos') {
        obtenerProductos();
    } else {
        FiltradoProductos(categoriaSeleccionado);
    }
});

//=========================================CREATE==================================================
Agregarproducto.addEventListener("click", crearProducto);
async function crearProducto() {
    const {value:formProductos} = await Swal.fire({
        title: 'Agregar Producto',
        html:
        '<input class="swal2-input" type="text" id="name" placeholder="Nombre">' +
        '<input class="swal2-input" type="" id="price" placeholder="Precio">' +
        '<select class="swal2-input" name="cat" id="tipo">' +
            '<option value="Bebidas">Bebidas</option>' +
            '<option value="Platillos">Platillos</option>' +
            '<option value="Postres">Postres</option>' +
        '</select>' +
        '<select class="swal2-input" name="status" id="status">' +
            '<option value="Si">Si</option>' +
            '<option value="No">No</option>' +
        '</select>',
        showCancelButton: true,
        preConfirm: () => {
            return {
                name: document.getElementById("name").value,
                price: document.getElementById("price").value,
                category: document.getElementById("tipo").value,
                status: document.getElementById("status").value
            };
        },
    });

    if (formProductos) {
        if (formProductos.name.length == 0 || formProductos.price.length == 0 || formProductos.category.length == 0 || formProductos.status.length == 0) {
            await swal({
                title: "Error!",
                text: "No debe haber campos vacíos",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                crearProducto();
            });
        } else if (!expLetras.test(formProductos.name)) {
            await swal({
                title: "Error!",
                text: "El nombre solo permite letras",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                crearProducto();
            });
        }else if (!expNumeros.test(formProductos.price)) {
            await swal({
                title: "Error!",
                text: "El precio solo permite numeros",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                crearProducto();
            });
        } else{
            $.ajax({
                type: 'post',
                url: '/api/productos',
                data: {
                    name: formProductos.name,
                    price: formProductos.price,
                    category: formProductos.category,
                    status: formProductos.status
                },
                success:function(response) {
                    if (response.message) {
                        swal({
                            title: "Registro exitoso!",
                            text: response.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function() {
                            obtenerProductos();
                        });
                    }
                    else if (response.error) {
                        swal({
                            title: "Error!",
                            text: response.error,
                            icon: "error",
                            confirmButtonText: "OK",
                        }).then(function() {
                            crearProducto();
                        });
                    }
                }
            });
        }
        
    } 
};

//=========================================UPDATE==================================================

tablaProductos.addEventListener('click', (event) => {
    const botonEditar = event.target;
    const productoId = botonEditar.value;
    if (botonEditar.classList.contains('editar')) {
        editarProducto(productoId);
    }

    const iconoEditar = event.target.closest('.editar i');
    if (iconoEditar) {
        const botonEditar = iconoEditar.parentElement;
        const productoId = botonEditar.value;
        editarProducto(productoId);
    }
});

async function editarProducto(productoId) {
    try {
        const response = await axios.get('/api/productos/showUpdate', {
            params: { id: productoId }
        });
        const producto = response.data;
        const formName = producto[0].name;
        const formPrice = producto[0].price;
        const formCategory= producto[0].category;
        const formStatus = producto[0].status;
        const {value:formProductos} = await Swal.fire({
            title: 'Editar Producto',
            html:
            '<input class="swal2-input" type="text" id="name" placeholder="Nombre">' +
            '<input class="swal2-input" type="" id="price" placeholder="Precio">' +
            '<select class="swal2-input" name="cat" id="tipo">' +
                '<option value="Bebidas">Bebidas</option>' +
                '<option value="Platillos">Platillos</option>' +
                '<option value="Postres">Postres</option>' +
            '</select>' +
            '<select class="swal2-input" name="status" id="status">' +
                '<option value="Si">Si</option>' +
                '<option value="No">No</option>' +
            '</select>',
            didRender: () => {
                // Establecer los valores de los campos después de que se crea el contenido del modal
                document.getElementById('name').value = formName;
                document.getElementById('price').value = formPrice;
                document.getElementById('tipo').value = formCategory;
                document.getElementById('status').value = formStatus;
            },
            showCancelButton: true,
            preConfirm: () => {
                return {
                    name: document.getElementById("name").value,
                    price: document.getElementById("price").value,
                    category: document.getElementById("tipo").value,
                    status: document.getElementById("status").value
                };
            },
        });
        if (formProductos) {
            if (formProductos.name.length == 0 || formProductos.price.length == 0 || formProductos.category.length == 0 || formProductos.status.length == 0) {
                await swal({
                    title: "Error!",
                    text: "No debe haber campos vacíos",
                    icon: "error",
                    confirmButtonText: "OK",
                }).then(function () {
                    crearProducto();
                });
            } else if (!expLetras.test(formProductos.name)) {
                await swal({
                    title: "Error!",
                    text: "El nombre solo permite letras",
                    icon: "error",
                    confirmButtonText: "OK",
                }).then(function () {
                    crearProducto();
                });
            }else if (!expNumeros.test(formProductos.price)) {
                await swal({
                    title: "Error!",
                    text: "El precio solo permite numeros",
                    icon: "error",
                    confirmButtonText: "OK",
                }).then(function () {
                    crearProducto();
                });
            }else{
                $.ajax({
                    type: 'put',
                    url: '/api/productos/' + productoId,
                    data: {
                        name: formProductos.name,
                        price: formProductos.price,
                        category: formProductos.category,
                        status: formProductos.status
                    },
                    success:function(response) {
                        if (response.message) {
                            swal({
                                title: "Actualizacion exitosa!",
                                text: response.message,
                                icon: "success",
                                confirmButtonText: "OK",
                            }).then(function() {
                                obtenerProductos();
                            });
                        }
                        else if (response.error) {
                            swal({
                                title: "Error!",
                                text: response.error,
                                icon: "error",
                                confirmButtonText: "OK",
                            }).then(function() {
                                editarProducto(productoId);
                            });
                        }
                    }
                });
            }
            
        } 
    } catch (error) {
        console.error('Error al obtener los datos de productos:', error);
    }
};

//=========================================DELETE==================================================
tablaProductos.addEventListener('click', (event) => {
    const botonEliminar = event.target;
    const productoId = botonEliminar.value;
    if (botonEliminar.classList.contains('eliminar')) {
        eliminarProducto(productoId);
    }

    const iconoEliminar = event.target.closest('.eliminar i');
    if (iconoEliminar) {
        const botonEliminar = iconoEliminar.parentElement;
        const productoId = botonEliminar.value;
        eliminarProducto(productoId);
    }
});

async function eliminarProducto(productoId) {
    try {
        const response = await axios.get('/api/productos/showUpdate', {
            params: { id: productoId }
        });
        const producto = response.data;
        const formName = producto[0].name;
        Swal.fire({
            title: 'Eliminar Empleado',
            text: "¿Deseas eliminar el producto "+formName+"?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'delete',
                    url: '/api/productos/' + productoId,
                    success:function(response) {
                        if (response.message) {
                            swal({
                                title: "Eliminacion exitosa!",
                                text: response.message,
                                icon: "success",
                                confirmButtonText: "OK",
                            }).then(function() {
                                obtenerProductos();
                            });
                        }
                        else if (response.error) {
                            swal({
                                title: "Error!",
                                text: response.error,
                                icon: "error",
                                confirmButtonText: "OK",
                            }).then(function() {
                                obtenerProductos();
                            });
                        }
                    }
                });
            }
        })
    } catch (error) {
        console.error('Error al obtener los datos de productos:', error);
    }
}