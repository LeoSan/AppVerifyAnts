//Libreria
const log4js = require("log4js");

const generarArchivo = ( ruta, tipo, archivo)=>{
  log4js.configure({
    appenders: { sendMail: { type: "file", filename: ruta } },
    categories: { default: { appenders: [archivo], level: tipo } }
  });
}

exports.logsCorreos = ( mensaje ) => {
  generarArchivo("config/sendMail.log", "debug", "sendMail");
    const logger = log4js.getLogger("sendMail");
    logger.debug(mensaje);
}

exports.logsCRUD = ( mensaje ) => {
    
    generarArchivo("config/crud.log", "debug", "crud");
    const logger = log4js.getLogger("crud");
    logger.debug(mensaje);
}



/*logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");*/