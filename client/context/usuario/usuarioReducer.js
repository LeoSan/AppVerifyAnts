//Importo las acciones definidas en el

import {
    REGISTRO_USUARIO_EXITOSO,
    REGISTRO_USUARIO_ERROR,
    CAMBIO_CLAVE_EXITOSO, 
    CAMBIO_CLAVE_ERROR,
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

        default:
            return state;
    }
}

export default usuarioReducer;