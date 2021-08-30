//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_RECURRENTE,
    LISTAR_RECURRENTE_ERROR,
    MUTAR_RECURRENTE_ERROR,
    MUTAR_RECURRENTE_EXITO,
    ELIMINAR_RECURRENTE_ERROR,
    ELIMINAR_RECURRENTE_EXITO
} from '../../types';

//Debe hacerce asi ya que se volvio obsoleto hacer por default 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const recurrenteReducer = (state, action) => {
    switch (action.type) {
        case LISTAR_RECURRENTE:
            return {
                ...state,
                recurrente: action.payload,
                crearRecu: false,
                elimiRec: false,
                msgCrearRecu: null,
                msgDeleteRec: null,
            }

        case LISTAR_RECURRENTE_ERROR:
            return {
                ...state,
                mensajeListRe: action.payload,
            }

        case MUTAR_RECURRENTE_ERROR:
            return {
                ...state,
                msgCrearRecu: action.payload,
                crearRecu: false

            }
        case MUTAR_RECURRENTE_EXITO:
            return {
                ...state,
                msgCrearRecu: action.payload,
                crearRecu: true
            }
        case ELIMINAR_RECURRENTE_ERROR:
            return {
                ...state,
                msgDeleteRec: action.payload,
                elimiRec: false
            }
        case ELIMINAR_RECURRENTE_EXITO:
            return {
                ...state,
                msgDeleteRec: action.payload,
                elimiRec: true
            }

        default:
            return state;
    }
}

export default recurrenteReducer;