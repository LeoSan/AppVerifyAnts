//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_CATEGORIA,
    LISTAR_CATEGORIA_ERROR,
    CREAR_CATEGORIA_ERROR,
    CREAR_CATEGORIA_EXITO,
    ELIMINAR_CATEGORIA_ERROR,
    ELIMINAR_CATEGORIA_EXITO,
    EDITAR_CATEGORIA_ERROR,
    EDITAR_CATEGORIA_EXITO
} from '../../types';


//Debe hacerce asi ya que se volvio obsoleto hacer por defaul 
//-> Asi no mas -> export default (state, action) =>{
//Es ahora asi -> const authReducer = (state,action) => {

const categoriaReducer = (state, action) => {
    switch (action.type) {
        case LISTAR_CATEGORIA:
            return {
                ...state,
                categoria: action.payload,
                msgCrearCat: null,
                msgDeleteCat:null, 
                elimiCat:false,
                crearCat: false
            }

        case LISTAR_CATEGORIA_ERROR:
            return {
                ...state,
                mensajeList: action.payload,
            }
        case CREAR_CATEGORIA_EXITO:
            return {
                ...state,
                msgCrearCat: action.payload,
                crearCat: true

            }
        case CREAR_CATEGORIA_ERROR:
            return {
                ...state,
                msgCrearCat: action.payload,
                crearCat: false
            }

        case ELIMINAR_CATEGORIA_ERROR:
            return {
                ...state,
                msgDeleteCat: action.payload,
                elimiCat: false

            }
        case ELIMINAR_CATEGORIA_EXITO:
            return {
                ...state,
                msgDeleteCat: action.payload,
                elimiCat: true
            }        
        case EDITAR_CATEGORIA_ERROR:
            return {
                ...state,
                msgCrearCat: action.payload,
                crearCat: false

            }
        case EDITAR_CATEGORIA_EXITO:
            return {
                ...state,
                msgCrearCat: action.payload,
                crearCat: true
            }


        default:
            return state;
    }
}

export default categoriaReducer;