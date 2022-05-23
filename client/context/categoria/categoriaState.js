//Importo librerias React 
import React, { useReducer } from 'react';
import { useRouter } from 'next/router';

//Importo context y reducer 
import CategoriaContext from "./categoriaContext";
import categoriaReducer  from './categoriaReducer'; 

//Importo las acciones definidas en el type
import {
    LISTAR_CATEGORIA,
    LISTAR_CATEGORIA_ERROR, 
    CREAR_CATEGORIA_ERROR,
    CREAR_CATEGORIA_EXITO, 
    ELIMINAR_CATEGORIA_ERROR,
    ELIMINAR_CATEGORIA_EXITO,
    EDITAR_CATEGORIA_ERROR,
    EDITAR_CATEGORIA_EXITO,
} from '../../types';



//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import Alerta from '../../components/ui/Alerta';

const CategoriaState = ({children}) => {

    //Declaración  de variables o instancias 
    const alerta  = new Alerta();

    // Crear state inicial
    const inicialState = {
        mensajeList:null, 
        msgCrearCat:null,  
        msgDeleteCat:null, 
        categoria:null,
        categoriaActos:null,
        categoriaGastos:null,
        categoriaPatrimonio:null,
        editaCat:false,
        crearCat:false,
        elimiCat:false
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(categoriaReducer, inicialState); 

    //Declaro Hook    
        //Redireccionar   
        const router = useRouter();

    //Funciones Generales 
    //Metodo:  Listar Categorias 
    const listarCategoria = async (datos)=>{
    
        try {

            const token = localStorage.getItem('token');
            
            if (token){
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = { 
                nomCate:datos.nickEmail, 
                autor:datos.nickID,
                activo:1,
                tipo:"1-M"
            }

            const respuesta = await clienteAxios.post('/api/categoria/get-cat', data)
                .then((response) => {

                   // console.log(response.data.categoria);

                    if( response.data.success == true ){
                        dispatch({
                            type: LISTAR_CATEGORIA, //Es la accion a ejecutar
                            payload: response.data.categoria  //Son los datos que modifica el state 
                        }); 

                    }else{

                        dispatch({
                            type: LISTAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });                         

                    }
            });             
            
        } catch (error) {
            dispatch({
                type: LISTAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }

    //Metodo: Registra una Categoria
    const crearCategoria = async (datos)=>{
    
        try {

            const token = localStorage.getItem('token');
            
            if (token){
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = { 
                nomCate:datos.nomCate, 
                desCate:datos.desCate,
                autor:datos.autor,
                actividad:datos.actividad
            }

            const respuesta = await clienteAxios.post('/api/categoria/', data)
                .then((response) => {

                    //console.log(response.data.categoria);

                    if( response.data.success == true ){
                        dispatch({
                            type: CREAR_CATEGORIA_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                       setTimeout( () => {
                           // router.push('/categoria');
                       }, 6000);//wait 6 seconds                        
                        

                    }else{

                        dispatch({
                            type: CREAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });                         

                    }


            });             
            
        } catch (error) {
            dispatch({
                type: CREAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }    

    //Metodo:  Permite eliminar el registro de una Categoria
    const deleteCategoria = async (id, nombre)=>{
    
        try {

            const token = localStorage.getItem('token');
            
            if (token){
                //funcion para enviar el token por header 
                tokenAuth(token);
            }
            
            const data = { 
                id:id, 
                nomCate:nombre
            }

            const respuesta = await clienteAxios.post('/api/categoria/del-cat', data)
                .then((response) => {

                    if( response.data.success == true ){
                        dispatch({
                            type: ELIMINAR_CATEGORIA_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                        alerta.deploySucces();
                    }else{

                        dispatch({
                            type: ELIMINAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });   
                        alerta.deployFault();

                    }
            });             
         
        } catch (error) {
            dispatch({
                type: ELIMINAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                payload: `Hubo un problema con el servidor, ${error}`  //Son los datos que modifica el state 
            }); 

            alerta.deployFault();
        }
         
        

    }//fin del metodo     
    
    //Metodo:  Permite eliminar el registro de una Categoria
    const editCategoria = async (datos)=>{
    
        try {

            const token = localStorage.getItem('token');
            
            if (token){
                //funcion para enviar el token por header 
                tokenAuth(token);
            }
            
            const data = { 
                id:datos.id, 
                nomCate:datos.nomCate,
                desCate:datos.desCate,
                actividad:datos.actividad
            }

            const respuesta = await clienteAxios.post('/api/categoria/edit-cat', data)
                .then((response) => {

                    console.log(response)

                    if( response.data.success == true ){
                        dispatch({
                            type: EDITAR_CATEGORIA_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                        alerta.deploySucces();
                    }else{

                        dispatch({
                            type: EDITAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });   
                        alerta.deployFault();

                    }
            });             
         
        } catch (error) {
            dispatch({
                type: EDITAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                payload: `Hubo un problema con el servidor.`  //Son los datos que modifica el state 
            }); 

            alerta.deployFault();
        }
         
        

    }//fin del metodo     

    
    //Metodo:  

    return (
        <CategoriaContext.Provider
            value={{
                mensajeList:state.mensajeList,
                msgCrearCat:state.msgCrearCat,
                msgDeleteCat:state.msgDeleteCat,
                categoria:state.categoria,
                categoriaActos:state.categoriaActos,
                categoriaGastos:state.categoriaGastos,
                categoriaPatrimonio:state.categoriaPatrimonio,
                editaCat:state.editado,
                crearCat:state.crearCat,
                elimiCat:state.elimiCat,
                listarCategoria,
                crearCategoria,
                deleteCategoria,
                editCategoria

            }}
        >
            {children}
        </CategoriaContext.Provider>
    )
}

export default CategoriaState;