<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body class="container-login">
    <form class="login">
        @csrf
        <h3>Iniciar Sesion</h3>
        <input id="Usuario" name="Usuario" type="text" placeholder="Usuario">
        <input id="Contraseña" name="Contraseña" type="password" placeholder="Contraseña">
        <input id="Login" type="submit" value="Login">
        <p>¿Has olvidado tu contraseña?</p>
    </form>
</body>
</html>