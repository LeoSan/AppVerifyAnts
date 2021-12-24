//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';

//Librerias datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { PlusCircleIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import CategoriaContext from '../../context/categoria/categoriaContext';
import PatrimonioContext from '../../context/patrimonio/PatrimonioContext';

//componentes Patrimonio
import Error from '../ui/Error';
import Success from '../ui/Success';

const PatrimonioForm = () => {


    //Declaro UseContext 
    //Acceder el state de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickEmail, nickID } = valorAuthContext;

    //Acceder el state de Categoria 
    const valorContext = useContext(CategoriaContext);
    const {  listarCategoria, categoriaGastos } = valorContext;
    
    //Acceder el state de Patrimonio 
    const valorPatrimonioContext = useContext(PatrimonioContext);
    const {  listarPatrimonio, crearPatrimonio, msgCrear, crearPatri } = valorPatrimonioContext;


    //Declaración Variables
    const datos = { nickID, nickEmail }

    //Declaro UseEffect    
    useEffect(() => {
        listarCategoria(datos);
    }, []);
    

    const [startDate, setStartDate] = useState(new Date());

    //Objeto : Plugin Formik para gestionar las validaciones de formulario 
    const formik = useFormik({
        initialValues: {
        nomPatrimonio:   '',
        desPatrimonio:   '',
        montoPatrimonio: '',
        usuario:    nickID,
        categoria:  '',
        tipoActivo: '',
        },
        validationSchema: Yup.object({
            nomPatrimonio: Yup.string()
            .min(5, "Nombre debe tener al menos 5 caracteres.")
            .required('El campo nombre es obligatorio.'),
        desPatrimonio: Yup.string()
            .min(10, "Descripción debe tener al menos 10 caracteres.")
            .required('El campo descripción es obligatorio.'),        
        montoPatrimonio: Yup.number()
            .typeError("Debe ser un número")
            .required('El campo monto es obligatorio.'),
        categoria: Yup.string()
            .required('El campo categoria es obligatorio.'), 
        tipoActivo: Yup.string()
            .required('El campo tipo activo es obligatorio.'),
        }),

        onSubmit: formData => {
            
            let fechaC = document.querySelector("#fechaCompra").value;
            const data = {...formData, fechaCompra:fechaC }
            
            crearPatrimonio(data);

        }
    });


    return (

        <form className="mb-8 px-1" onSubmit={formik.handleSubmit}>
        <label
           className="text-2xl font-bold text-yellow-500 "> Lista tus Activos </label>

        <div class="grid grid-cols-7 gap-4 ">
           <div class="p-2">
                <label className="label-form" htmlFor="categoria">Categoria</label>
                <select
                    id="categoria"
                    name="categoria"
                    className="input-form"
                    value={formik.categoria}
                    onChange={formik.handleChange}
                >
                <option value="0" > Seleccione </option>

                {
      
                  !categoriaGastos ? null : categoriaGastos.map((list) => (
                    <option key={list._id} value={list._id} > {list.nomCate} </option>
                  ))
      
                }
                </select>
           
           </div>
           <div class="p-2 ">

                <label
                    className="label-form" htmlFor="nomCate">Patrimimonio</label>
                <input
                    id="nomPatrimonio"
                    name="nomPatrimonio"
                    type="text"
                    value={formik.nomPatrimonio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                    className="input-form"
                />
           
           </div>
           <div class="p-2 ">
           
                <label
                    className="label-form" htmlFor="desPatrimonio">Descripción</label>
                <input
                    id="desPatrimonio"
                    name="desPatrimonio"
                    type="text"
                    value={formik.desPatrimonio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="input-form"

                />           
           
           </div>
           <div class="p-2 ">
                <label
                    className="label-form" htmlFor="montoPatrimonio">Monto: </label>
                <input
                    id="montoPatrimonio"
                    name="montoPatrimonio"
                    type="text"
                    value={formik.montoPatrimonio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="input-form"

                />           
           </div>           
           <div class="p-2 ">
                <label
                    className="label-form" htmlFor="fechaCompra">Fecha: </label>
                    <DatePicker
                    id='fechaCompra'
                    className="input-form"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={10}
                    scrollableYearDropdown
                    showWeekNumbers
                    
                  />
           </div>
           <div className="p-2">
                 <label className="label-form" htmlFor="tipoActivo">Tipo Activo</label>
                <select
                    id="tipoActivo"
                    name="tipoActivo"
                    className="input-form"
                    value={formik.tipoActivo}
                    onChange={formik.handleChange}
                >
                    <option value="0" selected> Seleccione </option>
                    <option value="liquido" > Liquido  </option>
                    <option value="no_liquido" > No Liquido </option>
                </select>
            </div>           

           <div class="p-2 ">
                
            <button type="submit" title="Registro Patrimonio" className="btn-yellow-circle  mt-6">
              <PlusCircleIcon className="w-9" /> 
            </button>
           
           </div>

        </div>
        


        {formik.touched.categoria && formik.errors.categoria ? (
           <Error mensaje={formik.errors.categoria} ></Error>
        ) : null}        
        
        
        {formik.touched.tipoActivo && formik.errors.tipoActivo ? (
           <Error mensaje={formik.errors.tipoActivo} ></Error>
        ) : null}


        {formik.touched.nomPatrimonio && formik.errors.nomPatrimonio ? (
           <Error mensaje={formik.errors.nomPatrimonio} ></Error>
        ) : null}


        {formik.touched.desPatrimonio && formik.errors.desPatrimonio ? (
           <Error mensaje={formik.errors.desPatrimonio} ></Error>
        ) : null}        


        {formik.touched.montoPatrimonio && formik.errors.montoPatrimonio ? (
           <Error mensaje={formik.errors.montoPatrimonio} ></Error>
        ) : null}        
        
        {msgCrear != null && crearPatri == false ? (
           <Error mensaje={msgCrear} ></Error>
        ) : null}

        { msgCrear != null  && crearPatri != false  ? (
            <Success mensaje={msgCrear} ></Success>
         ) : null}



     </form>
    );
}

export default PatrimonioForm;