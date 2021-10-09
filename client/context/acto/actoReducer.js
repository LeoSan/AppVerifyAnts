//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_ACTO,
    LISTAR_ACTO_ERROR,
    ELIMINAR_ACTO_ERROR,
    ELIMINAR_ACTO_EXITO,
    MUTAR_ACTO_ERROR,
    MUTAR_ACTO_EXITO, 
    LISTAR_ACTO_SEMANA, 
    LISTAR_ACTO_ERROR_SEMANA,
    CAMBIO_LOADING,
} from '../../types';


//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const actoReducer = (state, action) => {
    switch (action.type) {
        case LISTAR_ACTO:
            return {
                ...state,
                acto: action.payload,
                msgMutaActo: null,
                msgDeleteActo: null,
                mutaActo: false,
                elimiActo:false,
            }        
        case LISTAR_ACTO_SEMANA:
            return {
                ...state,
                actoSemana: action.payload,
                msgMutaActo: null,
                msgDeleteActo: null,
                mutaActo: false,
                elimiActo:false,
                loadActo:false,
                loadClass:''
            }

        case LISTAR_ACTO_ERROR:
            case LISTAR_ACTO_ERROR_SEMANA:
            return {
                ...state,
                msgListActo: action.payload,
            }
        case MUTAR_ACTO_ERROR:
            return {
                ...state,
                msgMutaActo: action.payload,
                mutaActo: false

            }
        case MUTAR_ACTO_EXITO:
            return {
                ...state,
                msgMutaActo: action.payload,
                mutaActo: true
            }
        case ELIMINAR_ACTO_ERROR:
            return {
                ...state,
                msgDeleteActo: action.payload,
                elimiActo: false
            }
        case ELIMINAR_ACTO_EXITO:
            return {
                ...state,
                msgDeleteActo: action.payload,
                elimiActo: true
            }        
        case CAMBIO_LOADING:
            return {
                ...state,
                loadActo: true,
                loadClass:'animate-pulse'
            }

        default:
            return state;
    }
}

export default actoReducer;