//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import SubcategoriaContext from "./SubcategoriaContext";
import subcategoriaReducer  from './subcategoriaReducer'; 

//Importo las acciones definidas en el type
import {
    LISTAR_SUBCATEGORIA,
    LISTAR_SUBCATEGORIA_ERROR
} from '../../types';


//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



const SubcategoriaState = ({children}) => {

    // Crear state inicial
    const inicialState = {
        msgListSubCa:null, 
        subcategoria:null,
        cambio:null,
        editado:null
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(subcategoriaReducer, inicialState); 

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const listarSubCategoria = async (datos)=>{
    
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
                tipo:"1-M-A"
            }

            //console.log("Desde cliente ->", data);

            const respuesta = await clienteAxios.post('/api/subcategoria/get-subcat', data)
                .then((response) => {

                    if( response.data.success == true ){
                        dispatch({
                            type: LISTAR_SUBCATEGORIA, //Es la accion a ejecutar
                            payload: response.data.subcategoria  //Son los datos que modifica el state 
                        }); 

                    }else{

                        dispatch({
                            type: LISTAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });                         

                    }


            }).catch((response) => {
                    dispatch({
                        type: LISTAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    }); 
            });             
            
        } catch (error) {
            dispatch({
                type: LISTAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            }); 
        }
    
    }
  
    
    //Metodo:  

    return (
        <SubcategoriaContext.Provider
            value={{
                msgListSubCa:state.msgListSubCa,
                subcategoria:state.subcategoria,
                editado:state.editado,
                cambio:state.cambio,
                listarSubCategoria,

            }}
        >
            {children}
        </SubcategoriaContext.Provider>
    )
}

export default SubcategoriaState;