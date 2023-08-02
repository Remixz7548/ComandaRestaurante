
const tablaEmpleados = document.getElementById('tabla-empleados');
const selectRol = document.getElementById('rol');
const Agregarempleado = document.getElementById('add');
const expNombre = /^(\b[a-zA-ZñÑ]+\b\s+){1,5}\b[a-zA-ZñÑ]+\b(\s*)$/;

//=========================================INDEX==================================================
// Función para obtener y mostrar los empleados
async function obtenerEmpleados() {
    try {
        const response = await axios.get('/api/empleados');
        const empleados = response.data;
        const tbody = tablaEmpleados.querySelector('tbody');

        // Limpiar el contenido de la tabla antes de mostrar los nuevos datos
        tbody.innerHTML = '';

        empleados.forEach(empleado => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${empleado.id}</td>
                <td>${empleado.name}</td>
                <td>${empleado.username}</td>
                <td>${empleado.user_type}</td>
                <td>${empleado.created_at}</td>
                <td class="botones">
                <button value="${empleado.id}" class="editar"><i class='bx bxs-edit-alt'></i></button>
                <button value="${empleado.id}" class="eliminar"><i class='bx bxs-trash-alt'></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener los datos de empleados:', error);
    }
}

//=========================================SHOW==================================================
async function FiltradoEmpleados(rolSeleccionado) {
    try {
        const response = await axios.get('/api/empleados/show', {
            params: { rol: rolSeleccionado }
        });
        const empleados = response.data;
        const tbody = tablaEmpleados.querySelector('tbody');

        tbody.innerHTML = '';

        if (empleados=='') {
            swal({
                title: "Error",
                text: "¡No se encontro ningun usuario con ese rol!",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function() {
                obtenerEmpleados();
            });
        } 
        empleados.forEach(empleado => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${empleado.id}</td>
                <td>${empleado.name}</td>
                <td>${empleado.username}</td>
                <td>${empleado.user_type}</td>
                <td>${empleado.created_at}</td>
                <td class="botones">
                <button value="${empleado.id}" class="editar"><i class='bx bxs-edit-alt'></i></button>
                <button value="${empleado.id}" class="eliminar"><i class='bx bxs-trash-alt'></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener los datos de empleados filtrados:', error);
    }
}

obtenerEmpleados();

// Evento para manejar la selección del rol y mostrar los empleados filtrados
selectRol.addEventListener('change', () => {
    const rolSeleccionado = selectRol.value;
    if (rolSeleccionado === 'todos') {
        obtenerEmpleados();
    } else {
        FiltradoEmpleados(rolSeleccionado);
    }
});

//=========================================CREATE==================================================
Agregarempleado.addEventListener("click", crearEmpleado);
async function crearEmpleado() {
    const {value:formEmpleados} = await Swal.fire({
        title: 'Agregar Empleado',
        html:
        '<input class="swal2-input" type="text" id="name" placeholder="Nombre">' +
        '<input class="swal2-input" type="text" id="username" placeholder="Usuario">' +
        '<input class="swal2-input" type="password" id="password" placeholder="Contraseña">' +
        '<select class="swal2-input" name="rol" id="tipo">' +
            '<option value="admin">Admin</option>' +
            '<option value="cajero">Cajero</option>' +
            '<option value="cocinero">Cocinero</option>' +
            '<option value="camarero">Camarero</option>' +
        '</select>',
        showCancelButton: true,
        preConfirm: () => {
            return {
                name: document.getElementById("name").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                user_type: document.getElementById("tipo").value
            };
        },
    });

    if (formEmpleados) {
        if (formEmpleados.name.length == 0 || formEmpleados.username.length == 0 || formEmpleados.password.length == 0 || formEmpleados.user_type.length == 0) {
            await swal({
                title: "Error!",
                text: "No debe haber campos vacíos",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                crearEmpleado();
            });
        } else if (!expNombre.test(formEmpleados.name)) {
            await swal({
                title: "Error!",
                text: "El nombre debe tener al menos dos nombres y solo permite letras",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                crearEmpleado();
            });
        } else if (formEmpleados.username.length > 25) {
            await swal({
                title: "Error!",
                text: "El usuario no debe tener una longitud mayor a 25",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                crearEmpleado();
            });
        } else if (formEmpleados.password.length < 8) {
            await swal({
                title: "Error!",
                text: "La contraseña debe tener al menos 8 caracteres",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                crearEmpleado();
            });
        }else{
            $.ajax({
                type: 'post',
                url: '/api/empleados',
                data: {
                    name: formEmpleados.name,
                    username: formEmpleados.username,
                    password: formEmpleados.password,
                    user_type: formEmpleados.user_type
                },
                success:function(response) {
                    if (response.message) {
                        swal({
                            title: "Registro exitoso!",
                            text: response.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function() {
                            obtenerEmpleados();
                        });
                    }
                    else if (response.error) {
                        swal({
                            title: "Error!",
                            text: response.error,
                            icon: "error",
                            confirmButtonText: "OK",
                        }).then(function() {
                            crearEmpleado();
                        });
                    }
                }
            });
        }
        
    } 
};

//=========================================UPDATE==================================================

tablaEmpleados.addEventListener('click', (event) => {
    const botonEditar = event.target;
    const empleadoId = botonEditar.value;
    if (botonEditar.classList.contains('editar')) {
        editarEmpleado(empleadoId);
    }

    const iconoEditar = event.target.closest('.editar i');
    if (iconoEditar) {
        const botonEditar = iconoEditar.parentElement;
        const empleadoId = botonEditar.value;
        editarEmpleado(empleadoId);
    }
});

async function editarEmpleado(empleadoId) {

    const {value:formEmpleados} = await Swal.fire({
        title: 'Editar Empleado',
        html:
        '<input class="swal2-input" type="text" id="name" placeholder="Nombre">' +
        '<input class="swal2-input" type="text" id="username" placeholder="Usuario">' +
        '<input class="swal2-input" type="password" id="password" placeholder="Contraseña">' +
        '<select class="swal2-input" name="rol" id="tipo">' +
            '<option value="admin">Admin</option>' +
            '<option value="cajero">Cajero</option>' +
            '<option value="cocinero">Cocinero</option>' +
            '<option value="camarero">Camarero</option>' +
        '</select>',
        showCancelButton: true,
        preConfirm: () => {
            return {
                name: document.getElementById("name").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                user_type: document.getElementById("tipo").value
            };
        },
    });

    if (formEmpleados) {
        if (formEmpleados.name.length == 0 || formEmpleados.username.length == 0 || formEmpleados.password.length == 0 || formEmpleados.user_type.length == 0) {
            await swal({
                title: "Error!",
                text: "No debe haber campos vacíos",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                editarEmpleado();
            });
        } else if (!expNombre.test(formEmpleados.name)) {
            await swal({
                title: "Error!",
                text: "El nombre debe tener al menos dos nombres y solo permite letras",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                editarEmpleado();
            });
        } else if (formEmpleados.username.length > 25) {
            await swal({
                title: "Error!",
                text: "El usuario no debe tener una longitud mayor a 25",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                editarEmpleado();
            });
        } else if (formEmpleados.password.length < 8) {
            await swal({
                title: "Error!",
                text: "La contraseña debe tener al menos 8 caracteres",
                icon: "error",
                confirmButtonText: "OK",
            }).then(function () {
                editarEmpleado();
            });
        }else{
            $.ajax({
                type: 'put',
                url: '/api/empleados/' + empleadoId,
                data: {
                    name: formEmpleados.name,
                    username: formEmpleados.username,
                    password: formEmpleados.password,
                    user_type: formEmpleados.user_type
                },
                success:function(response) {
                    if (response.message) {
                        swal({
                            title: "Actualizacion exitosa!",
                            text: response.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function() {
                            obtenerEmpleados();
                        });
                    }
                    else if (response.error) {
                        swal({
                            title: "Error!",
                            text: response.error,
                            icon: "error",
                            confirmButtonText: "OK",
                        }).then(function() {
                            obtenerEmpleados();
                        });
                    }
                }
            });
        }
        
    } 
};

//=========================================DELETE==================================================
tablaEmpleados.addEventListener('click', (event) => {
    const botonEliminar = event.target;
    const empleadoId = botonEliminar.value;
    if (botonEliminar.classList.contains('eliminar')) {
        eliminarEmpleado(empleadoId);
    }

    const iconoEliminar = event.target.closest('.eliminar i');
    if (iconoEliminar) {
        const botonEliminar = iconoEliminar.parentElement;
        const empleadoId = botonEliminar.value;
        eliminarEmpleado(empleadoId);
    }
});

async function eliminarEmpleado(empleadoId) {
    Swal.fire({
        title: 'Eliminar Empleado',
        text: "¿Deseas eliminar este empleado?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'delete',
                url: '/api/empleados/' + empleadoId,
                success:function(response) {
                    if (response.message) {
                        swal({
                            title: "Eliminacion exitosa!",
                            text: response.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function() {
                            obtenerEmpleados();
                        });
                    }
                    else if (response.error) {
                        swal({
                            title: "Error!",
                            text: response.error,
                            icon: "error",
                            confirmButtonText: "OK",
                        }).then(function() {
                            obtenerEmpleados();
                        });
                    }
                }
            });
        }
    })
}