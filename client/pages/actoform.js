import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid'

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';
import CategoriaContext from '../context/categoria/categoriaContext';
import ActoContext from '../context/acto/ActoContext';

//componentes UI
import Layout from '../components/layout/Layout';
import ActoForm from '../components/acto/ActoForm';
import SideBar from '../components/ui/SideBar';

const Actoform = () => {

    //Declaro mis useState 
    const [formval, setformval] = useState({
        categoria: '',
        nomActo: 'Ingrese Acto',
        desActo: 'Ingrese Descripción',
    });

    //Declaro Hook    
    //Redireccionar   
    const router = useRouter()

    //Forma de recibir parametros por get 
    let ListActo = [];
    const { id } = router.query
    let titulo = 'Crear';
    if (id) { titulo = 'Editar' }

    //Declaro Hooks -> UseContext para usar el state 
    //Acceder el stateContext  de Categoria 
    const valorContext = useContext(CategoriaContext);
    const { categoria } = valorContext;

    //Acceder el stateContext de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickID } = valorAuthContext;

    //Acceder el stateContext de ActoContext 
    const valorActoContext = useContext(ActoContext);
    const { crearActo, listarActo, editActo, msgMutaActo, mutaActo, acto } = valorActoContext;

    //Para poder iterarlo debes transformarlo en un arreglo ya que esta tipo objeto la categoria  
    ListActo =  acto;
    const datos = { nickID }

    //Declaration General Values  
    const contView = { viewEstadistica: false, viewForm: true, viewList: false, viewSemana: false }

    //Declaration UseState
    const [view, setView] = useState({});

    //Declaration UseContext


    //Declaration UseEffect
    useEffect(() => {
        setView(contView);
    }, []);



    return (
        <Layout>
            <div className="md:flex flex min-h-screen">

                <SideBar />

                <div className="md:w-3/5 xl:w-4/5 p-6">
                    <div className="flex justify-center mt-10">
                        <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                            <ActoForm view={view} />

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Actoform.propTypes = {
    /*  listarCategoria: PropTypes.func,
      mensajeList: PropTypes.string,
      nickEmail: PropTypes.string,
      nickID: PropTypes.string,
      categoria: PropTypes.object,
      ListCategoria: PropTypes.array,
      router:  PropTypes.object,
      */
};


export default Actoform;