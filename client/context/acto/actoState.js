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
    LISTA_MESES,
    LISTA_SEMANA,
    CONSULTA_DATA_BARRA
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
        loadActo: false,
        ListMeses: null,
        Semana:null,
        estadistica:null
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
                categoria: datos.categoria,
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
    const deleteActo = async (id, nombre) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }
            const data = {
                id: id,
                nomActo: nombre
            }

            const respuesta = await clienteAxios.post('/api/acto/del-acto', data)
                .then((response) => {

                    if (response.data.success == true) {
                        dispatch({
                            type: ELIMINAR_ACTO_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                        alerta.deploySucces();
                    } else {

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
    const editActo = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }
            const data = {
                id: datos.id,
                nomActo: datos.nomActo,
                desActo: datos.desActo,
                categoria: datos.categoria
            }

            const respuesta = await clienteAxios.post('/api/acto/edit-acto', data)
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
                payload: `Hubo un problema con el servidor ${error}`   //Son los datos que modifica el state 
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


    //**************************************************************** */
    //Metodos Estadisticos
    const listMeses = () => {
        dispatch({
            type: LISTA_MESES, //Es la accion a ejecutar
            payload: [
                  { id: 1, mes: "Enero" }
                , { id: 2, mes: "Febrero"}
                , { id: 3, mes: "Marzo" }
                , { id: 4, mes: "Abril" }
                , { id: 5, mes: "Mayo" }
                , { id: 6, mes: "Junio" }
                , { id: 7, mes: "Julio" }
                , { id: 8, mes: "Agosto" }
                , { id: 9, mes: "Septiembre" }
                , { id: 10, mes: "Octubre" }
                , { id: 11, mes: "Noviembre" }
                , { id: 12, mes: "Diciembre" }
            ]
        });
    }//fin del metodo 

    //Metodos Estadisticos
    const listSemana = () => {
        dispatch({
            type: LISTA_SEMANA, //Es la accion a ejecutar
            payload: [
                  { id: 1, semana: "Semana #1" }
                , { id: 2, semana: "Semana #2"}
                , { id: 3, semana: "Semana #3" }
                , { id: 4, semana: "Semana #4" }
                , { id: 5, semana: "Semana #5" }
                , { id: 6, semana: "Semana #6" }
                , { id: 7, semana: "Semana #7" }
                , { id: 8, semana: "Semana #8" }
                , { id: 9, semana: "Semana #9" }
                , { id: 10, semana: "Semana #10" }
                , { id: 11, semana: "Semana #11" }
                , { id: 12, semana: "Semana #12" }
                , { id: 13, semana: "Semana #13" }
                , { id: 14, semana: "Semana #14" }
                , { id: 15, semana: "Semana #15" }
                , { id: 16, semana: "Semana #16" }
                , { id: 17, semana: "Semana #17" }
                , { id: 18, semana: "Semana #18" }
                , { id: 19, semana: "Semana #19" }
                , { id: 20, semana: "Semana #20" }
                , { id: 21, semana: "Semana #21" }
                , { id: 22, semana: "Semana #22" }
                , { id: 23, semana: "Semana #23" }
                , { id: 24, semana: "Semana #24" }
                , { id: 25, semana: "Semana #25" }
                , { id: 26, semana: "Semana #26" }
                , { id: 27, semana: "Semana #27" }
                , { id: 28, semana: "Semana #28" }
                , { id: 29, semana: "Semana #29" }
                , { id: 30, semana: "Semana #30" }
                , { id: 31, semana: "Semana #31" }
                , { id: 32, semana: "Semana #32" }
                , { id: 33, semana: "Semana #33" }
                , { id: 34, semana: "Semana #34" }
                , { id: 35, semana: "Semana #35" }
                , { id: 36, semana: "Semana #36" }
                , { id: 37, semana: "Semana #37" }
                , { id: 38, semana: "Semana #38" }
                , { id: 39, semana: "Semana #39" }
                , { id: 40, semana: "Semana #40" }
                , { id: 41, semana: "Semana #41" }
                , { id: 42, semana: "Semana #42" }
                , { id: 43, semana: "Semana #43" }
                , { id: 44, semana: "Semana #44" }
                , { id: 45, semana: "Semana #45" }
                , { id: 46, semana: "Semana #46" }
                , { id: 47, semana: "Semana #47" }
                , { id: 48, semana: "Semana #48" }
                , { id: 49, semana: "Semana #49" }
                , { id: 50, semana: "Semana #50" }
                , { id: 51, semana: "Semana #51" }
                , { id: 52, semana: "Semana #52" }
                , { id: 53, semana: "Semana #53" }
                , { id: 54, semana: "Semana #54" }
            ]
        });
    }//fin del metodo     


    const filtroDatoBarra = async (datos)=>{

        try {

            const token = localStorage.getItem('token');
            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            //console.log("entro al state", datos);
            const respuesta = await clienteAxios.post('/api/acto/get-act-statistics', datos)
                .then((response) => {

                    if (response.data.success == true) {
                        dispatch({
                            type: CONSULTA_DATA_BARRA, //Es la accion a ejecutar
                            payload: response.data  //Son los datos que modifica el state 
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
                payload: `Hubo un problema con el servidor ${error}`   //Son los datos que modifica el state 
            });
        }

    }


    return (
        <ActoContext.Provider
            value={{
                msgListActo: state.msgListActo,
                acto: state.acto,
                actoSemana: state.actoSemana,
                msgMutaActo: state.msgMutaActo,
                msgDeleteActo: state.msgDeleteActo,
                mutaActo: state.mutaActo,
                elimiActo: state.elimiActo,
                loadActo: state.loadActo,
                loadClass: state.loadClass,
                Meses: state.Meses,
                Semana: state.Semana,
                estadistica: state.estadistica,
                listarActo,
                crearActo,
                deleteActo,
                editActo,
                crearActoRegistroSemanal,
                listarActoSemana,
                cambioLoad,
                cambioLoadOFF,
                listMeses,
                listSemana,
                filtroDatoBarra

            }}
        >
            {children}
        </ActoContext.Provider>
    )
}

export default ActoState;