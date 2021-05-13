//Libreria
const log4js = require("log4js");

exports.logsCorreos = ( mensaje ) => {
    
    log4js.configure({
        appenders: { sendMail: { type: "file", filename: "/logs/sendMail.log" } },
        categories: { default: { appenders: ["sendMail"], level: "debug" } }
      });
       
    const logger = log4js.getLogger("sendMail");
    logger.debug(mensaje);
}

exports.logsCRUD = ( mensaje ) => {
    
    log4js.configure({
        appenders: { sendMail: { type: "file", filename: "/logs/crud.log" } },
        categories: { default: { appenders: ["sendMail"], level: "debug" } }
      });
       
    const logger = log4js.getLogger("sendMail");
    logger.debug(mensaje);
}

/*logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");*/