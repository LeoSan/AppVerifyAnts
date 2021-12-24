//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";

const Swal = require('sweetalert2');

//importar icon 
import { PlusCircleIcon, ViewListIcon, CheckCircleIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import SideBar from '../components/ui/SideBar';

//componentes Patrimonio
import ActoSemana from '../components/acto/ActoSemana';
import Formulario from '../components/patrimonio/patrimonioForm';
import PatriminioList from '../components/patrimonio/patriminioList';


const Patrimonio = () => {

    //Declaration General Values  
    const contView = { viewTablePatri: false, viewFormPatri: false, viewListPatri:true }

    //Declaration UseState
    const [view, setView] = useState({});

    //Declaration UseContext

    //Declaration UseEffect
    useEffect(() => {
        setView(contView);
    }, []);


    //Declaration General Function  
    //Method Description: 

    const clickViewTablePatri = (contView) => {
        contView.viewTablePatri = true;
        contView.viewFormPatri = false;
        setView(contView);

    }

    //Method Description: 

    const clickViewFormPatri = (contView) => {
        contView.viewTablePatri = false;
        contView.viewFormPatri = true;
        setView(contView);

    }
    //Method Description: 

    const viewListPatri = (contView) => {
        contView.viewListPatri = true;
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
                                <button title="Ver Listado de Actos" className="btn-yellow cursor-pointer w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewListPatri(contView) }}>
                                    <ViewListIcon className="w-6 " /> Listado
                                </button>
                                <button title="Ver talero de semana Actual" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { clickViewFormPatri(contView) }}>
                                    <PlusCircleIcon className="w-6 " /> Genera
                                </button>
                                <button title="Ver talero de semana Actual" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { clickViewTablePatri(contView) }}>
                                    <CheckCircleIcon className="w-6" /> Tablero
                                </button>

                            </div>

                            <div className="flex flex-col mt-5 mb-5">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                        <Formulario/>

                                        <PatriminioList/>


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