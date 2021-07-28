//Importo las acciones definidas en el

import {
    REGISTRO_USUARIO_EXITOSO,
    REGISTRO_USUARIO_ERROR,
    CAMBIO_CLAVE_EXITOSO, 
    CAMBIO_CLAVE_ERROR,
    EDITAR_USUARIO_EXITOSO, 
    EDITAR_USUARIO_ERROR,
    LIMPIAR_MENSAJE
} from '../../types';

//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const usuarioReducer = (state,action) => {
    switch (action.type) {
        case REGISTRO_USUARIO_EXITOSO: 
            return{
                ...state, 
                mensaje:action.payload,
            }

        case REGISTRO_USUARIO_ERROR: 
            return{
                ...state, 
                mensaje:action.payload,
                registro:true
            }     
        case EDITAR_USUARIO_EXITOSO: 
            return{
                ...state, 
                mensaje:action.payload,
                editado:true
            }
        case EDITAR_USUARIO_ERROR: 
            return{
                ...state, 
                mensaje:action.payload,
                editado:null
            }

            
        case CAMBIO_CLAVE_ERROR: 
            return{
                ...state, 
                mensaje:action.payload,
            }          
        case CAMBIO_CLAVE_EXITOSO: 
            return{
                ...state, 
                mensaje:action.payload,
                cambio:true
            } 
            
        case LIMPIAR_MENSAJE: 
            return{
                ...state, 
                mensaje:null
            }            

        default:
            return state;
    }
}

export default usuarioReducer;