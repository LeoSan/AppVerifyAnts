//Libreria
const nodemailer = require('nodemailer');

//Controlador Logs
const logsCotroller = require('../controller/logsController'); 

exports.sendMailto = (mensaje, emailFrom, subject ) => {
    console.log("Enviando correo...->");
    //Creamos el objeto de transporte
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        //service: 'gmail',
        auth: {
            user: "b77b5c3fe6483b",
            pass: "8dc85c58c64eb4"
        }
    });

   //Creaos objeto del cuerpo del correo 
    const  mailOptions = {
        from: emailFrom,
        to: 'cuenca623@hotmail.com',
        subject: subject,
       // text: mensaje
        html: mensaje
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            logsCotroller.logsCorreos(error);
            //console.log(error);
        } else {
            logsCotroller.logsCorreos('Email Respuesta: ' + info.response,  'info');
            logsCotroller.logsCorreos('Email messageId: ' + info.messageId,  'info');
            //console.log('Email enviado: ' + info.response);
        }
    });
}
