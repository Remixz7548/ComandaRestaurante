const BtnLogout = document.getElementById("logout");

BtnLogout.addEventListener("click", function(event) {
    event.preventDefault();

                swal({
                    title: "Cierre de Sesión Exitoso!",
                    text: "¡Has cerrado sesion!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(function() {
                    location.href = '/logout';
                });
            
});
