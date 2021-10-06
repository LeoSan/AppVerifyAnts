/*
   Archivo Principal de arranque. 
*/

//Importo clase Server 
const Server = require('./models/Server');

//Instancio Objeto server
const server = new Server();

//Inicio con listen 
server.listen();