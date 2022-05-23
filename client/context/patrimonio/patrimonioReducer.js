//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_PATRIMONIO,
    MUTAR_PATRIMONIO_ERROR,
    MUTAR_PATRIMONIO_EXITO,
    LISTAR_PATRIMONIO_CARD
} from '../../types';

//Debe hacerce asi ya que se volvio obsoleto hacer por default 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const patrimonioReducer = (state, action) => {
    switch (action.type) {
        case LISTAR_PATRIMONIO:
            return {
                ...state,
                patrimonio: action.payload,
            }        
        case LISTAR_PATRIMONIO_CARD:
            return {
                ...state,
                patrimonio_card: action.payload,
            }
        case MUTAR_PATRIMONIO_ERROR:
            return {
                ...state,
                msgCrear: action.payload,
                crearPatri: false,
            }
        case MUTAR_PATRIMONIO_EXITO:
            return {
                ...state,
                msgCrear: action.payload,
                crearPatri: true
            }
        default:
            return state;
    }
}

export default patrimonioReducer;