//Importar librerias 
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from "prop-types";

//importar icon 
import { ArrowSmRightIcon, ArrowSmLeftIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import ActoContext from '../../context/acto/ActoContext';
import CategoriaContext from '../../context/categoria/categoriaContext';

//Importar UI 
import Alerta from '../../components/ui/Alerta';
import Error from '../../components/ui/Error';
import Load from '../../components/ui/Load';

const ActoSemana = ({ view }) => {

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext  de Categoria 
    const valorContext = useContext(CategoriaContext);
    const { categoriaActos = null } = valorContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { listarActo, listarActoSemana, crearActoRegistroSemanal, cambioLoad, cambioLoadOFF, acto, actoSemana, msgMutaActo, mutaActo, loadActo, loadClass } = valorActoContext;

    //Declaro Variable del Entorno 
    const alerta = new Alerta();
    let semanaActual = moment().week();
    //let   semaSig    = moment().add(1, 'w').week();
    //let   semAtras  = moment().subtract(1, 'w').week();    
    let fechaAtual = moment().format('MMMM Do YYYY');
    let datos = { nickID, semana: semanaActual, categoria: null, tipo: "1-M" }

    const [auxSemana, setAuxSemana] = useState(semanaActual);
    const [valorSelect, setvalorSelect] = useState(0);

    //Declaro UseEffect   
    useEffect(() => {
        cambioLoad();
        listarActoSemana(datos);
    }, []);

    //Declaración de Metodos Funcionales
    //Metodo: Ventana Modal Check 
    const dialogCheck = async (acto, dia, checkedId, auxSemana, categoriaid) => {
        cambioLoad();



        let formValues = undefined;
        let checked = false;
        let duracion = null;
        let nota = null;
        let valCancel = true; // Evaluo si dio clic en el boton cancelar

        if (document.getElementById(checkedId).checked) {
            checked = true;
            document.getElementById(checkedId).checked = true;
            formValues = await alerta.deployModal();
            valCancel = false;
            if (formValues == undefined) {
                valCancel = true;
                cambioLoadOFF();
            }

        } else {
            document.getElementById(checkedId).checked = false;
            valCancel = false;
        }

        //Capturo valores desde el Modal 
        if (formValues != undefined) {
            duracion = formValues[0];
            nota = formValues[1];
        }

        if (valCancel != true) {//Solo entra si no le dio al boton cancelar 
            const data = { autor: nickID, acto: acto, duracion: duracion, nota: nota, dia: dia, semana: auxSemana, checked: checked, categoria: categoriaid }

            //Guardo Datos
            crearActoRegistroSemanal(data);

            //Recargo Listado 
            datos = { nickID, semana: auxSemana, categoria: valorSelect, tipo: (valorSelect == 0) ? "1-M" : "1-MC" } //Debo ir al state y cambiar semana 
            listarActoSemana(datos);

            //Audio 
            //var audio = new Audio('https://assets.coderrocketfuel.com/pomodoro-times-up.mp3');
            var audio = new Audio('/static/audio/new-ticket.mp3');
            audio.play();
        }


    }

    //Metodo: Consulta atras dias de la semana
    const consultaSemanaAtras = (e, semana) => {
        e.preventDefault();
        cambioLoad();
        setAuxSemana(eval(semana - 1));
        datos = { nickID, semana: semana - 1, categoria: valorSelect, tipo: (valorSelect == 0) ? "1-M" : "1-MC" }
        //Listado 
        listarActoSemana(datos);
    }

    //Metodo: Consulta siguiente dias de la semana
    const consultaSemanaSig = (e, semana) => {
        e.preventDefault();
        cambioLoad();
        setAuxSemana(eval(semana + 1));
        datos = { nickID, semana: semana + 1, categoria: valorSelect, tipo: (valorSelect == 0) ? "1-M" : "1-MC" }
        //Listado         
        listarActoSemana(datos);

    }

    const filtrarCategoria = (e) => {
        e.preventDefault();
        cambioLoad();
        let select = document.getElementById("categoria");
        setvalorSelect(select.value);

        datos = { nickID, semana: auxSemana, categoria: select.value, tipo: (select.value == 0) ? "1-M" : "1-MC" }
        //Listado         
        //console.log(datos);
        listarActoSemana(datos);

    }


    if (view.viewSemana == false) { return null }

    return (
        <div className="flex flex-col">

            {msgMutaActo != null && mutaActo == false ? (
                <Error mensaje={msgMutaActo} ></Error>
            ) : null}


            {loadActo == true ? (
                <Load></Load>
            ) : null}


            <div class="relative overflow-hidden mx-5">

                <div class="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 my-5">
                    <div className="flex space-x-4">

                        <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" onClick={(e) => { consultaSemanaAtras(e, auxSemana) }}>
                            <svg className="w-5 h-5" fill="none">
                                <ArrowSmLeftIcon className="w-6" />
                            </svg>
                        </div>
                        <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                            <svg className="h-5 w-14" fill="none">
                                <CalendarIcon className="w-6" />
                            </svg>
                            Fecha : &nbsp; <span className="text-gray-100"> {fechaAtual}</span>
                            <svg className="h-5 w-14" fill="none">
                                <CalendarIcon className="w-6" />
                            </svg>
                            Semana: &nbsp;<span className="text-gray-200"> {auxSemana} </span>
                            <svg className="h-5 w-14" fill="none">
                                <BookOpenIcon className="w-6" />
                            </svg>

                            <select
                                id="categoria"
                                name="categoria"
                                className="rounded-md text-gray-700 text-center capitalize"
                                value={valorSelect}
                                onChange={e => { filtrarCategoria(e) }}

                            >
                                <option value="0" selected> Categorias </option>

                                {
                                    !categoriaActos ? null : categoriaActos.map((list) => (
                                        <option key={list._id} value={list._id} > {list.nomCate} </option>
                                    ))

                                }
                                <option value="0" className="bg-yellow-400"> Todos </option>
                            </select>


                        </div>
                        <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" onClick={(e) => { consultaSemanaSig(e, auxSemana) }}>
                            <svg className="w-5 h-5" fill="none">
                                <ArrowSmRightIcon className="w-6" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={loadClass} >
                
                <div className="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 my-5" >
                    <table className="min-w-full divide-y divide-gray-200 " >
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 bg-green-500 text-center text-xs  text-white font-bold uppercase tracking-wider"
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
                                                    <span className="bg-yellow-200 font-bold rounded-md px-2">  {actoSemana[key].categoria} </span>
                                                    &nbsp;&nbsp;
                                                    {actoSemana[key].nomActo}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input type="checkbox" id={actoSemana[key]._id + "Lun"} onClick={() => dialogCheck(actoSemana[key]._id, 'Lunes', actoSemana[key]._id + "Lun", auxSemana, actoSemana[key].categoriaid)} checked={actoSemana[key].checkVals.lunes} onChange={e => { }} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input type="checkbox" id={actoSemana[key]._id + "Mar"} onClick={() => dialogCheck(actoSemana[key]._id, 'Martes', actoSemana[key]._id + "Mar", auxSemana, actoSemana[key].categoriaid)} checked={actoSemana[key].checkVals.martes} onChange={e => { }} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input type="checkbox" id={actoSemana[key]._id + "Mier"} onClick={() => dialogCheck(actoSemana[key]._id, 'Miercoles', actoSemana[key]._id + "Mier", auxSemana, actoSemana[key].categoriaid)} checked={actoSemana[key].checkVals.miercoles} onChange={e => { }} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input type="checkbox" id={actoSemana[key]._id + "Jue"} onClick={() => dialogCheck(actoSemana[key]._id, 'Jueves', actoSemana[key]._id + "Jue", auxSemana, actoSemana[key].categoriaid)} checked={actoSemana[key].checkVals.jueves} onChange={e => { }} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input type="checkbox" id={actoSemana[key]._id + "Vie"} onClick={() => dialogCheck(actoSemana[key]._id, 'Viernes', actoSemana[key]._id + "Vie", auxSemana, actoSemana[key].categoriaid)} checked={actoSemana[key].checkVals.viernes} onChange={e => { }} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input type="checkbox" id={actoSemana[key]._id + "Sab"} onClick={() => dialogCheck(actoSemana[key]._id, 'Sabado', actoSemana[key]._id + "Sab", auxSemana, actoSemana[key].categoriaid)} checked={actoSemana[key].checkVals.sabado} onChange={e => { }} />
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
    );
}

ActoSemana.propTypes = {
    dialogCheck: PropTypes.func,
    consultaSemanaAtras: PropTypes.func,
    consultaSemanaSig: PropTypes.func,
    filtrarCategoria: PropTypes.func,
    /*  mensajeList: PropTypes.string,
      nickEmail: PropTypes.string,
      nickID: PropTypes.string,
      categoria: PropTypes.object,
      ListCategoria: PropTypes.array,
      router:  PropTypes.object,
      */
};

export default ActoSemana;