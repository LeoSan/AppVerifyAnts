//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import ActoContext from "./ActoContext";
import actoReducer from './actoReducer';

import {
    LISTAR_ACTO,
    LISTAR_ACTO_ERROR,
    ELIMINAR_ACTO_ERROR,
    ELIMINAR_ACTO_EXITO,
    MUTAR_ACTO_ERROR,
    MUTAR_ACTO_EXITO,
    LISTAR_ACTO_SEMANA, 
    LISTAR_ACTO_ERROR_SEMANA,
    CAMBIO_LOADING,
    CAMBIO_LOADING_OFF,
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import Alerta from '../../components/ui/Alerta';


const ActoState = ({ children }) => {

    //Declaración Variables o Instancias de clases 
    const alerta = new Alerta();

    // Crear state inicial
    const inicialState = {
        msgListActo: null,
        acto: null,
        actoSemana: null,
        msgMutaActo: null,
        msgDeleteActo: null,
        mutaActo: null,
        elimiActo: null,
        loadActo:false
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(actoReducer, inicialState);

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const listarActo = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = {
                autor: datos.nickID,
                tipo: "1-M"
            }

            //console.log("Desde cliente ->", data);

            const respuesta = await clienteAxios.post('/api/acto/get-acto', data)
                .then((response) => {

                    if (response.data.success == true) {
                        dispatch({
                            type: LISTAR_ACTO, //Es la accion a ejecutar
                            payload: response.data.acto  //Son los datos que modifica el state 
                        });

                    } else {

                        dispatch({
                            type: LISTAR_ACTO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                    }
                }); //Fin de la async 
        } catch (error) {
            dispatch({
                type: LISTAR_ACTO_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });
        }

    }//fin del metodo 

    const listarActoSemana = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = {
                autor: datos.nickID,
                semana: datos.semana,
                categoria:datos.categoria,
                tipo: datos.tipo
            }


            const respuesta = await clienteAxios.post('/api/acto/get-acto-check-semanal', data)
                .then((response) => {

                    if (response.data.success == true) {
                        dispatch({
                            type: LISTAR_ACTO_SEMANA, //Es la accion a ejecutar
                            payload: response.data.ObjActo  //Son los datos que modifica el state 
                        });

                    } else {

                        dispatch({
                            type: LISTAR_ACTO_ERROR_SEMANA, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                    }
                }); //Fin de la async 
        } catch (error) {
            dispatch({
                type: LISTAR_ACTO_ERROR_SEMANA, //Es la accion a ejecutar
                payload: `Hubo un problema con el servidor ${error}`  //Son los datos que modifica el state 
            });
        }

    }//fin del metodo     

    //Metodo: Registra una Categoria
    const crearActo = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = {
                nomActo: datos.nomActo,
                desActo: datos.desActo,
                categoria: datos.categoria,
                autor: datos.autor,
            }

            const respuesta = await clienteAxios.post('/api/acto/create-acto', data)
                .then((response) => {

                    console.log(response.data);

                    if (response.data.success == true) {
                        dispatch({
                            type: MUTAR_ACTO_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                        
                         alerta.deploySucces();

                    } else {

                        dispatch({
                            type: MUTAR_ACTO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                        alerta.deployFault();
                    }
                });

        } catch (error) {
            dispatch({
                type: MUTAR_ACTO_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });
            alerta.deployFault();
        }

    }//fin del metodo 

    //Metodo: Permite eliminar el registro de una SubCategoria
    const deleteActo = async (id, nombre)=>{
    
        try {

            const token = localStorage.getItem('token');
            
            if (token){
                //funcion para enviar el token por header 
                tokenAuth(token);
            }
            const data = { 
                id:id, 
                nomActo:nombre
            }

            const respuesta = await clienteAxios.post('/api/acto/del-acto', data)
                .then((response) => {

                    if( response.data.success == true ){
                        dispatch({
                            type: ELIMINAR_ACTO_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                        alerta.deploySucces();
                    }else{

                        dispatch({
                            type: ELIMINAR_ACTO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });   
                        alerta.deployFault();
                    }
            });   

         
        } catch (error) {
            dispatch({
                type: ELIMINAR_ACTO_ERROR, //Es la accion a ejecutar
                payload: `Hubo un problema con el servidor ${error}`  //Son los datos que modifica el state 
            }); 

            alerta.deployFault();
        }

    }//fin del metodo 

    //Metodo: Permite eliminar el registro de una SubCategoria
    const editActo = async (datos)=>{
    
        try {

            const token = localStorage.getItem('token');
            
            if (token){
                //funcion para enviar el token por header 
                tokenAuth(token);
            }
            const data = { 
                id:datos.id, 
                nomActo:datos.nomActo,
                desActo:datos.desActo,
                categoria:datos.categoria
            }

            const respuesta = await clienteAxios.post('/api/acto/edit-acto', data)
                .then((response) => {

                    if( response.data.success == true ){
                        dispatch({
                            type: MUTAR_ACTO_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                        alerta.deploySucces();
                    }else{

                        dispatch({
                            type: MUTAR_ACTO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });   
                        alerta.deployFault();
                    }
            });   

         
        } catch (error) {
            dispatch({
                type: MUTAR_ACTO_ERROR, //Es la accion a ejecutar
                payload: `Hubo un problema con el servidor ${error}`  //Son los datos que modifica el state 
            }); 

            alerta.deployFault();
        }

    }//fin del metodo 

    //Metodo: Registra una Categoria
    const crearActoRegistroSemanal = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            const respuesta = await clienteAxios.post('/api/acto/create-acto-registro', datos)
                .then((response) => {

                    if (response.data.success == true) {
                        dispatch({
                            type: MUTAR_ACTO_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                        
                         alerta.deploySucces();

                    } else {

                        dispatch({
                            type: MUTAR_ACTO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                        alerta.deployFault();
                    }
                });

        } catch (error) {
            dispatch({
                type: MUTAR_ACTO_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servido666r"  //Son los datos que modifica el state 
            });
            alerta.deployFault();
        }

    }//fin del metodo 

    //Metodo: Permite cargar el load 
    const cambioLoad = () => {
        dispatch({
            type: CAMBIO_LOADING, //Es la accion a ejecutar
            payload: true  //Son los datos que modifica el state 
        });

    }//fin del metodo        //Metodo: Permite cargar el load 
    const cambioLoadOFF = () => {
        dispatch({
            type: CAMBIO_LOADING_OFF, //Es la accion a ejecutar
            payload: true  //Son los datos que modifica el state 
        });

    }//fin del metodo     


    return (
        <ActoContext.Provider
            value={{
                msgListActo: state.msgListActo,
                acto: state.acto,
                actoSemana:  state.actoSemana,
                msgMutaActo: state.msgMutaActo,
                msgDeleteActo: state.msgDeleteActo,
                mutaActo:  state.mutaActo,
                elimiActo: state.elimiActo,
                loadActo: state.loadActo,
                loadClass: state.loadClass,
                listarActo,
                crearActo,
                deleteActo,
                editActo,
                crearActoRegistroSemanal,
                listarActoSemana,
                cambioLoad,
                cambioLoadOFF
            }}
        >
            {children}
        </ActoContext.Provider>
    )
}

export default ActoState;