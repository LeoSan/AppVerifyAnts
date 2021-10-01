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

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { listarActo, listarActoSemana, crearActoRegistroSemanal, acto, actoSemana, msgMutaActo, mutaActo } = valorActoContext;

    //Declaro Variable del Entorno 
    const alerta       = new Alerta();
    let   semanaActual = moment().week();
    let   semanaSig    = moment().add(1, 'w').week();
    let   semanaAtras  = moment().subtract(1, 'w').week();
    let   fechaAtual   = moment().format('MMMM Do YYYY');
    const datos        = { nickID, semanaActual }

    //Declaro UseEffect   
    useEffect(() => {
        listarActoSemana(datos);
    }, []);

    //Declaración de Metodos Funcionales
    //Metodo: Ventana Modal Check 
    const dialogCheck = async (acto, dia, checkedId) => {

        let formValues = undefined;
        let checked = false;
        let duracion = null;
        let nota = null;
        let semana = moment().week();

        console.log("checkedId", checkedId);

        if (document.getElementById(checkedId).checked) {
            checked = true;
            document.getElementById(checkedId).checked = true;
            formValues = await alerta.deployModal();
        } else {
            document.getElementById(checkedId).checked = false;
        }

        if (formValues != undefined) {
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
            checked: checked
        }
        //Envio de valores para el endpoint
        crearActoRegistroSemanal(data);

    }

    //Metodo: Consulta atras dias de la semana
    const consultaSemanaAtras = (semana, autor) => {

        console.log("Semana", semana);

    }

    //Metodo: Consulta siguiente dias de la semana
    const consultaSemanaSig = (semana, autor) => {
        console.log("Semana", semana);

    }


    if (view.viewSemana == false) { return null }

    return (
        <div className="flex flex-col">

            {msgMutaActo != null && mutaActo == false ? (
                <Error mensaje={msgMutaActo} ></Error>
            ) : null}


            <div className="rounded-t-xl p-2 bg-gradient-to-r from-gray-50 to-gray-200">
                <div className="flex space-x-4">

                    <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" onClick={() => { consultaSemanaAtras(semanaAtras, nickID) }}>
                        <svg className="w-5 h-5" fill="none">
                            <ArrowSmLeftIcon className="w-6" />
                        </svg>
                    </div>
                    <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                        <svg className="h-5 w-14" fill="none">
                            <CalendarIcon className="w-6" />
                        </svg>
                        Fecha Actual : &nbsp; <span className="text-gray-100"> {fechaAtual}</span>
                        <svg className="h-5 w-14" fill="none">
                            <CalendarIcon className="w-6" />
                        </svg>
                        Semana: &nbsp;<span className="text-gray-200"> {semanaActual} </span>
                    </div>
                    <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" onClick={() => { consultaSemanaSig(semanaSig, nickID) }}>
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
                    (actoSemana != null) ? (

                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                Object.keys(actoSemana).map((key) => (
                                    
                                    <tr key={actoSemana[key]._id} className="text-left hover:bg-yellow-100">
                                        <td className="px-6 py-4 whitespace-nowrap capitalize text-sm" >
                                            <span className="bg-yellow-200 font-bold rounded-md px-2">  { actoSemana[key].categoria.nomCate } </span>
                                            &nbsp;&nbsp;
                                            { actoSemana[key].nomActo}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" id={actoSemana[key]._id + "Lun"} onClick={() => dialogCheck(actoSemana[key]._id, 'Lunes', actoSemana[key]._id + "Lun")} checked={actoSemana[key].checkVals.lunes} onChange={e => {}}  />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" id={actoSemana[key]._id + "Mar"} onClick={() => dialogCheck(actoSemana[key]._id, 'Martes', actoSemana[key]._id + "Mar")}  checked={actoSemana[key].checkVals.martes} onChange={e => {}} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" id={actoSemana[key]._id + "Mier"} onClick={() => dialogCheck(actoSemana[key]._id, 'Miercoles', actoSemana[key]._id + "Mier")} checked={actoSemana[key].checkVals.miercoles}  onChange={e => {}}/>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" id={actoSemana[key]._id + "Jue"} onClick={() => dialogCheck(actoSemana[key]._id, 'Jueves', actoSemana[key]._id + "Jue")} checked={actoSemana[key].checkVals.jueves}  onChange={e => {}} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" id={actoSemana[key]._id + "Vie"} onClick={() => dialogCheck(actoSemana[key]._id, 'Viernes', actoSemana[key]._id + "Vie")} checked={actoSemana[key].checkVals.viernes} onChange={e => {}} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" id={actoSemana[key]._id + "Sab"} onClick={() => dialogCheck(actoSemana[key]._id, 'Sabado', actoSemana[key]._id + "Sab")}  checked={actoSemana[key].checkVals.sabado} onChange={e => {}}/>
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