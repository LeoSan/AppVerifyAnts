//Librerias 
const { reponse } = require('express')
const moment = require('moment');
//Modelos 
const Acto = require('../models/Acto');
const Categoria = require('../models/Categoria');
const Actoregistro = require('../models/Actoregistro');
//Controladores 
const logsCotroller = require('./logsController');

//importamos helper 
const {  strLetterUper } = require('../middleware/helpers');


//Crear  Acto 
exports.newActo = async (req, res = reponse) => {
    const { nomActo } = req.body;
    try {
        //Vaidación 
        let acto = await Acto.findOne({ nomActo });
        if (acto) return res.status(200).json({ msg: `La actividad No la puedes repetir, ${nomActo}`, success: false });
        //Creamos Acto si no esta duplicado 
        acto = new Acto(req.body);
        await acto.save();
        res.status(200).json({ msg: `Tu Actividad con nombre ${nomActo},  fue creada Exitosamente!!`, success: true });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto  
exports.getActo = async (req, res = reponse) => {
    //Extraer proyecto 
    try {
        //Distroccion 
        const { nomActo, autor, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if (tipo === "1-M") {
            //Obtener 1-M
            const acto = await Acto.find({ autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).sort({ categoria: -1 });
            res.status(200).json({ acto, success: true });
        } else {
            //Obtener 1.1
            const acto = await Acto.find({ nomActo }).sort({ autor: -1 });
            res.status(200).json({ acto, success: true });
        }
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}


//Obtener Acto Check Semanal  
exports.getActoCheckSemanal = async (req, res = reponse) => {
    //Extraer proyecto 

    /*  //Campos que saque, para  ver si mejora la carga tarda mucho  
        activo: filas.activo,
        registro: filas.registro,
        autor: filas.autor,
       */

    try {
        //Distroccion 
        const { autor, tipo, semana, categoria } = req.body; //->Asi se usa cuando es un objeto 

        //Declaro Variables 
        let acto = null;
        let ObjActo = {}
        let index = 0;

        //Condiciono Consulta 
        if (tipo === "1-M") {
            //Obtener 1-M Por autor
             acto = await Acto.find({ autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).sort({ categoria: -1 });
        }  
        if (tipo === "1-MC") {
            //Obtener 1-MC Por autor y categoria
             acto = await Acto.find({ autor, categoria }).populate({ path: 'categoria', model: 'Categoria' }).sort({ categoria: -1 });
        }  
           
        //Itero La consulta para     
            //Nota:Recuerda Leonard que cada asyn await son promesas y cuando usas 
            //foreach estas no las captura hay que usarlo de esta manera para poder consultar await iterativos con el (for of ) 
            
            for (const filas of acto) {

                ObjActo[index] = {
                    _id: filas._id,
                    nomActo: filas.nomActo,
                    categoria: filas.categoria.nomCate,
                    categoriaid: filas.categoria._id,
                    checkVals: {
                        'lunes': await getActoSemanaDia(autor, filas._id, 'Lunes', semana)
                        , 'martes': await getActoSemanaDia(autor, filas._id, 'martes', semana)
                        , 'miercoles': await getActoSemanaDia(autor, filas._id, 'miercoles', semana)
                        , 'jueves': await getActoSemanaDia(autor, filas._id, 'jueves', semana)
                        , 'viernes': await getActoSemanaDia(autor, filas._id, 'viernes', semana)
                        , 'sabado': await getActoSemanaDia(autor, filas._id, 'sabado', semana)
                    }
                }

                index += 1;
            }//fin del for 
            
            //Envio respuesta 
            res.status(200).json({ ObjActo, success: true });
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! ${error}`, success: false });
    }
}

//Eliminar Acto
exports.deleteActo = async (req, res = reponse) => {
    //Extraer informacion del proyecto 
    try {
        //Extraer proyecto y comprobar si existe
        const { id, nomActo } = req.body;// Asi es cuando se pasa un objeto  es decir un json 
        //console.log("body", req.body);
        //const {acto} = req.query;// Asi es cuando se pasa parametros 

        //Si la tarea existe o no
        let accionExiste = await Acto.findById(id);

        if (!accionExiste) return res.status(200).json({ msg: `Tu acto con nombre ${nomActo}, No existe en la base de datos.`, success: false });

        //Eliminar Acto 
        await Acto.findByIdAndRemove({ _id: id })
        res.status(200).json({ msg: `Tu acción con nombre ${nomActo}, fue eliminado.`, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Udadate Acto
exports.updateActo = async (req, res = reponse) => {

    //Extraer informacion para validacion 
    try {
        //Distroccion de Json que se envia 
        const { id, nomActo, desActo, categoria } = req.body;

        //Valido Acto 
        let accionActo = await Acto.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 

        if (!accionActo) return res.status(200).json({ msg: `Tu acto con nombre ${nomActo}, No existe en la base de datos.`, success: false });

        //crear un objeto con la nueva informaciòn 
        const nuevoActo = {}
        nuevoActo.nomActo = nomActo;
        nuevoActo.desActo = desActo;
        nuevoActo.categoria = categoria;

        let nomOld = accionActo.nomActo;

        //Guadar la Accion Editada 
        accionActo = await Acto.findByIdAndUpdate({ _id: id }, nuevoActo, { new: true });
        res.status(200).json({ msg: `Tu acto con nombre ${nomOld}, fue editado.`, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto fechas Inicio y fin  
exports.getActoBetweenFecha = async (req, res = reponse) => {

    try {
        //Distroccion 
        const { fechaInicio, fechaFin, autor, categoria, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        let start = moment().format(fechaInicio);
        let end = moment().format(fechaFin);

        let existeVAl = await Accion.findOne({ autor });

        if (!existeVAl) return res.status(200).json({ msg: `No Existe algun tipo de Acto para este usuario.`, success: false });

        //Consulta entre fechas 
        //Consulta solo por categoria 
        if (tipo === "categoria") {
            const acto = await Acto.find({ "registro": { "$gte": start, "$lt": end }, 'activo': activo, 'autor': autor, 'categoria': categoria }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).exec();
            res.status(200).json({ acto, success: true });
        }
        //Consulta solo por Usuario
        if (tipo === "usuario") {
            const acto = await Acto.find({ "registro": { "$gte": start, "$lt": end }, 'activo': activo, 'autor': autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).exec();
            res.status(200).json({ acto, success: true });
        }

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto fechas Inicio y fin  
exports.actoCheckSemana = async (req, res = reponse) => {

    try {
        //Distroccion 
        const { autor, acto, duracion, nota, dia, semana, checked } = req.body; //->Asi se usa cuando es un objeto 

        try {

            if (checked === false) {

                let objActoregistro = await Actoregistro.find({ 'autor': autor, 'acto': acto, "dia": dia, "semana": semana });
                if (objActoregistro) {
                    await Actoregistro.findByIdAndRemove({ _id: objActoregistro[0].id });//Recuerda que inplementamos un metodo en el modelo 
                    res.status(200).json({ msg: `Tu acto con fue removido de día ${dia} semana ${semana}.`, success: true });
                }

            } else {
                actoregistro = new Actoregistro(req.body);
                await actoregistro.save();
                res.status(200).json({ msg: `Tu Actividad con nota (${nota}), fue creada Exitosamente!!`, success: true });
            }


        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
        }

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto por semanas 
exports.getActoSemana = async (req, res = reponse) => {

    try {
        //Distroccion 
        const { autor, semana } = req.body; //->Asi se usa cuando es un objeto 

        let objActoregistro = await Actoregistro.find({ 'autor': autor, 'semana': semana });

        if (!objActoregistro) return res.status(200).json({ msg: `No Existe algun tipo de Acto para este usuario.`, success: false });

        //Consulta 
        res.status(200).json({ objActoregistro, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}


//Obtener Acto por semanas 
const getActoSemanaDia = async (autor, acto, dia, semana) => {

    try {
        //Nota debo filtrar por año 
        let objActoregistro = await Actoregistro.find({ 'autor': autor, acto: acto, 'dia': dia, 'semana': semana, 'dia': dia, 'semana': semana });
        if (objActoregistro.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en el bucle for ActoSemana.js Ln->246 !! -> ${error} `);
        return false;
    }
}


//Obtener Acto - Estadistico 
exports.getActoEstadisticos = async (req, res = reponse) => {

    try {
        const {tipo} = req.body;
        let datoBarra = null; 
        let prueba = null; 
        let datoPie = null; 
        let datoLinealAnio = null; 
        //Datos para Estadisticos 
            datoBarra = await obtenerDatosBarras( req );
            datoLinealAnio = await obtenerDatosLinealAnios( req );
            datoLinealMes = await obtenerDatosLinealMes( req );
            datoPie   = datoBarra;  
        
        res.status(200).json({ datoBarra, datoPie, datoLinealAnio, datoLinealMes, success: true });
        //res.status(200).json({ datoLinealAnio, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(401).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Metodo independientes: Estadisticos 

const obtenerDatosBarras = async(req)=>{
    
    let objActoregistro = null; 
    const query = filtrosQuery(req);
    const {nickID} = req.body;
   
    //Consulta valor del  Modelo 
    objActoregistro = await Actoregistro.find(query).populate({ path: 'acto', model: 'Acto', select: 'nomActo categoria' });
    
    //Consulta el modelo Categoria
    let listCategoria = await Categoria.find({ autor:nickID, actividad:'60ae92dc3cb1ca2e14baeb8b' }); 

    //Realizo Calculo 
    let sum = 0; 
    let dataBarra = [ ["Categoria", "Tiempo(min)", { role: "style" }] ];
    //Itero por categoria para validar 
    for (const filas of listCategoria) {

        objActoregistro.forEach(element => {
            //console.log(element.categoria +" ====  "+ filas._id);
            if ( element.categoria.toString() == filas._id.toString() ){
                sum = sum  +  element.duracion; 
            }
        });
        dataBarra.push( [ strLetterUper(filas.nomCate), sum, `color: ${filas.color}`] );
    }//Fin del for de Categorias 

    /*
//Esto era mi intento de hacerlo con groupby pero me falta nivel 
    let valGroup = { 
     _id:{categoria:"$categoria"},
     duracion: {$sum:'$duracion'}
 } 

    objActoregistro = await Actoregistro.aggregate([
                                                     { $match: query }
                                                     { $group: valGroup }
                                                    ]);

*/
    return dataBarra; 
}

const obtenerDatosLinealAnios = async(req)=>{

    let objActoregistro = null; 
    const {nickID} = req.body;
    let arrayHead=["Años"];
    let dataLineal=[];
    let listAnio=[2020, 2021, 2022, 2023];

   
    //Consulta valor del  Modelo 
    objActoregistro = await Actoregistro.find({autor:nickID}).populate({ path: 'acto', model: 'Acto', select: 'nomActo categoria' });
    
    //Consulta el modelo Categoria
    let listCategoria = await Categoria.find({ autor:nickID, actividad:'60ae92dc3cb1ca2e14baeb8b' });
   
    //Genero mi encabezado de la grafica Lineal ["Años", "Categoria 1","Categoria 2","Categoria 3"]
    for (const filas of listCategoria) {
        arrayHead.push( filas.nomCate ); 
    }

    // Inicio la estructura para la grafica Linea [0, Sum1, sum2, sum3] Por año 
            //Inicio suma 
            dataLineal.push(arrayHead); //Genero el encabezado de la grafica 

            for (var i = 0; i<listAnio.length; i++) { //Ciclo De años 

                arraySumTotalAnio = new Array();//Esta es la clave necesitaba volver instanciar el arreglo por cada ciclo anual 

                for (const filas of listCategoria) {//Ciclo de Categoria 
                    let sum = 0;

                    objActoregistro.forEach(element => {//Ciclo de la data para filtrar Categoria y Año por cada ciclo 
                    
                        var fechaRegistro = new Date( element.registro);
                        //'mes': ((fechaRegistro.getMonth() + 1) < 10 ? '0' : '') + (fechaRegistro.getMonth() + 1),
                        if ( element.categoria.toString() == filas._id.toString()  && fechaRegistro.getFullYear() == listAnio[i] ){
                            sum = sum + element.duracion;    
                        }
    
                    });//Fin del for de datos. 

                    //Necesito que tenga un 0 como valor inicial es requisito de la grafica 
                    if (arraySumTotalAnio.length == 0){
                        arraySumTotalAnio.push(0); 
                    }
                    //al final de la suma obtengo categoria por año y pusheo en el arreglo 
                    arraySumTotalAnio.push(sum); 
                
               }//fin del for de categoria

               dataLineal.push(arraySumTotalAnio);

            }//fin del for de anio 

    return dataLineal; 
}

const obtenerDatosLinealMes = async(req)=>{

    let objActoregistro = null; 
    const {nickID, anioBarra } = req.body;
    let arrayHead=["Mes"];
    let dataLineal=[];
    let listMes=["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

   
    //Consulta valor del  Modelo 
    objActoregistro = await Actoregistro.find({autor:nickID}).populate({ path: 'acto', model: 'Acto', select: 'nomActo categoria' });
    
    //Consulta el modelo Categoria
    let listCategoria = await Categoria.find({ autor:nickID, actividad:'60ae92dc3cb1ca2e14baeb8b' });
   
    //Genero mi encabezado de la grafica Lineal ["Años", "Categoria 1","Categoria 2","Categoria 3"]
    for (const filas of listCategoria) {
        arrayHead.push( filas.nomCate ); 
    }

    // Inicio la estructura para la grafica Linea [0, Sum1, sum2, sum3] Por año 
            //Inicio suma 
            dataLineal.push(arrayHead); //Genero el encabezado de la grafica 
            dataLineal.push([0,0,0,0,0,0,0]);

            for (var i = 0; i<listMes.length; i++) { //Ciclo De años 

                arraySumTotalMes = new Array();//Esta es la clave necesitaba volver instanciar el arreglo por cada ciclo anual 

                for (const filas of listCategoria) {//Ciclo de Categoria 
                    let sum = 0;

                    objActoregistro.forEach(element => {//Ciclo de la data para filtrar Categoria y Año por cada ciclo 
                    
                        var fechaRegistro = new Date( element.registro );
                        var mes = ((fechaRegistro.getMonth() + 1) < 10 ? '0' : '') + (fechaRegistro.getMonth() + 1);
                        if ( element.categoria.toString() == filas._id.toString()  && fechaRegistro.getFullYear() == anioBarra && mes == listMes[i] ){
                            sum = sum + element.duracion;    
                        }
    
                    });//Fin del for de datos. 

                    //Necesito que tenga un 0 como valor inicial es requisito de la grafica 
                    if (arraySumTotalMes.length == 0){
                        arraySumTotalMes.push( parseInt(listMes[i]) ); 
                    }
                    //al final de la suma obtengo categoria por año y pusheo en el arreglo 
                    arraySumTotalMes.push(sum); 
                
               }//fin del for de categoria

               dataLineal.push(arraySumTotalMes);

            }//fin del for de anio 

    return dataLineal; 
}

//helpers Filtros 

const filtrosQuery = (req)=>{
    

    const {nickID, anioBarra, mesBarra, semBarra, cateBarra} = req.body;
    let query = {
        'autor': nickID,
        "activo": 1,
    };

    //Filtro Año
    if (anioBarra > 0 ){
        query = filtroCategoria(cateBarra);
        query = {
            ...query, 
            "$expr": {
                "$and": [
                  { $eq: [{ $year: "$registro" }, { $year: new Date(anioBarra+'-01-01') }]},
               ]
              }        
          }        
    }    
    //Filtro -> Mes Obligatorio(Año)
    if (mesBarra > 0){
        query = filtroCategoria(cateBarra);
        query = {
            ...query, 
            "$expr": {
                "$and": [
                  { $eq: [{ $year: "$registro" }, { $year: new Date(anioBarra+'-01-01') }]},
                  { $eq: [{ $month: "$registro" }, { $month: new Date(anioBarra + '-'+ mesBarra + '-01') }]},
               ]
              }        
          } 
    }    
    
    //Filtro Semana  -> Obligatorio(Año)
    if (semBarra > 0){
        query = filtroCategoria(cateBarra);
        query = {
            ...query, 
            "semana":semBarra,
            "$expr": {
                "$and": [
                  { $eq: [{ $year: "$registro" }, { $year: new Date(anioBarra+'-01-01') }]},
               ]
              }        
          }         
    }    
    
    return query; 
}

const filtroCategoria = (cateBarra)=>{
    
    
    let query = '';
    if ( cateBarra != null && cateBarra > 0   ){
       // console.log("cateBarra", cateBarra);
        query = {
            ...query, 
            'categoria':cateBarra
          }
    } 

    return query; 
}




