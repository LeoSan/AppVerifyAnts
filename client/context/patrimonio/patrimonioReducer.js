//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_PATRIMONIO,
    MUTAR_PATRIMONIO_ERROR,
    MUTAR_PATRIMONIO_EXITO
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
                crearPatri: false,
                elimiPatri: false,
                msgCrear: null,
                msgDelet: null,
                msgList: null,
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