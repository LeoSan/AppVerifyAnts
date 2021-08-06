//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import RecurrenteContext from "./RecurrenteContext";
import recurrenteReducer  from './recurrenteReducer'; 

//Importo las acciones definidas en el type
import {
    LISTAR_RECURRENTE,
    LISTAR_RECURRENTE_ERROR
} from '../../types';



//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



const RecurrenteState = ({children}) => {

    // Crear state inicial
    const inicialState = {
        mensajeListRe:null, 
        recurrente:null,
        editRec:null,
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(recurrenteReducer, inicialState); 

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const listarRecurrente = async (datos)=>{
    
        try {

            const token = localStorage.getItem('token');
            
            if (token){
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = { 
                nomRecu:datos.nickEmail, 
                autor:datos.nickID,
                activo:1,
                tipo:"1-M"
            }

            const respuesta = await clienteAxios.post('/api/recurrente/get-recurrentes', data)
                .then((response) => {

                    console.log(response.data);

                    if( response.data.success == true ){
                        dispatch({
                            type: LISTAR_RECURRENTE, //Es la accion a ejecutar
                            payload: response.data.recurrente  //Son los datos que modifica el state 
                        }); 

                    }else{

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
  
    
    //Metodo:  

    return (
        <RecurrenteContext.Provider
            value={{
                mensajeListRe:state.mensajeListRe,
                recurrente:state.recurrente,
                editRec:state.editRec,
                listarRecurrente,

            }}
        >
            {children}
        </RecurrenteContext.Provider>
    )
}

export default RecurrenteState;