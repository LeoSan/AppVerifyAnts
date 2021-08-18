//Importar Librerias React 
import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';
import SubcategoriaContext from '../context/subcategoria/SubcategoriaContext';
import CategoriaContext from '../context/categoria/categoriaContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar from '../components/ui/SideBar';

const Subcategoria = () => {


    //Declaro useState 

    //Declaro Hook    
    //Redireccionar   
    const router = useRouter();


    //Declaro UseContext 
    //Acceder el state de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickEmail, nickID } = valorAuthContext;

    //Acceder el state de Subcategoria 
    const valorContext = useContext(SubcategoriaContext);
    const { listarSubCategoria, deleteSubCategoria, msgListSubCa, msgDeleteSubCat, subcategoria, elimiSubCat } = valorContext;

    //Acceder el state de Categoria 
    const valorCategoriaContext = useContext(CategoriaContext);
    const { listarCategoria } = valorCategoriaContext;

    //Declaración Variables
    let ListSubCategoria = [];
    const datos = { nickID, nickEmail }

    //Declaro UseEffect   
    useEffect(() => {
        listarSubCategoria(datos);
        listarCategoria(datos);
    }, []);

    //Asignación de Valores 
    //Esto me permite controlar el arreglo con los valores del listado 
    ListSubCategoria = subcategoria;

    //Metodos Funcionales 
    //función : Permite redireccionar al formulario de crear categoria 
    const linkCrearSubCategoria = () => {
        router.push('/subcategoriacrear');
    }

    //Función : Permite pdesplegar un dialog (Swal) para validar si desea  eliminar  
    const getDialog = (id, nombre) => {
        Swal.fire({
            title: 'Alerta',
            text: '¿ Seguro que deseas eliminar este registro ?',
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#b91c1c',
            confirmButtonText: 'Si, Deseo eliminarlo!'
        }).then((result) => {

            if (result.isConfirmed) {
                deleteSubCategoria(id, nombre);
                listarSubCategoria(datos);
                listarCategoria(datos);
            }

        });

    }//fin del metodo  getDialog

    return (
        <Layout>
            <div className="md:flex flex min-h-screen">

                <SideBar />

                <div className="md:w-3/5 xl:w-4/5 p-6">

                    <div className="flex justify-center mt-10">
                        <div className="w-full pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                            <label className="text-2xl font-bold text-yellow-500 " >Listado de Tus Subcategorias</label>

                            {msgDeleteSubCat != null && elimiSubCat == null ? (
                                <Error mensaje={msgDeleteSubCat} ></Error>
                            ) : null}

                            <div className="flex flex-col mt-5 mb-5">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                            <div className="flex justify-center items-end space-x-6">
                                                <button title="Crear Subcategoria" className="btn-yellow cursor-pointer h-24 w-24  text-center font-extrabold flex  rounded-full" onClick={() => linkCrearSubCategoria()}>
                                                    <PlusCircleIcon className="w-5 " /> Crear
                                                </button>
                                            </div>


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
                                                            Descripción
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Categoria
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
                                                    (subcategoria != null) ? (

                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {ListSubCategoria.map((list) => (

                                                                <tr key={list._id} className="text-center hover:bg-yellow-100">
                                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                                                                        {list.nomCate}
                                                                    </td>
                                                                    <td className="px-6 py-4 ">
                                                                        <div className="text-sm text-gray-900">{list.desCate}</div>
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
                                                                        <button title="Editar Categoria" className="btn-yellow"> <PencilIcon className="w-5 " /></button>
                                                                        <button title="Eliminar Categoria" className="btn-yellow btn-tran-danger" onClick={() => getDialog(list._id, list.nomCate)}> <TrashIcon className="w-5 " /></button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>

                                                    ) : null
                                                }

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {msgListSubCa != null && subcategoria == null ? (
                                <Error mensaje={msgListSubCa} ></Error>
                            ) : null}


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Subcategoria.propTypes = {
    // linkCrearSubCategoria: PropTypes.func,
    // ListSubCategoria: PropTypes.array,
    // mensaje: PropTypes.string,
    // confirmaRobot: PropTypes.bool,
    // olvidoClave: PropTypes.bool,
    // formik:  PropTypes.object,
};

export default Subcategoria;