//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import PatrimonioContext from '../../context/patrimonio/PatrimonioContext';

//componentes patriminioList
const Swal = require('sweetalert2');

const PatriminioList = ( {view} ) => {

        //Declaro UseContext 
    //Acceder el state de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickEmail, nickID } = valorAuthContext;

    //Acceder el state de Patrimonio 
    const valorPatrimonioContext = useContext(PatrimonioContext);
    const {  patrimonio, deletePatrimonio, listarPatrimonio } = valorPatrimonioContext;
    

    //Declaración Variables
    let datos = { nickID, nickEmail }
    const datosConsulta = {nomPatrimonio:'', usuario:nickID, categoria:0, activo:1, tipo:"1-M" }
    
    //Metodos: Interacción con el usuario
    const getDialog = (id, nombre)=>{

        Swal.fire({
            title: 'Alerta',
            text: '¿ Seguro que deseas eliminar este registro ?',
           // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#b91c1c',
            confirmButtonText: 'Si, Deseo eliminarlo!'
          }).then((result) => {
           
           if (result.isConfirmed){
                datos = { 
                    ...datos,
                    id:id,
                    nomPatrimonio:nombre
                }
                deletePatrimonio( datos ); 
                listarPatrimonio(datosConsulta);
           }
           
          });

    }//fin del metodo  getDialog

    const editPatrimonio = (objeto)=>{
        if ( objeto ) {

            //Permite set select e input con el valor a editar    
            document.getElementById("id_editar").value = objeto._id; ;
            document.getElementById("categoria").value = objeto.categoria._id; ;
            document.getElementById("tipoActivo").value = objeto.tipoActivo; ;
            
            document.getElementById("nomPatrimonio").value = objeto.nomPatrimonio; ;
            document.getElementById("desPatrimonio").value = objeto.desPatrimonio; ;
            document.getElementById("montoPatrimonio").value = objeto.montoPatrimonio; ;
            document.getElementById("fechaCompra").value = objeto.fechaCompra; ;
        }
    }

    if (view.viewFormPatri == false) { return null }

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
        
        {
            (patrimonio!=null)?(

                    <tbody className="bg-white divide-y divide-gray-200">
                    {patrimonio.map((list) => (
                        <tr key={list._id} className="text-center hover:bg-yellow-100">
                            
                            <td className="px-6 py-4 ">
                                <div className="text-sm text-gray-900">
                                    <span className="bg-yellow-200 font-bold rounded-md border-solid border-black capitalize px-2">
                                        { list.categoria.nomCate}
                                    </span>
                                </div>
                            </td>
                            
                            <td
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {list.nomPatrimonio}
                            </td>
                            <td
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {list.desPatrimonio}
                            </td>
                            <td
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {list.montoPatrimonio}
                            </td>
                            <td
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                { 
                                    moment(list.fechaCompra.replace(/-/g, '\/').replace(/T.+/, '')).format('MMM Do YYYY')
                                }
                            </td>        
                            <td
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                 <button title="Editar Acto" className="btn-yellow" onClick={() => editPatrimonio(list)} > <PencilIcon className="w-5 " /></button>
                                 <button title="Eliminar Acto" className="btn-yellow btn-tran-danger" onClick={() => getDialog(list._id, list.nomPatrimonio)}> <TrashIcon className="w-5 " /></button>

                            </td>

                        </tr>    
                ))}                                    
                    </tbody>):null
                }
        </table>

    );
}

export default PatriminioList;