//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_SUBCATEGORIA,
    LISTAR_SUBCATEGORIA_ERROR
} from '../../types';


//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const subcategoriaReducer = (state,action) => {
    switch (action.type) {
        case LISTAR_SUBCATEGORIA: 
            return{
                ...state, 
                subcategoria:action.payload,
            }        
        
        case LISTAR_SUBCATEGORIA_ERROR: 
            return{
                ...state, 
                msgListSubCa:action.payload,
            }


        default:
            return state;
    }
}

export default subcategoriaReducer;