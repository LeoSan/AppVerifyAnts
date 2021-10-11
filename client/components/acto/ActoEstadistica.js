import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

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


const ActoEstadistica = ({ view }) => {

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext  de Categoria 
    const valorContext = useContext(CategoriaContext);
    const { categoria = null } = valorContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { loadActo } = valorActoContext;




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
                        

                        <div class="h-16 rounded-md bg-gray-400 text-black flex items-center justify-center text-2xl font-extrabold">Grafica de Barras</div>
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
                        

                        <div class="h-16 rounded-md bg-gray-400 text-black flex items-center justify-center text-2xl font-extrabold"> Grafica de Github </div>
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
                        

                        <div class="h-16 rounded-md bg-gray-400 text-black flex items-center justify-center text-2xl font-extrabold"> Grafica de Torta </div>
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