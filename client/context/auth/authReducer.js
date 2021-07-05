//Importo las acciones definidas en el

import {
    CERRAR_SESION,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OLVIDO_CLAVE_ERROR, 
    OLVIDO_CLAVE_EXITOSO,
    
} from '../../types';

//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const authReducer = (state,action) => {
    switch (action.type) {
        case CERRAR_SESION: 
            
            localStorage.removeItem('token');
            return{
                ...state, 
                token:null,
                usuario:null, 
                autenticado:null,
            }
        

        case LOGIN_EXITOSO: 
            localStorage.setItem('token', action.payload);
        
            return{
                ...state, 
                token:action.payload,
                autenticado:true,
            }
        
        case LOGIN_ERROR: 
            return{
                ...state, 
                mensaje:action.payload
            }         
        case OLVIDO_CLAVE_ERROR: 
            return{
                ...state, 
                mensaje:action.payload
            }         
        case OLVIDO_CLAVE_EXITOSO: 
            return{
                ...state, 
                mensaje:action.payload
            }        
        
        case LIMPIAR_REGISTRO: 
            return{
                ...state, 
                classMensaje:action.payload
            }
        default:
            return state;
    }
}

export default authReducer;