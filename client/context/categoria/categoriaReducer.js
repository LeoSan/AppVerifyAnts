//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_CATEGORIA,
    LISTAR_CATEGORIA_ERROR
} from '../../types';


//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const categoriaReducer = (state,action) => {
    switch (action.type) {
        case LISTAR_CATEGORIA: 
            return{
                ...state, 
                categoria:action.payload,
            }        
        
        case LISTAR_CATEGORIA_ERROR: 
            return{
                ...state, 
                mensajeList:action.payload,
            }


        default:
            return state;
    }
}

export default categoriaReducer;