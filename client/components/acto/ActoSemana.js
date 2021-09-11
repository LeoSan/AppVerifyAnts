import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { ArrowSmRightIcon, ArrowSmLeftIcon, CalendarIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import ActoContext from '../../context/acto/ActoContext';


const ActoSemana = ({ view }) => {

    //Declaro Hooks -> UseContext para usar el state 

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { listarActo, acto } = valorActoContext;

    //Declaración Variables
    const datos = { nickID }

    //Declaro UseEffect   
    useEffect(() => {
        listarActo(datos);
    }, []);





    if (view.viewSemana == false) { return null }

    return (
        <div className="flex flex-col">

            <div className="rounded-t-xl p-2 bg-gradient-to-r from-gray-50 to-gray-200">
                <div className="flex space-x-4">
                    
                    <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center">
                        <svg className="w-5 h-5 cursor-pointer" fill="none">
                                <ArrowSmLeftIcon className="w-6 cursor-pointer" />
                        </svg>
                    </div>
                    <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                            Fecha Actual: <span className="text-gray-200"> 09, Septiembre 2021</span>
                            <svg class="h-5 w-14" fill="none">
                                <CalendarIcon className="w-6" />
                            </svg>
                            Semana: <span className="text-gray-200"> 36</span>
                    </div>
                    <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center">
                    <svg className="w-5 h-5 cursor-pointer" fill="none">
                         <ArrowSmRightIcon className="w-6" />
                    </svg>
                    </div>
                </div>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 bg-yellow-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actos
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Lunes
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Martes
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Miercoles
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Jueves
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Viernes
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Sabado
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
                                        check
                                    </td>
                                    <td className="px-6 py-4 ">
                                        check
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        check
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        check
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        check
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        check
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

ActoSemana.propTypes = {
    /*  listarCategoria: PropTypes.func,
      mensajeList: PropTypes.string,
      nickEmail: PropTypes.string,
      nickID: PropTypes.string,
      categoria: PropTypes.object,
      ListCategoria: PropTypes.array,
      router:  PropTypes.object,
      */
};

export default ActoSemana;