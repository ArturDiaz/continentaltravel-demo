<?php

    $receptor = "jdiaz@continentaltravel.com.pe";
    $usuario = $_POST["usuario"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $comentario = $_POST["comentario"];

    $contenido = "Nombre: " . $usuario . "\n email: " . $email . "\n Telefono: " . $telefono . "\n comentario: " . $comentario;
    mail($receptor, "Web Coorporativo", $contenido);

    echo "<h4>¡Gracias! En breve nos pondremos en contacto.</h4>";

?>