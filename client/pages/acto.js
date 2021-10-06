//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { PencilIcon, ClipboardCheckIcon, PlusCircleIcon, ViewListIcon, CheckCircleIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import Error from '../components/ui/Error';
import SideBar from '../components/ui/SideBar';

//componentes Actos
import ActoEstadistica from '../components/acto/ActoEstadistica';
import ActoForm from '../components/acto/ActoForm';
import ActoList from '../components/acto/ActoList';
import ActoSemana from '../components/acto/ActoSemana';
import Load from '../components/ui/Load';


const Acto = () => {

    //Declaration General Values  
    const contView = { viewEstadistica: false, viewForm: false, viewList: true, viewSemana: false }

    //Declaration UseState
    const [view, setView] = useState({});

    //Declaration UseContext


    //Declaration UseEffect
    useEffect(() => {
        setView(contView);
    }, []);


    //Declaration General Function  
    //Method Description: 

    const clickEstadisticas = (contView) => {
        contView.viewEstadistica = true;
        contView.viewList = false;
        setView(contView);

    }

    //Method Description: 

    const clickForm = (contView) => {
        contView.viewForm = true;
        contView.viewList = false;
        setView(contView);

    }
    //Method Description: 

    const clickList = (contView) => {
        contView.viewList = true;
        setView(contView);
    }
    //Method Description: 
    const clickSemana = (contView) => {
        contView.viewSemana = true;
        contView.viewList = false;
        setView(contView);

    }

    //Method Description: 
    //Method Description: 
    //Method Description: 



    return (

        <Layout>
            <div className="md:flex flex min-h-screen">

                <SideBar />

                <div className="md:w-3/5 xl:w-4/5 p-6">

                    <div className="flex justify-center mt-10">
                        <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                            <div className="flex flex-col">
                                <label className="text-2xl font-bold text-yellow-500 " >Tus Actos </label>
                                <label className="text-xs font-bold text-gray-500 " >Un acto es una acción u obra que tu realizas, una forma facil y unica de alcanzar lo que deseas.</label>
                                <label className="text-xs font-bold text-gray-500 " >Los Actos te ayudan a mejorar, es mejor un paso firme a la vez, que correr sin rumbo, recuerda lo que puedes medir lo puedes mejorar</label>
                            </div>


                            <div className="flex flex-row justify-around">
                                <button title="Ver Listado de Actos" className="btn-yellow cursor-pointer w-full  text-center font-extrabold flex  rounded-full" onClick={() => { clickList(contView) }}>
                                    <ViewListIcon className="w-6 " /> Lista tus actos
                                </button>
                                <button title="Ver talero de semana Actual" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { clickForm(contView) }}>
                                    <PlusCircleIcon className="w-6 " /> Crea tus actos
                                </button>
                                <button title="Ver talero de semana Actual" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { clickSemana(contView) }}>
                                    <CheckCircleIcon className="w-6" /> Actos por Semana
                                </button>
                                <button title="Ver estadísticas" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { clickEstadisticas(contView) }}>
                                    <ClipboardCheckIcon className="w-6 " /> Evalua tus actos
                                </button>

                            </div>

                            <div className="flex flex-col mt-5 mb-5">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                            <ActoEstadistica view={view} />
                                            <ActoForm view={view} />
                                            <ActoList view={view} />
                                            <ActoSemana view={view} />

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

export default Acto;