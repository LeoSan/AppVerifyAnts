import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

import { Chart } from "react-google-charts";

//importar icon 
import { ArrowSmRightIcon, ArrowSmLeftIcon, CalendarIcon, DocumentReportIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import ActoContext from '../../context/acto/ActoContext';
import CategoriaContext from '../../context/categoria/categoriaContext';

//Importar UI 
import Load from '../../components/ui/Load';
import Filtros from '../../components/ui/Filtros';


const ActoEstadistica = ({ view }) => {

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext  de Categoria 
    const valorContext = useContext(CategoriaContext);
    const { categoriaActos = null } = valorContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { loadActo, loadClass, listMeses, listSemana, Meses, Semana, estadistica } = valorActoContext;

    //Declaración de variables 
    let fechaAtual = moment().format('MMMM Do YYYY');
    let semanaActual = moment().week();
    let sumTBitacora = 0;

    //Declaro UseEffect   
    useEffect(() => {
        listMeses();
        listSemana();
    }, []);

    //Modulo de Eventos

    //Instancias para las graficas 
    //Grafica de Barra -> 
    const optionBarra = {
        title: 'Medición de Habitos por Categoria',

        hAxis: {
            title: 'Tiempo (minutos)',
            minValue: 0,
        },
        vAxis: {
            title: 'Categorías',
        },
    }


    if (view.viewEstadistica == false) { return null }

    return (

        <div className="flex flex-col">

            {loadActo == true ? (
                <Load></Load>
            ) : null}

            <div class="relative overflow-hidden mx-5">

                <div class="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 my-5">
                    <div class="flex flex-col space-y-4">
                        <div className="flex space-x-4">

                            <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm">
                                <svg className="w-5 h-5" fill="none">
                                    <ArrowSmLeftIcon className="w-6" />
                                </svg>
                            </div>
                            <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                                <svg className="h-5 w-14" fill="none">
                                    <CalendarIcon className="w-6" />
                                </svg>
                                Fecha : &nbsp; {fechaAtual}
                                <svg className="h-5 w-14" fill="none">
                                    <CalendarIcon className="w-6" />
                                </svg>
                                Semana: &nbsp; {semanaActual}

                            </div>
                            <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" >
                                <svg className="w-5 h-5" fill="none">
                                    <ArrowSmRightIcon className="w-6" />
                                </svg>
                            </div>
                        </div>

                        <Filtros categoria={categoriaActos} semana={Semana} meses={Meses} idCate={'cateBarra'} idMes={'mesBarra'} idAnio={'anioBarra'} idSemana={'semBarra'} tipoEvento={'datosBarra'} />


                        {estadistica != null ? (

                            <div class=" flex items-center justify-center">
                                <Chart
                                    chartType="BarChart"
                                    width={'900px'}
                                    height={'400px'}
                                    data={estadistica.datoBarra}
                                    loader={<div>Caragando Grafica</div>}
                                    options={optionBarra}
                                />

                            </div>

                        ) : null}

                    </div>
                </div>


                <div class="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 my-5">
                    <div class="flex flex-col space-y-4">
                        <div className="flex space-x-4">

                            <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                                <svg className="h-5 w-14" fill="none">
                                    <DocumentReportIcon className="w-6" />
                                </svg>
                                Grafica de barra filtrado por Habitos

                            </div>
                        </div>

                        {estadistica != null ? (
                            <div class=" flex items-center justify-center">

                                <Chart
                                    chartType="BarChart"
                                    width={'900px'}
                                    height={'400px'}
                                    data={estadistica.datoBarraByCate}
                                    loader={<div>Loading Chart</div>}
                                    options={optionBarra}
                                />
                            </div>

                        ) : null}
                    </div>
                </div>

                <div class="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 my-5">
                    <div class="flex flex-col space-y-4">
                        <div className="flex space-x-4">

                            <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                                <svg className="h-5 w-14" fill="none">
                                    <DocumentReportIcon className="w-6" />
                                </svg>
                                Gráfica de pastel, midiendo en porcentaje el desempeño de tus habitos

                            </div>
                        </div>

                        {estadistica != null ? (
                            <div class=" flex items-center justify-center">

                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Caragando Grafica</div>}
                                    data={estadistica.datoPie}
                                    options={{
                                        title: 'Mis Habitos',
                                    }}
                                    rootProps={{ 'data-testid': '1' }}
                                />
                            </div>

                        ) : null}
                    </div>
                </div>

                <div class="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 my-5">
                    <div class="flex flex-col space-y-4">
                        <div className="flex space-x-4">

                            <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                                <svg className="h-5 w-14" fill="none">
                                    <DocumentReportIcon className="w-6" />
                                </svg>
                                Gráfica Lineales : Midiendo en año y meses.

                            </div>
                        </div>


                        {estadistica != null ? (
                            <div class=" flex items-center justify-center">

                                <Chart
                                    width={'700px'}
                                    height={'400px'}
                                    chartType="LineChart"
                                    loader={<div>Caragando Grafica</div>}
                                    data={estadistica.datoLinealMes}
                                    options={{
                                        title: 'Medición Mensuales',
                                        hAxis: {
                                            title: 'Tiempo',
                                        },
                                        vAxis: {
                                            title: 'Categorías',
                                        },
                                        series: {
                                            1: { curveType: 'function' },
                                        },
                                    }}
                                    rootProps={{ 'data-testid': '2' }}
                                />

                            </div>

                        ) : null}

                        {estadistica != null ? (
                            <div class=" flex items-center justify-center">
                                <Chart
                                    width={'700px'}
                                    height={'400px'}
                                    chartType="LineChart"
                                    loader={<div>Caragando Grafica</div>}
                                    data={estadistica.datoLinealAnio}
                                    options={{
                                        title: 'Medición Anuales',
                                        hAxis: {
                                            title: 'Tiempo',
                                        },
                                        vAxis: {
                                            title: 'Categorías',
                                        },
                                        series: {
                                            1: { curveType: 'function' },
                                        },
                                    }}
                                    rootProps={{ 'data-testid': '2' }}
                                />
                            </div>

                        ) : null}

                    </div>
                </div>

                {estadistica != null ? (    
                
                <div class="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 my-5">
                    <div class="flex flex-col space-y-4">
                        <div className="flex space-x-4">

                            <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
                                <svg className="h-5 w-14" fill="none">
                                    <DocumentReportIcon className="w-6" />
                                </svg>
                                Bitácora
                            </div>
                        </div>


                        <table className="min-w-full divide-y divide-gray-200 " >
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="pr-2 bg-green-500 text-center text-xs  text-white font-bold uppercase tracking-wider"
                                    >
                                        Habito
                                    </th>
                                    <th
                                        scope="col"
                                        className="pr-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Fecha
                                    </th>

                                    <th
                                        scope="col"
                                        className="pr-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Semana 
                                    </th>
                                    <th
                                        scope="col"
                                        className="pr-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Duración
                                    </th>
                                    <th
                                        scope="col"
                                        className="pr-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Nota
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                            {
                                
                                Object.keys(estadistica.datoBitacora).map((key) => (                                
                            
                                    <tr className="text-left hover:bg-yellow-100">
                                        <td className="pr-2 whitespace-nowrap capitalize text-sm" >
                                            <span className="text-xs bg-yellow-200 font-bold rounded-md px-2">   {estadistica.datoBitacora[key].categoria.nomCate}  </span>
                                            &nbsp;&nbsp;
                                            {estadistica.datoBitacora[key].acto.nomActo}
                                        </td>

                                        <td className="pr-2 text-xs text-center">
                                            { 
                                                moment(estadistica.datoBitacora[key].registro.replace(/-/g, '\/').replace(/T.+/, '')).format('MMM Do YYYY')
                                                
                                            }
                                        </td>
                                        <td className="pr-2 text-xs text-center">
                                            {estadistica.datoBitacora[key].semana}
                                        </td>                                    
                                        <td className="pr-2 text-xs text-center">
                                            {
                                                estadistica.datoBitacora[key].duracion 
                                            } - Min.
                                        </td>
                                        <td className="pr-2 font-semibold text-xs text-justify ">
                                            
                                                {estadistica.datoBitacora[key].nota}       
                                            
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                ) : null}


            </div>
        </div>
    );
}

ActoEstadistica.propTypes = {
    /*  listarCategoria: PropTypes.func,
      mensajeList: PropTypes.string,
      nickEmail: PropTypes.string,
      nickID: PropTypes.string,
      categoria: PropTypes.object,
      ListCategoria: PropTypes.array,
      router:  PropTypes.object,
      */
};

export default ActoEstadistica;