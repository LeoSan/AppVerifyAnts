
const mailCambioClave = ( nombreUsu )=>{
   
    const Cuerpo = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body>
                        <p> Hola, <b> ${nombreUsu} </b>  </p>   <br>
                        <p> Cambiaste tu clave de manera exitosa y segura. </p> <br>
                        <p> No olvides que tu clave es lo mas valioso, si deseas volver a cambiarla no dudes de usar el sistema.</p> <br>
                        <p> Equipo AntVerify,  Recuerda este correo no debe ser contestado</p><br>
                    </body>
                    </html>`;

    return Cuerpo; 

}

const mailEnvioCorreoToken = ( nombreUsu, token )=>{
   
    const Cuerpo = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body>
                        <p> Hola, <b> ${nombreUsu} </b>  </p>   <br>
                        <p> Has solicitado el cambio de tu password. </p> <br>
                        <p> Si no es asi por favor valida el acceso de tu aplicación.</p> <br>
                        <p> Para cambiar la contraseña debes ingresar a este link y seguir los pasos <a href="http://localhost:3000/cambio/${token}"> Cambiar tu Clave</a>.  </p><br>
                        <p> Recuerda no divulgar tu clave y puedes solicitar este servicio cuantas veces quieras. </p><br>
                        <p> Equipo  AntVerify,  Recuerda este correo no debe ser contestado.</p><br>
                    </body>
                    </html>`;

    return Cuerpo; 

}

const mailRegistroUsuario = ( nombreUsu )=>{
   
    const Cuerpo = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body>
                        <p> Hola, <b> ${nombreUsu} </b>  </p>   <br>
                        <p> Gracias por usar nuestra app podras acceder desde este enlace, no olvides porteger tu contraseña <b> ${nombreUsu} </b>  </p>   <br>
                        <p> Enlace: <a href="http://localhost:3000/login"> Acceder a tu App </a>.   </p>   <br>
                        <p> Equipo AntVerify,  Recuerda este correo no debe ser contestado.</p><br>
                    </body>
                    </html>`;

    return Cuerpo; 

}


module.exports = {
    mailCambioClave,
    mailEnvioCorreoToken,
    mailRegistroUsuario
}