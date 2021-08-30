//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_SUBCATEGORIA,
    LISTAR_SUBCATEGORIA_ERROR,
    ELIMINAR_SUBCATEGORIA_ERROR,
    ELIMINAR_SUBCATEGORIA_EXITO,
    MUTAR_SUBCATEGORIA_ERROR,
    MUTAR_SUBCATEGORIA_EXITO, 
} from '../../types';


//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const subcategoriaReducer = (state, action) => {
    switch (action.type) {
        case LISTAR_SUBCATEGORIA:
            return {
                ...state,
                subcategoria: action.payload,
                msgCrearSubCat: null,
                crearSubCat: false,
                elimiSubCat:false,
            }

        case LISTAR_SUBCATEGORIA_ERROR:
            return {
                ...state,
                msgListSubCa: action.payload,
            }
        case MUTAR_SUBCATEGORIA_ERROR:
            return {
                ...state,
                msgCrearSubCat: action.payload,
                crearSubCat: false

            }
        case MUTAR_SUBCATEGORIA_EXITO:
            return {
                ...state,
                msgCrearSubCat: action.payload,
                crearSubCat: true
            }
        case ELIMINAR_SUBCATEGORIA_ERROR:
            return {
                ...state,
                msgDeleteCat: action.payload,
                elimiSubCat: false
            }
        case ELIMINAR_SUBCATEGORIA_EXITO:
            return {
                ...state,
                msgDeleteCat: action.payload,
                elimiSubCat: true
            }

        default:
            return state;
    }
}

export default subcategoriaReducer;