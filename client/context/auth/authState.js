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
    OLVIDO_CLAVE_ERROR, 
    OLVIDO_CLAVE_EXITOSO,
    DATOS_USUARIOS,
    LIMPIAR_MENSAJE
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // Crear state inicial
    const inicialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : null, 
        autenticado:false, 
        ninkName:null, 
        nickEmail:null,
        nickID:null,
        mensaje:null,
        mensajeList:null,
        msgCrearCat:null,
        msgDeleteCat:null,
        msgListSubCa:null,
        msgCrearSubCat:null,
        msgDeleteCat:null

    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(authReducer, inicialState); 

    //Funciones Generales 
    
    //Metodo: Validamos si el usuario esta autenticado por cada acción que realice 
    const usuarioAutenticado = async (datos)=>{
    
        const token = localStorage.getItem('token');
        if (token){
            //funcion para enviar el token por header 
            tokenAuth(token);

        }

        const data = { 
            emailUsu:datos.email, 
        }
        try {

            const respuesta = await clienteAxios.get('/api/auth/', data)
                .then((response) => {

                    //console.log("Hola mundo",response.data.usuario);    
                    if( response.status != 200  ){
                        dispatch({
                            type: LOGIN_ERROR, //Es la accion a ejecutar
                            payload: response.statusText  //Son los datos que modifica el state 
                        }); 

                    }else{

                        dispatch({
                            type: DATOS_USUARIOS, //Es la accion a ejecutar
                            payload: response.data.usuario  //Son los datos que modifica el state 
                        });                         

                    }
                

              }).catch((response) => {
                    dispatch({
                        type: LOGIN_ERROR, //Es la accion a ejecutar
                        payload: "Hubo problema con el servidor 1."  //Son los datos que modifica el state 
                    }); 
              });            
            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR, //Es la accion a ejecutar
                payload: "Hubo problema con el servidor 2."  //Son los datos que modifica el state 
            }); 
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

                        //Obtengo los datos del usuario luego de realizar el login 
                        usuarioAutenticado(data);

                    }


              })
            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR, //Es la accion a ejecutar
                payload: "Hubo problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }    


    //Metodo: Cerrar Session 
    const cerrarSesion = ()=>{

        dispatch({
            type: CERRAR_SESION, //Es la accion a ejecutar
        }); 

    }      
    //Metodo: Permite limpiar los mensajes luegos de realizar un proceso 
    const limpiarEstadoMensaje = ()=>{
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_MENSAJE, //Es la accion a ejecutar
            }); 
        }, 5000);
    }      

    //Metodo: Permite cambiar la clave 0
    const olvidoClave =  async (datos)=>{

        try {

            const data = { 
                emailUsu:datos.email, 
                password:datos.password,
                captcha:datos.captcha
            }

            const respuesta = await clienteAxios.post('/api/auth/olvidoClave', data)
                .then((response) => {


                    if( response.data.success == false ){
                        dispatch({
                            type: OLVIDO_CLAVE_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 
                           
                    }else{

                       dispatch({
                            type: OLVIDO_CLAVE_EXITOSO, //Es la accion a ejecutar
                            payload:  response.data.msg  //Son los datos que modifica el state 
                        });                         
                        
                    }


              }).catch((response) => {
                    
                    dispatch({
                        type: OLVIDO_CLAVE_ERROR, //Es la accion a ejecutar
                        payload: "Hubo problema con el servidor."  //Son los datos que modifica el state 
                    }); 
                    
              });             
            
        } catch (error) {
            
        }

    }    
   
   
    //Metodo:  
    const saludoTiempo = ()=>{
        
        let fecha = new Date(); 
        let hora = fecha.getHours();
        let imagen = ''; 
        let texto = ''; 
       
        if(hora >= 0 && hora < 12){
          texto = "Día";
          imagen = "img/dia.png";
        }
       
        if(hora >= 12 && hora < 18){
          texto = " Tarde";
          imagen = "img/tarde.png";
        }
       
        if(hora >= 18 && hora < 24){
          texto = "Noche";
          imagen = "img/noche.png";
        }

       return texto; 

    }


    return (
        <AuthContext.Provider
            value={{
                token:state.token, 
                autenticado:state.autenticado,
                usuario:state.usuario, 
                ninkName:state.ninkName, 
                nickEmail:state.nickEmail, 
                nickID:state.nickID, 
                mensaje:state.mensaje, 
                iniciarSesion,
                cerrarSesion, 
                olvidoClave,
                usuarioAutenticado,
                saludoTiempo,
                limpiarEstadoMensaje,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;