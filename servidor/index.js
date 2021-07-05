/*
   Archivo Principal de arranque. 
*/
//Importo librerias 
const express     = require('express');
const connectarDB = require('./config/db'); // Importamos nuestro conector de BD // Debes crear la conexion antes
const cors        = require('cors');

//Configuro variables de entornos
require('dotenv').config({ path :'config/variables.env'});

//Crear el servidor
const app = express();
 
console.log(`Iniciando nuestro servidor en node.js - express`);
 
// ejecutamos la función para conectar a la base de datos
 connectarDB(); // Debes crear la conexion antes
 
 //Habilitar Cors -> Linea Nueva se debe instalar cors 
 console.log(`Habilitamos CORS`);

/* const opcionesCors = {
     origin:'http://localhost:3000/'
 }
 app.use(  cors( opcionesCors ) ); 
*/
//Habilitar cors 
app.use(cors());


//Creamos el puerto para la app
 const port = process.env.DB_PORT || 5000;  // Debes instalar  y crear el env que son las variables de entorno
 
//Habilitar leer los valores de un body
app.use(express.json());
 
//Rutas de Accesos Para las APIS 
//Router  Acción
app.use('/api/accion',    require('./routes/accion'));

//Router Actividad  
app.use('/api/actividad', require('./routes/actividad'));

//Router Autenticación 
app.use('/api/auth',      require('./routes/auth'));

//Router Categoria  
app.use('/api/categoria', require('./routes/categoria'));

//Router Gasto
app.use('/api/gasto',     require('./routes/gasto'));

//Router Ingreso
app.use('/api/ingreso',   require('./routes/ingreso'));

//Router Patrimonio
app.use('/api/patrimonio', require('./routes/patrimonio'));

//Router Recurrente  
app.use('/api/recurrente', require('./routes/recurrente'));

//Router usuario 
app.use('/api/usuarios',   require('./routes/usuario')); 

//Router Cumplida 
app.use('/api/cumplida',   require('./routes/cumplida')); 


//Validando re-captcha Monta la interfaz  http://localhost:4000/
app.get('/', (_, res) => res.sendFile(__dirname + '/captcha.html'));

//Iniciamos nuestro  servidor
app.listen(port, '0.0.0.0', () => {
 
   console.log(`El servidor esta funcionando en el puerto -> ${port}`);
   
});
