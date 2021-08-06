//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import CategoriaContext from "./categoriaContext";
import categoriaReducer  from './categoriaReducer'; 

//Importo las acciones definidas en el type
import {
    LISTAR_CATEGORIA,
    LISTAR_CATEGORIA_ERROR,
} from '../../types';

//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



const CategoriaState = ({children}) => {

    // Crear state inicial
    const inicialState = {
        mensajeList:null, 
        categoria:null,
        cambio:null,
        editado:null
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(categoriaReducer, inicialState); 

    //Funciones Generales 
    //Metodo:  Registra un usuario 
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


            }).catch((response) => {
                    dispatch({
                        type: LISTAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    }); 
            });             
            
        } catch (error) {
            dispatch({
                type: LISTAR_CATEGORIA_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }
  
    
    //Metodo:  

    return (
        <CategoriaContext.Provider
            value={{
                mensajeList:state.mensajeList,
                categoria:state.categoria,
                editado:state.editado,
                cambio:state.cambio,
                listarCategoria,

            }}
        >
            {children}
        </CategoriaContext.Provider>
    )
}

export default CategoriaState;