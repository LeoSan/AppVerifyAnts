//Librerias
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './config/variables.env'});  //LINEA IMPORTANTE

//Controlador 
const logsCotroller = require('../controller/logsController'); 


module.exports = (req, res, next) => {
    // Leer el token del header
    const token = req.header('x-auth-token');

      /* Nota: el token debe estar presente en el header*/

    //console.log(token)
    // Revisar ek no hay token
    if(!token){
        logsCotroller.logsCRUD(`No hay token, permiso no valido !!`);
        return res.status(401).json({msg: 'No hay token, permiso no valido'});
    }

    //Puedo definir opciones para la verificacion 
    const options = { algorithms: process.env.TOKEN_CODE, typ: process.env.TOKEN_TYP };

    // Validar el token
    try {
        const cifrado = jwt.verify( token,  process.env.SECRETA, options  );
        req.usuario = cifrado.usuario; // objeto usuario | payload
        next() // Vaya al siguiente middleware
    } catch (error) {
        logsCotroller.logsCRUD(`Resultado captcha !! -> ${ error } `);
        if (error === 'TokenExpiredError: jwt expired'){
            res.status(401).json({msg: 'Se vencio el tiempo de sesión', success:false});
        }
        
        res.status(401).json({msg: 'Token no válido', success:false});
    }
}