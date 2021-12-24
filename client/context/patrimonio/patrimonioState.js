//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import PatrimonioContext from "./PatrimonioContext";
import patrimonioReducer from './patrimonioReducer';

//Importo las acciones definidas en el type
import {
    LISTAR_PATRIMONIO,
    MUTAR_PATRIMONIO_ERROR,
    MUTAR_PATRIMONIO_EXITO
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import Alerta from '../../components/ui/Alerta';

const PatrimonioState = ({ children }) => {

    //Declaración Variables o Instancias de clases 
    const alerta = new Alerta();

    // Crear state inicial
    const inicialState = {
        patrimonio: null,
        crearPatri: false,
        elimiPatri: false,
        msgCrear: null,
        msgDelet: null,
        msgList: null,
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(patrimonioReducer, inicialState);

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const crearPatrimonio = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            const respuesta = await clienteAxios.post('/api/patrimonio/create-patrimonio', datos)
                .then((response) => {

                   if (response.data.success == true) {
                        dispatch({
                            type: MUTAR_PATRIMONIO_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                    } else {

                        dispatch({
                            type: MUTAR_PATRIMONIO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                    }

                }).catch((response) => {
                        dispatch({
                            type: MUTAR_PATRIMONIO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });
                        
                });

        } catch (error) {
            dispatch({
                type: MUTAR_PATRIMONIO_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });
        }

    }    
    
    //Metodo:  Registra un usuario 
    const listarPatrimonio = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo

            const respuesta = await clienteAxios.post('/api/patrimonio/create-patrimonio', datos)
                .then((response) => {

                    console.log(response.data);


                /*    if (response.data.success == true) {
                        dispatch({
                            type: LISTAR_PATRIMONIO, //Es la accion a ejecutar
                            payload: response.data.recurrente  //Son los datos que modifica el state 
                        });

                    } else {

                        dispatch({
                            type: MUTAR_PATRIMONIO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                    }
                */            

                }).catch((response) => {
                  /*  dispatch({
                        type: MUTAR_PATRIMONIO_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    });
                    */
                });

        } catch (error) {
           /* dispatch({
                type: MUTAR_PATRIMONIO_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });*/
        }

    }
  

    //Metodo:  

    return (
        <PatrimonioContext.Provider
            value={{
                patrimonio: state.patrimonio,
                crearPatri: state.crearPatri,
                elimiPatri: state.elimiPatri,
                msgCrear: state.msgCrear,
                msgDelet: state.msgDelet,
                msgList: state.msgList,
                listarPatrimonio,
                crearPatrimonio
            }}
        >
            {children}
        </PatrimonioContext.Provider>
    )
}

export default PatrimonioState;