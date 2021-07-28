//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import UsuarioContext from "./usuarioContext";
import usuarioReducer  from './usuarioReducer'; 

//Importo las acciones definidas en el type
import {
    REGISTRO_USUARIO_EXITOSO,
    REGISTRO_USUARIO_ERROR,
    CAMBIO_CLAVE_EXITOSO, 
    CAMBIO_CLAVE_ERROR,
    EDITAR_USUARIO_EXITOSO, 
    EDITAR_USUARIO_ERROR,
    LIMPIAR_MENSAJE
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



const UsuarioState = ({children}) => {

    // Crear state inicial
    const inicialState = {
        mensaje:null, 
        registro:null,
        cambio:null,
        editado:null
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
                captcha:datos.captcha
                
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
    //Metodo: Cambio de clave por el usuario luego de confirmar correo
    const cambiarClave = async (datos)=>{
    
        console.log("Desde Cambiar Clave ", datos);
        try {

            const data = { 
                token:datos.token, 
                emailUsu:datos.email, 
                password:datos.password2,
                captcha:datos.captcha,
                
            }

           // console.log("Data Leo->", data);

                const respuesta = await clienteAxios.put('/api/usuarios/pass', data)
                .then((response) => {


                    if( response.data.success == false ){
                        dispatch({
                            type: CAMBIO_CLAVE_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                    }else{

                        dispatch({
                            type: CAMBIO_CLAVE_EXITOSO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });                         

                    }


            }).catch((response) => {
                    dispatch({
                        type: CAMBIO_CLAVE_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    }); 
            });           
            
        } catch (error) {
            dispatch({
                type: CAMBIO_CLAVE_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }    
  
    //Metodo:  Editar un usuario 
    const editarUsuario = async (datos)=>{
    
        //console.log("Desde Editar Usuario ", datos);
        try {

            const data = { 
                emailUsu:datos.email, 
                nomUsu:datos.nombre, 
                apeUsu:datos.apellido, 
                sexo:datos.sexo,
                pais:datos.pais,
                fechaNac:datos.fecha,
                captcha:datos.captcha
            }

                
            const respuesta = await clienteAxios.put('/api/usuarios/editar', data)
                .then((response) => {

                    if( response.data.success == false ){
                        dispatch({
                            type: EDITAR_USUARIO_EXITOSO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        }); 

                    }else{

                        dispatch({
                            type: EDITAR_USUARIO_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });                         

                    }

            }).catch((response) => {
                    dispatch({
                        type: EDITAR_USUARIO_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    }); 
            });     
          
            
            
        } catch (error) {
            dispatch({
                type: EDITAR_USUARIO_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    } 
    //Metodo: Permite limpiar los mensajes luegos de realizar un proceso 
    const limpiarEstadoMensaje = ()=>{
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_MENSAJE, //Es la accion a ejecutar
            }); 
        }, 5000);
    }     
    
    //Metodo:  

    return (
        <UsuarioContext.Provider
            value={{
                mensaje:state.mensaje,
                registro:state.registro,
                editado:state.editado,
                cambio:state.cambio,
                registrarUsuario,
                cambiarClave,
                editarUsuario,
                limpiarEstadoMensaje

            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioState;