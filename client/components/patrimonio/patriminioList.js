//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';

import { PlusCircleIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
//import AuthContext from '../context/auth/AuthContext';

//componentes patriminioList
import Error from '../ui/Error';

const PatriminioList = () => {


    return (

        
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Categoria
                </th>
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
                    Descripcion
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Monto
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Fecha
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

        <tr>
        <td
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            Categoria
        </td>
        <td
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            Nombre
        </td>
        <td
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            Descripcion
        </td>
        <td
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            Monto
        </td>
        <td
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            Fecha
        </td>        
        <td
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            Acción
        </td>

    </tr>                                        
        </tbody>

        </table>

    );
}

export default PatriminioList;