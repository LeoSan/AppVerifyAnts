//Importar Librerias React 
import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar from '../components/ui/SideBar';

const Categoria = () => {

    //Declaro useState 


    //Declaro UseContext  


    //Declaro UseEffect   


    //Metodos Funcionales 

    //función : 
    //función : 
    //función : 

    return (
        <Layout>
            <div className="md:flex flex min-h-screen">
                <SideBar />
                <div className="md:w-3/5 xl:w-4/5 p-6">

                    <div className="flex justify-center mt-10">
                        <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                            <label className="text-2xl font-bold text-yellow-500 " >Listado de Tus Categorias</label>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Categoria.propTypes = {
    // getValCapctha: PropTypes.func,
    // valcaptcha: PropTypes.string,
    // mensaje: PropTypes.string,
    // confirmaRobot: PropTypes.bool,
    // olvidoClave: PropTypes.bool,
    // formik:  PropTypes.object,
};

export default Categoria;