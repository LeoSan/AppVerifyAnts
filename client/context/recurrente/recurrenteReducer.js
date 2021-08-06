//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_RECURRENTE,
    LISTAR_RECURRENTE_ERROR
} from '../../types';


//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const recurrenteReducer = (state,action) => {
    switch (action.type) {
        case LISTAR_RECURRENTE: 
            return{
                ...state, 
                recurrente:action.payload,
            }        
        
        case LISTAR_RECURRENTE_ERROR: 
            return{
                ...state, 
                mensajeListRe:action.payload,
            }


        default:
            return state;
    }
}

export default recurrenteReducer;