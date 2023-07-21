<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Panel Administrador</title>
</head>
<body>
    <div class="container">
        <nav class="menu">
            <a class="titulo" href="">
                <i class='bx bx-restaurant' ></i>
                <span>COMANDADAS</span>
            </a>
            <ul class="submenu">
                <li class="active">
                    <a href="#">
                        <i class='bx bxs-dashboard'></i>
                        <span>Panel</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class='bx bxs-group' ></i>
                        <span>Empleados</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class='bx bxs-food-menu' ></i>
                        <span>Productos</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class='bx bxs-credit-card'></i>
                        <span>Pagos</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class='bx bxs-receipt'></i>
                        <span>Ordenes</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class='bx bxs-dollar-circle'></i>
                        <span>Ingresos</span>
                    </a>
                </li>
            </ul>
            <ul class="submenu">
                <li>
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
            <nav class="menu-con">
                <i class='bx bx-menu'></i>
            </nav>
        </section>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.js"></script>
    <script src="js/menu.js"></script>
    <script src="js/logout.js"></script>
</body>
</html>