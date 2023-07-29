@extends('admin.plantilla')
@section('titulos')
    Empleados
@endsection
@section('menuempleado')
    active
@endsection
@section('contenido')
    <div class="container-con">
        <h1 class="Titulo">Empleados</h1>
        <div class="container-crud-add">
            <button class="add">Crear nuevo usuario</button>
            <div class="bread">
                <i class='bx bxs-home'></i>
                <a href="/Admin">Panel</a>
                <i class='bx bx-chevron-right'></i>
                <p>Empleados</p>
            </div>
        </div>
        <div class="container-crud">
            <div class="buscar">
                <input type="text" placeholder="Buscar nombre aqui . . ." name="" id="">

                <select name="Rol" id="">
                    <option hidden selected>Filtrar por rol</option>
                    <option value="admin">Admin</option>
                    <option value="cajero">Cajero</option>
                    <option value="cocinero">Cocinero</option>
                    <option value="camarero">Camarero</option>
                </select>
            </div>
            <table id="tabla-empleados">
                <thead>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Tipo de Usuarios</th>
                    <th>Fecha de Creacion</th>
                    <th></th>
                </thead>
                <tbody>
                        <!-- Los datos de los empleados se mostrarán aquí -->
                </tbody>
            </table>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.js"></script>
    <script src="{{ asset('js/empleados.js') }}"></script>
@endsection