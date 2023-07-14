<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>
<body>
    <div class="container-login">
        <form>
            @csrf
            <h3>Iniciar Sesion</h3>
            <input id="Usuario" name="Usuario" type="text" placeholder="Usuario">
            <input id="Contraseña" name="Contraseña" type="password" placeholder="Contraseña">
            <input id="Login" type="submit" value="Login">
        </form>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.js"></script>
    <script src="js/login.js"></script>
</body>
</html>