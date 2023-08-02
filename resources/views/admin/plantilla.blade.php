<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('metadatos')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Administrador | @yield('titulos')</title>
</head>
<body>
    <div class="container">
        <nav class="menu">
            <div class="titulo" href="">
                <i class='bx bx-restaurant' ></i>
                <span>COMANDADAS</span>
            </div>
            <ul class="submenu">
                <li class="@yield('menupanel')">
                    <a href="/Admin">
                        <i class='bx bxs-dashboard'></i>
                        <span>Panel</span>
                    </a>
                </li>
                <li class="@yield('menuempleado')">
                    <a href="/Admin/Empleados">
                        <i class='bx bxs-group' ></i>
                        <span>Empleados</span>
                    </a>
                </li>
                <li class="@yield('menuproducto')">
                    <a href="#">
                        <i class='bx bxs-food-menu' ></i>
                        <span>Productos</span>
                    </a>
                </li>
                <li class="@yield('menupago')">
                    <a href="#">
                        <i class='bx bxs-credit-card'></i>
                        <span>Pagos</span>
                    </a>
                </li>
                <li class="@yield('menuorden')">
                    <a href="#">
                        <i class='bx bxs-receipt'></i>
                        <span>Ordenes</span>
                    </a>
                </li>
                <li class="@yield('menuingreso')">
                    <a href="#">
                        <i class='bx bxs-dollar-circle'></i>
                        <span>Ingresos</span>
                    </a>
                </li>
            </ul>
            <ul class="submenu">
                <li class="@yield('menuconfig')">
                    <a href="#">
                        <i class='bx bxs-cog'></i>
                        <span>Configuraciones</span>
                    </a>
                </li>
                <li>
                    <a href="#" id="logout" class="logout">
                        <i class='bx bxs-log-out'></i>
                        <span>Salir</span>
                    </a>
                </li>
            </ul>
        </nav>
        <section class="contenido">
            <nav>
                <i class='bx bx-menu'></i>
            </nav>
            @yield('contenido')
        </section>
    </div>ç
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.js"></script>
    @yield('scripts')
    <script src="{{ asset('js/menu.js') }}"></script>
    <script src="{{ asset('js/logout.js') }}"></script>
</body>
</html>