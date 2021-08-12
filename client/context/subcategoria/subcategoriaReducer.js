//Importo las acciones definidas en el

//Importo las acciones definidas en el type
import {
    LISTAR_SUBCATEGORIA,
    LISTAR_SUBCATEGORIA_ERROR,
    CREAR_SUBCATEGORIA_ERROR,
    CREAR_SUBCATEGORIA_EXITO
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
                msgCrearSubCat:null
            }        
        
        case LISTAR_SUBCATEGORIA_ERROR: 
            return{
                ...state, 
                msgListSubCa:action.payload,
            }
        case CREAR_SUBCATEGORIA_ERROR: 
            return{
                ...state, 
                msgCrearSubCat:action.payload,
                crearSubCat:false
                
            }        
        case CREAR_SUBCATEGORIA_EXITO: 
            return{
                ...state, 
                msgCrearSubCat:action.payload,
                crearSubCat:true
            }



        default:
            return state;
    }
}

export default subcategoriaReducer;