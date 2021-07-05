//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import AuthContext from "./AuthContext.js";
import authReducer  from './authReducer'; 

//Importo las acciones definidas en el type
import {
    CERRAR_SESION,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    LIMPIAR_REGISTRO
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



const AuthState = ({children}) => {

    // Crear state inicial
    const inicialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : null, 
        autenticado:null, 
        usuario:null, 
        mensaje:null, 
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(authReducer, inicialState); 

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const registrarUsuario = async (datos)=>{
    
        console.log("Desde Registrar Usuario ", datos);
        try {
            
        } catch (error) {
            console.log(error);
        }
    
    }
    //Metodo:  Inicia Sessión al usuario 
    const iniciarSesion = async (datos)=>{
    
        //console.log("Desde iniciar Session ", datos );
        try {
            
            const data = { 
                emailUsu:datos.email, 
                password:datos.password,
                captcha:datos.captcha
            }

            const respuesta = await clienteAxios.post('/api/auth/', data)
                .then((response) => {


                    if( response.data.success == false ){
                        dispatch({
                            type: LOGIN_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                    }else{

                        dispatch({
                            type: LOGIN_EXITOSO, //Es la accion a ejecutar
                            payload: response.data.token  //Son los datos que modifica el state 
                        });                         

                    }


              }).catch((response) => {
                    dispatch({
                        type: LOGIN_ERROR, //Es la accion a ejecutar
                        payload: "Hubo problema con el servuidor"  //Son los datos que modifica el state 
                    }); 
              }); 
            
            

           // console.log( " Token  login -> ", respuesta.data.token ); 

          /*  dispatch({
                type: LOGIN_EXITOSO, //Es la accion a ejecutar
                payload: respuesta.data.token  //Son los datos que modifica el state 
    
            }); 
            */


            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR, //Es la accion a ejecutar
                payload: "Hubo problema con el servuidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }    
    //Metodo: Validamos si el usuario esta autenticado por cada acción que realice 
    const usuarioAutenticado = async (datos)=>{
    
        console.log("Desde iniciar Session ", datos );
        try {
            
        } catch (error) {
            console.log(error);
        }
    
    } 

    //Metodo: Cerrar Session 
    const cerrarSesion = ()=>{

        dispatch({
            type: CERRAR_SESION, //Es la accion a ejecutar
        }); 

    }      
    //Metodo:  
    //Metodo:  

    return (
        <AuthContext.Provider
            value={{
                token:state.token, 
                autenticado:state.autenticado,
                usuario:state.usuario, 
                mensaje:state.mensaje, 
                iniciarSesion,
                cerrarSesion, 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;