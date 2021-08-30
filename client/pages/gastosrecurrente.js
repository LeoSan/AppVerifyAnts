//Importar Librerias React 
import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';
import RecurrenteContext from '../context/recurrente/RecurrenteContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import Error from '../components/ui/Error';
import SideBar from '../components/ui/SideBar';

const Gastosrecurrente = () => {

    //Declaro useState 

    //Declaro Hook    
    //Redireccionar   
    const router = useRouter();  


    //Declaro UseContext 
    //Acceder el state de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickEmail, nickID } = valorAuthContext;

    //Acceder el state de Categoria 
    const valorContextRe = useContext(RecurrenteContext);
    const { listarRecurrente, deleteRecurrente, mensajeListRe, recurrente, msgDeleteRec, elimiRecu  } = valorContextRe;

    //Declaración Variables
    let ListRecurrente = [];
    const datos = { nickID, nickEmail }

  

    //Declaro UseEffect   
    useEffect(() => {
        listarRecurrente(datos);
    }, []);

    //Asignación de Valores 
    //Esto me permite controlar el arreglo con los valores del listado 
    ListRecurrente = recurrente;


    //Metodos Funcionales 
    //Función : Permite redireccionar al formulario de crear Recurrencia 
    const linkCrearRecurrencia = () => {
        router.push('/gastosrecurrenteform');
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
                deleteRecurrente(id, nombre);
                listarRecurrente(datos);
            }

        });

    }//fin del metodo  getDialog

    //Función : Permite Enviar y redicreccionar parametros 
    const linkEditarRecurrente = (id ) => {
        router.push({
            pathname: '/gastosrecurrenteform',
            query: { id: id },
          })

    }//fin del metodo 

    return (
        <Layout>
            <div className="md:flex flex min-h-screen">

                <SideBar />

                <div className="md:w-3/5 xl:w-4/5 p-6">

                    <div className="flex justify-center mt-10">
                        <div className="w-full max-w-1xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                            <label className="text-2xl font-bold text-yellow-500 " >Listado de Programación de Gastos Recurrentes</label>

                            
                            {msgDeleteRec != null && elimiRecu == null ? (
                                <Error mensaje={msgDeleteRec} ></Error>
                            ) : null}

                            <div className="flex flex-col mt-5 mb-5">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                            <div className="flex justify-end space-x-6 pr-10">
                                                <button title="Crear Recurrencia" className="btn-yellow" onClick={() => linkCrearRecurrencia()}>
                                                    <PlusCircleIcon className="w-9" /> 
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
                                                    (recurrente != null) ? (

                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {ListRecurrente.map((list) => (

                                                                <tr key={list._id} className="text-center hover:bg-yellow-100">
                                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                                                                        {list.nomRecu}
                                                                    </td>
                                                                    <td className="px-6 py-4 ">
                                                                        <div className="text-sm text-gray-900">{list.desRecu}</div>
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
                                                                        <button title="Editar Recurrencia" className="btn-yellow" onClick={ ()=>linkEditarRecurrente(list._id) }> <PencilIcon className="w-5 " /></button>
                                                                        <button title="Eliminar Categoria" className="btn-yellow btn-tran-danger" onClick={ ()=>getDialog(list._id, list.nomRecu) }> <TrashIcon className="w-5 " /></button>
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

                            {mensajeListRe != null && recurrente == null ? (
                                <Error mensaje={mensajeListRe} ></Error>
                            ) : null}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Gastosrecurrente.propTypes = {
     listarRecurrente: PropTypes.func,
     getDialog: PropTypes.func,
     linkEditarRecurrente: PropTypes.func,
     nickEmail: PropTypes.string,
     nickID: PropTypes.string,
     mensajeListRe: PropTypes.string,
     msgDeleteRec: PropTypes.string,
     recurrente: PropTypes.array,
     ListRecurrente: PropTypes.array,
     valorAuthContext:  PropTypes.object,
     valorContextRe:  PropTypes.object,
     elimiRecu:  PropTypes.bool,
};

export default Gastosrecurrente;