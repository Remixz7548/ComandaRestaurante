axios.get('/api/empleados')
    .then(response => {
        const empleados = response.data;
        const tablaEmpleados = document.getElementById('tabla-empleados');
        const tbody = tablaEmpleados.querySelector('tbody');

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
    })
    .catch(error => {
        console.error('Error al obtener los datos de empleados:', error);
    });