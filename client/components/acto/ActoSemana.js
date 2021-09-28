import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { ArrowSmRightIcon, ArrowSmLeftIcon, CalendarIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import ActoContext from '../../context/acto/ActoContext';


//Importar UI 
import Alerta from '../../components/ui/Alerta';
import Error from '../../components/ui/Error';

const ActoSemana = ({ view }) => {

    //Declaro Hooks -> UseContext para usar el state 
   const  alerta = new Alerta();

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { listarActo, crearActoRegistroSemanal, acto, msgMutaActo, mutaActo } = valorActoContext;

    //Declaración Variables
    const datos = { nickID }

    //Declaro UseEffect   
    useEffect(() => {
        listarActo(datos);
    }, []);





    const dialogCheck = async(acto, dia,  checkedId)=>{

        let formValues = undefined;
        let checked = false;  
        let duracion = null;
        let nota = null;
        let semana = moment(Date()).week();

        if( document.getElementById(checkedId).checked ){
             checked = true; 
             document.getElementById( checkedId ).checked = true;
             formValues = await alerta.deployModal();
        }else{
            document.getElementById( checkedId ).checked = false;
        }

        if ( formValues != undefined){
            duracion = formValues[0];
            nota = formValues[1];
        }
        
        const data = {
            autor: nickID,
            acto: acto,
            duracion: duracion,
            nota: nota,
            dia: dia,
            semana: semana,
            checked:checked
        }
        //Envio de valores para el endpoint
        crearActoRegistroSemanal(data);

    }



    if (view.viewSemana == false) { return null }

    return (
        <div className="flex flex-col">

        {msgMutaActo != null && mutaActo == null ? (
            <Error mensaje={msgMutaActo} ></Error>
        ) : null}


            <div className="rounded-t-xl p-2 bg-gradient-to-r from-gray-50 to-gray-200">
                <div className="flex space-x-4">
                    
                    <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm">
                        <svg className="w-5 h-5" fill="none">
                                <ArrowSmLeftIcon className="w-6 cursor-pointer" />
                        </svg>
                    </div>
                    <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                            Fecha Actual: <span className="text-gray-200"> 09, Septiembre 2021</span>
                            <svg className="h-5 w-14" fill="none">
                                <CalendarIcon className="w-6" />
                            </svg>
                            Semana: <span className="text-gray-200"> 36</span>
                    </div>
                    <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm">
                    <svg className="w-5 h-5" fill="none">
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
                            Lun
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Mar
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Mier
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Jue
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Vier
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Sab
                        </th>


                    </tr>
                </thead>
                {
                    (acto != null) ? (

                        <tbody className="bg-white divide-y divide-gray-200">
                            {acto.map((list) => (
                                <tr key={list._id} className="text-left hover:bg-yellow-100">
                                    <td className="px-6 py-4 whitespace-nowrap capitalize text-sm" >
                                        <span className="bg-white font-bold"> { list.categoria.nomCate } </span>
                                        &nbsp;&nbsp;
                                        {list.nomActo}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="checkbox" id={list._id+"Lun"} onClick={ ()=>dialogCheck( list._id, 'Lunes', list._id+"Lun" )  }  />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="checkbox" id={list._id+"Mar"} onClick={ ()=>dialogCheck( list._id, 'Martes', list._id+"Mar" )  }  />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="checkbox" id={list._id+"Mier"} onClick={ ()=>dialogCheck( list._id, 'Miercoles', list._id+"Mier" )  }  />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="checkbox" id={list._id+"Jue"} onClick={ ()=>dialogCheck( list._id, 'Jueves', list._id+"Jue" )  }  />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="checkbox" id={list._id+"Vie"} onClick={ ()=>dialogCheck( list._id, 'Viernes', list._id+"Vie" )  }  />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="checkbox" id={list._id+"Sab"} onClick={ ()=>dialogCheck( list._id, 'Sabado', list._id+"Sab" )  }  />
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