//Importar Librerias React 
import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";

//importar icon 
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'


//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar from '../components/ui/SideBar';

const Categoria = () => {

    //Declaro useState 


    //Declaro UseContext  


    //Declaro UseEffect   


    //Metodos Funcionales 

    //función : 
    //función : 
    //función : 

    const people = [
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        }, {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        }, {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },

        // More people...
    ]


    // https://tailwindcomponents.com/component/table-1
    // https://tailwindui.com/components/application-ui/lists/tables

    return (

        <Layout>
            <div className="md:flex flex min-h-screen">
                
                <SideBar />
                
                <div className="md:w-3/5 xl:w-4/5 p-6">

                    <div className="flex justify-center mt-10">
                        <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                            <label className="text-2xl font-bold text-yellow-500 " >Listado de Tus Categorias</label>

                            <div className="flex flex-col mt-5 mb-5">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {people.map((person) => (
                                                        
                                                        <tr key={person.email} className="text-center hover:bg-yellow-100">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {person.name}
                                                            </td>
                                                            <td className="px-6 py-4 ">
                                                                <div className="text-sm text-gray-900">{person.title}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Active
                                                                </span>
                                                            </td>
                                                           
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button title="Editar Categoria"  className="btn-yellow"> <PencilIcon className="w-5 "/></button>                                          
                                                                <button title="Eliminar Categoria"  className="btn-yellow btn-tran-danger"> <TrashIcon className="w-5 "/></button>                                          
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Categoria.propTypes = {
    // getValCapctha: PropTypes.func,
    // valcaptcha: PropTypes.string,
    // mensaje: PropTypes.string,
    // confirmaRobot: PropTypes.bool,
    // olvidoClave: PropTypes.bool,
    // formik:  PropTypes.object,
};

export default Categoria;