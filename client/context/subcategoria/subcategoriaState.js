//Importo librerias React 
import React, { useReducer } from 'react';

//Importo context y reducer 
import SubcategoriaContext from "./SubcategoriaContext";
import subcategoriaReducer from './subcategoriaReducer';

//Importo las acciones definidas en el type
import {
    LISTAR_SUBCATEGORIA,
    LISTAR_SUBCATEGORIA_ERROR,
    CREAR_SUBCATEGORIA_ERROR,
    CREAR_SUBCATEGORIA_EXITO
} from '../../types';


//Importo nuetsra libreria axios para conectar con el servidor 
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



const SubcategoriaState = ({ children }) => {

    // Crear state inicial
    const inicialState = {
        msgListSubCa: null,
        subcategoria: null,
        msgCrearSubCat: null,
        editaSubCat: false,
        crearSubCat: false,
        elimiSubCat: false
    }

    // Definimos Reducer 
    const [state, dispatch] = useReducer(subcategoriaReducer, inicialState);

    //Funciones Generales 
    //Metodo:  Registra un usuario 
    const listarSubCategoria = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = {
                nomCate: datos.nickEmail,
                autor: datos.nickID,
                activo: 1,
                tipo: "1-M-A"
            }

            //console.log("Desde cliente ->", data);

            const respuesta = await clienteAxios.post('/api/subcategoria/get-subcat', data)
                .then((response) => {

                    if (response.data.success == true) {
                        dispatch({
                            type: LISTAR_SUBCATEGORIA, //Es la accion a ejecutar
                            payload: response.data.subcategoria  //Son los datos que modifica el state 
                        });

                    } else {

                        dispatch({
                            type: LISTAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                    }


                }).catch((response) => {
                    dispatch({
                        type: LISTAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    });
                });

        } catch (error) {
            dispatch({
                type: LISTAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });
        }

    }


    //Metodo: Registra una Categoria
    const crearSubCategoria = async (datos) => {

        try {

            const token = localStorage.getItem('token');

            if (token) {
                //funcion para enviar el token por header 
                tokenAuth(token);
            }

            // nomCate, autor, activo, tipo
            const data = {
                nomCate: datos.nomCate,
                desCate: datos.desCate,
                categoria: datos.categoria,
                autor: datos.autor,
                actividad: datos.actividad
            }

            const respuesta = await clienteAxios.post('/api/subcategoria/create', data)
                .then((response) => {

                    console.log(response.data);

                    if (response.data.success == true) {
                        dispatch({
                            type: CREAR_SUBCATEGORIA_EXITO, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                        setTimeout(() => {
                            // router.push('/categoria');
                        }, 6000);//wait 6 seconds                        


                    } else {

                        dispatch({
                            type: CREAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                            payload: response.data.msg  //Son los datos que modifica el state 
                        });

                    }
                

                }).catch((response) => {
                    dispatch({
                        type: CREAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                        payload: response.data.msg  //Son los datos que modifica el state 
                    });
                });

        } catch (error) {
            dispatch({
                type: CREAR_SUBCATEGORIA_ERROR, //Es la accion a ejecutar
                payload: "Hubo un problema con el servidor"  //Son los datos que modifica el state 
            });
        }

    }

    //Metodo:  

    return (
        <SubcategoriaContext.Provider
            value={{
                msgListSubCa: state.msgListSubCa,
                subcategoria: state.subcategoria,
                msgCrearSubCat: state.msgCrearSubCat,
                editaSubCat: state.editaSubCat,
                crearSubCat: state.crearSubCat,
                elimiSubCat: state.elimiSubCat,
                listarSubCategoria,
                crearSubCategoria


            }}
        >
            {children}
        </SubcategoriaContext.Provider>
    )
}

export default SubcategoriaState;