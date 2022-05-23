//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";

const Swal = require('sweetalert2');

//importar icon 
import { PlusCircleIcon, ViewListIcon, CheckCircleIcon, ChipIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import SideBar from '../components/ui/SideBar';

//Componentes patrimonio
import PatrimonioGeneralCard from '../components/patrimonio/patrimonioGeneralCard';
import Formulario from '../components/patrimonio/patrimonioForm';
import PatriminioList from '../components/patrimonio/patriminioList';
import PatrimonioEstadisticas from '../components/patrimonio/patrimonioEstadisticas';

const Patrimonio = () => {

    //Declaration General Values  
    const contView = { viewTablePatri: false, viewFormPatri: true, viewGeneralCard:false }

    //Declaration UseState
    const [view, setView] = useState({});

    //Declaration UseContext

    //Declaration UseEffect
    useEffect(() => {
        setView(contView);
    }, []);


    //Declaration General Function  

    //Method Description: 
    const viewListFormPatri = (contView) => {
        contView.viewTablePatri = false;
        contView.viewFormPatri = true;
        setView(contView);
    }


    //Method Description: 
    const viewGeneralCard = (contView) => {
        contView.viewGeneralCard = true;
        contView.viewFormPatri = false;
        setView(contView);
    }

    
    //Method Description: 
    const viewTableroEstadistico = (contView) => {
        contView.viewTablePatri = true;
        contView.viewFormPatri = false;
        setView(contView);
    }


    return (

        <Layout>
            <div className="md:flex flex min-h-screen">

                <SideBar />

                <div className="md:w-3/5 xl:w-4/5 p-6">

                    <div className="flex justify-center mt-10">
                        <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                            <div className="flex flex-row justify-around">
                                
                                <button title="Ver listado y formulario " className="btn-yellow cursor-pointer w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewListFormPatri(contView) }}>
                                    <ViewListIcon className="w-6 " /> Listado
                                </button>
                                <button title="Ver detalle general" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewGeneralCard(contView) }}>
                                    <ChipIcon className="w-6 " /> Detalle General
                                </button>
                                <button title="Ver tablero estadisticos" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewTableroEstadistico(contView) }}>
                                    <CheckCircleIcon className="w-6" /> Estadisticos
                                </button>

                            </div>

                            <div className="flex flex-col mt-5 mb-5">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                            <Formulario view={view}/>

                                            <PatriminioList view={view}/>
                                        
                                            <PatrimonioGeneralCard view={view}/>
                                            
                                            <PatrimonioEstadisticas view={view}/>

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

export default Patrimonio;