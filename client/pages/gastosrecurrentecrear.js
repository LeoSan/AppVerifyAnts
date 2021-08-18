//Importo Librerias 
import React, { useContext, useEffect, Fragment, useState } from 'react';
import PropTypes from "prop-types";

//Importo componenentes 
import Layout from '../components/layout/Layout';

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import RecurrenteContext from '../context/recurrente/RecurrenteContext';
import AuthContext from '../context/auth/AuthContext';


//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar from '../components/ui/SideBar';

const gastosrecurrentecrear = () => {

   //Declaro mis useState 
   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(RecurrenteContext);
   const {crearRecurrencia, msgCrearRecu, crearRecu } = valorContext;   

   //Acceder el state de auth 
   const valorAuthContext = useContext(AuthContext);
   const { nickID, nickEmail } = valorAuthContext;
   
   //Declaro UseEffect   


  //Asignación de Valores 
  //Esto me permite controlar el arreglo con los valores del listado 


   //Metodos Funcionales 

   //Función : Para capturar el valor del captcha 

   //Función: Esquema de validaciones 
   const formik = useFormik({
      initialValues: {
         nomRecu: '',
         desRecu: '',
      },
      validationSchema: Yup.object({
         nomRecu: Yup.string()
            .required('El campo recurrencia es obligatorio.')   
            .min(5, "Nombre categoria debe tener al menos 5 caracteres."),
         desRecu: Yup.string()
            .min(5, "Descripción debe tener mas de 5 caracteres.")
            
      }),

      onSubmit: formData => {
         try {

            //console.log('Datos Formulario', formData);
            //Envio valores al state 
            crearRecurrencia(formData);

         } catch (error) {
            console.log(error);
         }
      }
   });


   return (
      <Layout>
         <div className="md:flex flex min-h-screen">
        
            <SideBar />          
        
            <div className="md:w-3/5 xl:w-4/5 p-6">
               <div className="flex justify-center mt-10">
                  <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                     <form className="mb-8" onSubmit={formik.handleSubmit}>
                        <label
                           className="text-2xl font-bold text-yellow-500 " >Crear Recurrencia </label>

                        <div className="mb-4">
                           <label
                                 className="label-form" htmlFor="nomRecu">Nombre Recurrencia</label>
                           <input
                              id="nomRecu"
                              type="text"
                              placeholder="Ingrese Recurrencia"
                              value={formik.nomRecu}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}

                              className="input-form"
                           />
                        </div>

                        {formik.touched.nomRecu && formik.errors.nomRecu ? (
                           <Error mensaje={formik.errors.nomRecu} ></Error>
                        ) : null}

                        <div className="mb-4">
                           <label
                              className="label-form" htmlFor="desRecu">Descripción </label>
                           <input
                              id="desRecu"
                              type="text"
                              placeholder="Ingrese Descripción"
                              value={formik.desRecu}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}

                              className="input-form"
                               
                           />
                        </div>

                        {formik.touched.desRecu && formik.errors.desRecu ? (
                           <Error mensaje={formik.errors.desRecu} ></Error>
                        ) : null}

                        <input
                           type="submit"
                           className="btn-green cursor-pointer w-full mt-5"
                           value="Crear Recurrencia"
                        />

                        {msgCrearRecu != null && crearRecu == false ? (
                           <Error mensaje={msgCrearRecu} ></Error>
                        ) : null}


                        {msgCrearRecu != null && crearRecu == true ? (
                           <Success mensaje={msgCrearRecu} ></Success>
                        ) : null}

                     </form>

                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}

gastosrecurrentecrear.propTypes = {
   crearRecurrencia: PropTypes.func,
   msgCrearRecu: PropTypes.string,
   crearRecu: PropTypes.bool,
   formik:  PropTypes.object,
};

export default gastosrecurrentecrear;