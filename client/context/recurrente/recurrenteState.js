//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import RecurrenteContext from "./RecurrenteContext";
import recurrenteReducer from './recurrenteReducer';

//Importo las acciones definidas en el type
import {
    LISTAR_RECURRENTE,
    LISTAR_RECURRENTE_ERROR,
    CREAR_RECURRENTE_ERROR,
    CREAR_RECURRENTE_EXITO,
    ELIMINAR_RECURRENTE_ERROR,
    ELIMINAR_RECURRENTE_EXITO
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import Alerta from '../../components/ui/Alerta';


const RecurrenteState = ({ children }) => {

    //Declaración Variables o Instancias de clases 
    const alerta = new Alerta();

    // Crear state inicial
    const inicialState = {
        mensajeListRe: null,
        recurrente: null,
        msgCrearRecu: null,
        msgDeleteRec: null,
        editaRecu: false,
        crearRecu: false,
        elimiRecu: false
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(recurrenteReducer, inicialState);

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const listarRecurrente = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = {
                nomRecu: datos.nickEmail,
                autor: datos.nickID,
                activo: 1,
                tipo: "1-M"
            }

            const respuesta = await clienteAxios.post('/api/recurrente/get-recurrentes', data)
                .then((response) => {

                    console.log(response.data);

                    if (response.data.success == true) {
                        dispatch({
                            type: LISTAR_RECURRENTE, //Es la accion a ejecutar
                            payload: response.data.recurrente  //Son los datos que modifica el state 
                        });

                    } else {

                        dispatch({
                            type: LISTAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                    }


                }).catch((response) => {
                    dispatch({
                        type: LISTAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    });
                });

        } catch (error) {
            dispatch({
                type: LISTAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });
        }

    }

    //Metodo: Registra una Categoria
    const crearRecurrencia = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = {
                nomRecu: datos.nomRecu,
                desRecu: datos.desRecu,
            }

            const respuesta = await clienteAxios.post('/api/recurrente/create', data)
                .then((response) => {

                    console.log(response.data);

                    if (response.data.success == true) {
                        dispatch({
                            type: CREAR_RECURRENTE_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                        setTimeout(() => {
                            // router.push('/categoria');
                        }, 6000);//wait 6 seconds                        


                    } else {

                        dispatch({
                            type: CREAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                    }


                }).catch((response) => {
                    dispatch({
                        type: CREAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    });
                });

        } catch (error) {
            dispatch({
                type: CREAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });
        }

    }
    //Metodo: Permite eliminar el registro de una SubCategoria
    const deleteRecurrente = async (id, nombre) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }
            const data = {
                id: id,
                nomRecu: nombre
            }

            const respuesta = await clienteAxios.post('/api/recurrente/del-rec', data)
                .then((response) => {

                    if (response.data.success == true) {
                        dispatch({
                            type: ELIMINAR_RECURRENTE_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                        alerta.deploySucces();
                    } else {

                        dispatch({
                            type: ELIMINAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                        alerta.deployFault();
                    }
                });


        } catch (error) {
            dispatch({
                type: ELIMINAR_RECURRENTE_ERROR, //Es la accion a ejecutar
                payload: `Hubo un problema con el servidor ${error}`  //Son los datos que modifica el state 
            });

            alerta.deployFault();
        }

    }//fin del metodo 


    //Metodo:  

    return (
        <RecurrenteContext.Provider
            value={{
                mensajeListRe: state.mensajeListRe,
                recurrente: state.recurrente,
                msgCrearRecu: state.msgCrearRecu,
                msgDeleteRec: state.msgDeleteRec,
                editaRecu: state.editaRecu,
                crearRecu: state.crearRecu,
                elimiRecu: state.elimiRecu,
                listarRecurrente,
                crearRecurrencia,
                deleteRecurrente
            }}
        >
            {children}
        </RecurrenteContext.Provider>
    )
}

export default RecurrenteState;