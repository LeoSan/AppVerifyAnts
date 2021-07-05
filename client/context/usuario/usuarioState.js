//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import UsuarioContext from "./usuarioContext";
import usuarioReducer  from './usuarioReducer'; 

//Importo las acciones definidas en el type
import {
    REGISTRO_USUARIO_EXITOSO,
    REGISTRO_USUARIO_ERROR,
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



const UsuarioState = ({children}) => {

    // Crear state inicial
    const inicialState = {
        mensaje:null, 
        registro:null
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(usuarioReducer, inicialState); 

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const registrarUsuario = async (datos)=>{
    
        console.log("Desde Registrar Usuario ", datos);
        try {

            const data = { 
                nomUsu:datos.nombre, 
                emailUsu:datos.email, 
                password:datos.password2,
                
            }


                const respuesta = await clienteAxios.post('/api/usuarios/', data)
                .then((response) => {


                    if( response.data.success == false ){
                        dispatch({
                            type: REGISTRO_USUARIO_EXITOSO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                    }else{

                        dispatch({
                            type: REGISTRO_USUARIO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });                         

                    }


            }).catch((response) => {
                    dispatch({
                        type: REGISTRO_USUARIO_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    }); 
            });             
            
        } catch (error) {
            dispatch({
                type: REGISTRO_USUARIO_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }
    //Metodo:  Inicia Sessión al usuario 
  
    //Metodo:  
    //Metodo:  

    return (
        <UsuarioContext.Provider
            value={{
                mensaje:state.mensaje,
                registro:state.registro,
                registrarUsuario,

            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioState;