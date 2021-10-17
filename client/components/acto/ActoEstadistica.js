import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

import { Chart } from "react-google-charts";

//importar icon 
import { ArrowSmRightIcon, ArrowSmLeftIcon, CalendarIcon, BookOpenIcon, AdjustmentsIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import ActoContext from '../../context/acto/ActoContext';
import CategoriaContext from '../../context/categoria/categoriaContext';


//Importar UI 
import Alerta from '../../components/ui/Alerta';
import Error from '../../components/ui/Error';
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
    const { loadActo, listMeses, listSemana,  Meses, Semana } = valorActoContext;

    //Declaración de variables 
    let fechaAtual = moment().format('MMMM Do YYYY');
    let semanaActual = moment().week();

    //Declaro UseEffect   
    useEffect(() => {
         listMeses();
         listSemana();
    }, []);
    
    

    



    const dataBrra = [
        ["Categoria", "Tiempo(min)", { role: "style" }],
        ["Alma + Mente", 600, "color: #76A7FA"],
        ["Cripto", 1200, "color: #703525"],
        ["Profesional", 1500, "color: #008000"],
        ["Training", 2500, "color: #703593"],
        ["Proyectos", 1000, "color: #871B47"]
    ];

    const optionBarra = {
        title: 'Medición de Actos por categoria',
        chartArea: { width: '60%', height: "60%" },
        hAxis: {
            title: 'Tiempo (minutos)',
            minValue: 0,
        },
        vAxis: {
            title: 'Categotias',
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

                        <Filtros categoria={categoriaActos} semana={Semana} meses={Meses} idCate={'cateBarra'} idMes={'anioBarra'} idAnio={'anioBarra'} idSemana={'semBarra'} />

                        <Chart
                            chartType="BarChart"
                            data={dataBrra}
                            loader={<div>Loading Chart</div>}
                            options={optionBarra}
                        />

                    </div>
                </div>


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
                                Fecha :
                                <svg className="h-5 w-14" fill="none">
                                    <CalendarIcon className="w-6" />
                                </svg>
                                Semana:
                                <svg className="h-5 w-14" fill="none">
                                    <BookOpenIcon className="w-6" />
                                </svg>

                                <select
                                    id="categoriaBarra"
                                    name="categoriaBarra"
                                    className="rounded-md text-gray-700 text-center capitalize"
                                >
                                    <option value="0" selected> Categorias </option>
                                </select>

                            </div>
                            <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" >
                                <svg className="w-5 h-5" fill="none">
                                    <ArrowSmRightIcon className="w-6" />
                                </svg>
                            </div>
                        </div>


                        <div class=" flex items-center justify-center">
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    [
                                        { type: 'number', label: 'x' },
                                        { type: 'number', label: 'values' },
                                        { id: 'i0', type: 'number', role: 'interval' },
                                        { id: 'i1', type: 'number', role: 'interval' },
                                        { id: 'i2', type: 'number', role: 'interval' },
                                        { id: 'i2', type: 'number', role: 'interval' },
                                        { id: 'i2', type: 'number', role: 'interval' },
                                        { id: 'i2', type: 'number', role: 'interval' },
                                    ],
                                    [1, 100, 90, 110, 85, 96, 104, 120],
                                    [2, 120, 95, 130, 90, 113, 124, 140],
                                    [3, 130, 105, 140, 100, 117, 133, 139],
                                    [4, 90, 85, 95, 85, 88, 92, 95],
                                    [5, 70, 74, 63, 67, 69, 70, 72],
                                    [6, 30, 39, 22, 21, 28, 34, 40],
                                    [7, 80, 77, 83, 70, 77, 85, 90],
                                    [8, 100, 90, 110, 85, 95, 102, 110],
                                ]}
                                options={{
                                    title: 'Line intervals, default',
                                    curveType: 'function',
                                    lineWidth: 4,
                                    intervals: { style: 'line' },
                                    legend: 'none',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />

                        </div>
                    </div>
                </div>



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
                                Fecha :
                                <svg className="h-5 w-14" fill="none">
                                    <CalendarIcon className="w-6" />
                                </svg>
                                Semana:
                                <svg className="h-5 w-14" fill="none">
                                    <BookOpenIcon className="w-6" />
                                </svg>

                                <select
                                    id="categoriaBarra"
                                    name="categoriaBarra"
                                    className="rounded-md text-gray-700 text-center capitalize"
                                >
                                    <option value="0" selected> Categorias </option>
                                </select>

                            </div>
                            <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" >
                                <svg className="w-5 h-5" fill="none">
                                    <ArrowSmRightIcon className="w-6" />
                                </svg>
                            </div>
                        </div>


                        <div class=" flex items-center justify-center">
                            <Chart
                                width={'600px'}
                                height={'400px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['x', 'dogs', 'cats'],
                                    [0, 0, 0],
                                    [1, 10, 5],
                                    [2, 23, 15],
                                    [3, 17, 9],
                                    [4, 18, 10],
                                    [5, 9, 5],
                                    [6, 11, 3],
                                    [7, 27, 19],
                                ]}
                                options={{
                                    hAxis: {
                                        title: 'Time',
                                    },
                                    vAxis: {
                                        title: 'Popularity',
                                    },
                                    series: {
                                        1: { curveType: 'function' },
                                    },
                                }}
                                rootProps={{ 'data-testid': '2' }}
                            />

                        </div>
                    </div>
                </div>

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
                                Fecha :
                                <svg className="h-5 w-14" fill="none">
                                    <CalendarIcon className="w-6" />
                                </svg>
                                Semana:
                                <svg className="h-5 w-14" fill="none">
                                    <BookOpenIcon className="w-6" />
                                </svg>

                                <select
                                    id="categoriaBarra"
                                    name="categoriaBarra"
                                    className="rounded-md text-gray-700 text-center capitalize"
                                >
                                    <option value="0" selected> Categorias </option>
                                </select>

                            </div>
                            <div className="flex-none w-16 h-10 rounded-md bg-green-500 text-white text-2xl font-extrabold flex items-center justify-center cursor-pointer shadow-sm" >
                                <svg className="w-5 h-5" fill="none">
                                    <ArrowSmRightIcon className="w-6" />
                                </svg>
                            </div>
                        </div>


                        <div class=" flex items-center justify-center"> 
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                ['Task', 'Hours per Day'],
                                ['Work', 11],
                                ['Eat', 2],
                                ['Commute', 2],
                                ['Watch TV', 2],
                                ['Sleep', 7],
                                ]}
                                options={{
                                title: 'My Daily Activities',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />                        
                        
                        
                        </div>
                    </div>
                </div>




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