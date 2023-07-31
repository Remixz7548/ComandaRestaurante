const tablaEmpleados = document.getElementById('tabla-empleados');
const selectRol = document.getElementById('rol');
const Agregarempleado = document.getElementById('add');

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
                <td class="botones"><button class="editar"><i class='bx bxs-edit-alt'></i></button>
                <button class="eliminar"><i class='bx bxs-trash-alt'></i></button></td>
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
                <td class="botones"><button class="editar"><i class='bx bxs-edit-alt'></i></button>
                <button class="eliminar"><i class='bx bxs-trash-alt'></i></button></td>
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
        '<input type="text" id="name" placeholder="Nombre">' +
        '<input type="text" id="username" placeholder="Usuario">' +
        '<input type="password" id="password" placeholder="Contraseña">' +
        '<select name="rol" id="tipo">' +
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
                swal({
                    title: "Registro exitoso!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(function() {
                    obtenerEmpleados();
                });
            }
        });
    } 
};