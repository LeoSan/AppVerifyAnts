import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import CategoriaContext from '../../context/categoria/categoriaContext';
import ActoContext from '../../context/acto/ActoContext';


const ActoList = ({ view }) => {

    //Declaro Hooks -> UseContext para usar el state 
    //Acceder el stateContext  de Categoria 
    const valorContext = useContext(CategoriaContext);
    const { categoria } = valorContext;

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { deleteActo, listarActo, acto} = valorActoContext;


    //Declaración Variables
    const datos = { nickID }

    //Declaro UseEffect   
    useEffect(() => {
        listarActo(datos);
        
    }, []);


    const linkEditarActo = (id)=>{


    }

    //Función : Permite pdesplegar un dialog (Swal) para validar si desea  eliminar  
    const getDialog = (id, nombre) => {
        Swal.fire({
            title: 'Alerta',
            text: '¿ Seguro que deseas eliminar este registro ?',
            // icon: 'warning',
            showCancelButton:   true,
            confirmButtonColor: '#059669',
            cancelButtonColor:  '#b91c1c',
            confirmButtonText:  'Si, Deseo eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteActo(id, nombre);
                listarActo(datos);
            }
        });

    }//fin del metodo  getDialog    


    if (view.viewList == false) { return null }

    return (
        <div className="flex flex-col">

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Nombre
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Catálogo
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Descripción
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Estatus
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Acción
                        </th>

                    </tr>
                </thead>
                
                {
                    (acto != null) ? (

                        <tbody className="bg-white divide-y divide-gray-200">
                            {acto.map((list) => (

                                <tr key={list._id} className="text-center hover:bg-yellow-100">
                                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                                        {list.nomActo}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="text-sm text-gray-900">{list.desActo}</div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="text-sm text-gray-900">{list.categoria.nomCate}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                        {(list.activo == 1) ? (

                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Activo
                                            </span>

                                        ) : (

                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Inactivo
                                            </span>

                                        )}

                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button title="Editar Acto" className="btn-yellow" onClick={ ()=>linkEditarActo(list._id) } > <PencilIcon className="w-5 " /></button>
                                        <button title="Eliminar Acto" className="btn-yellow btn-tran-danger" onClick={() => getDialog(list._id, list.nomActo)}> <TrashIcon className="w-5 " /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    ) : null
                }
                
            </table>


        </div>
    );
}

ActoList.propTypes = {
    /*  listarCategoria: PropTypes.func,
      mensajeList: PropTypes.string,
      nickEmail: PropTypes.string,
      nickID: PropTypes.string,
      categoria: PropTypes.object,
      ListCategoria: PropTypes.array,
      router:  PropTypes.object,
      */
};

export default ActoList;