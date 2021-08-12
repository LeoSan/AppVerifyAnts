//Importo librerias 
const colors      = require('colors');
const express     = require('express');
const connectarDB = require('../config/db'); // Importamos nuestro conector de BD // Debes crear la conexion antes
const cors        = require('cors');
//Configuro variables de entornos
require('dotenv').config({ path :'config/variables.env'});

class Server{

    constructor(){
        console.log(`----- Iniciando nuestro servidor en node.js - express ----`);
		
		this.app = express();
        this.port  = process.env.DB_PORT;
        this.seguridad  = 'C:/laragon/www/project-AppVerifyAnts/servidor/public/';

        //midlewares
        this.midlewares();
        
        //rutas de aplicación
        this.routes();

		// ejecutamos la función para conectar a la base de datos
 		connectarDB(); // Debes crear la conexion antes

    }

    routes(){
		//Habilitar leer los valores de un body
		this.app.use(express.json());
		 
		//Rutas de Accesos Para las APIS 
		//Router  Acción
		this.app.use('/api/accion',    require('../routes/accion'));

		//Router Actividad  
		this.app.use('/api/actividad', require('../routes/actividad'));

		//Router Autenticación 
		this.app.use('/api/auth',      require('../routes/auth'));

		//Router Categoria  
		this.app.use('/api/categoria', require('../routes/categoria'));

		//Router Subcategoria  
		this.app.use('/api/subcategoria', require('../routes/subcategoria'));

		//Router Gasto
		this.app.use('/api/gasto',     require('../routes/gasto'));

		//Router Ingreso
		this.app.use('/api/ingreso',   require('../routes/ingreso'));

		//Router Patrimonio
		this.app.use('/api/patrimonio', require('../routes/patrimonio'));

		//Router Recurrente  
		this.app.use('/api/recurrente', require('../routes/recurrente'));

		//Router usuario 
		this.app.use('/api/usuarios',   require('../routes/usuario')); 

		//Router Cumplida 
		this.app.use('/api/cumplida',   require('../routes/cumplida')); 

		
		//Ejemplo de como consumir un archivo html -> Validando re-captcha Monta la interfaz  http://localhost:4000/
		this.app.get('/', (_, res) => res.sendFile(__dirname + '../captcha.html'));

		this.app.get('*', (req,  res)=>{
			console.log( __dirname );
			res.sendFile( this.seguridad );
		});	
        
    }

    listen(){

		//Iniciamos nuestro  servidor
		this.app.listen(this.port, '0.0.0.0', () => {
		 
		   console.log(`${'!!  Servidor Operando !!'.rainbow} ${ '<-|°.°|->  Puerto: '.green} -> ${this.port}`);
		   
		});		
		
    }

    midlewares(){
        //Directorio publico Aqui puedo establecer elementos de seguridad
        this.app.use( express.static('public') );

		//Habilitar Cors -> Linea Nueva se debe instalar cors 
 		console.log(`Habilitamos CORS`.red);
		//Habilitar cors 
		this.app.use(cors());

    }

}

module.exports = Server;