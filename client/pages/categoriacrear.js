//Importo Librerias 
import React, { useContext, useEffect, Fragment, useState } from 'react';

//Importo componenentes 
import Layout from '../components/layout/Layout';


//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import CategoriaContext from '../context/categoria/categoriaContext';
import AuthContext from '../context/auth/AuthContext';


//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar from '../components/ui/SideBar';

const categoriacrear = () => {

   //Declaro mis useState 

   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(CategoriaContext);
   const { crearCategoria, msgCrearCat, crearCat } = valorContext;   
   
   //Acceder el state de auth 
   const valorAuthContext = useContext(AuthContext);
   const { nickID } = valorAuthContext;

   //Metodos Funcionales 

   //función : Para capturar el valor del captcha 

   //función: Esquema de validaciones 
   const formik = useFormik({
      initialValues: {
         nomCate: '',
         desCate: '',
         actividad: '',
         autor: nickID
      },
      validationSchema: Yup.object({
         nomCate: Yup.string()
            .min(5, "Nombre categoria debe tener al menos 5 caracteres.")
            .required('El campo nombre es obligatorio.'),
         desCate: Yup.string()
            .min(10, "Descripción categoria debe tener al menos 10 caracteres.")
            .required('El campo descripción es obligatorio.'),
         actividad: Yup.string()
            .required('El campo tipo actividad es obligatorio.'),
      }),

      onSubmit: formData => {
         try {

            console.log('Datos Formulario', formData);
            //Envio valores al state 
            crearCategoria(formData);

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
                           className="text-2xl font-bold text-yellow-500 " >Crear Categoria </label>


                        <div className="mb-4">
                           <label
                                 className="label-form" htmlFor="actividad">Tipo Actividad</label>
                           <select
                              id="actividad"
                              className="input-form"
                              value={formik.actividad}
                              onChange={formik.handleChange}
                           >
                              <option > Seleccione </option>
                              <option value="6095819506be383f7cf49ce6" > AntVerify  </option>
                              <option value="60ae92dc3cb1ca2e14baeb8b" > ActivityVerify </option>
                           </select>
                        </div>

                        {formik.touched.actividad && formik.errors.actividad ? (
                           <Error mensaje={formik.errors.actividad} ></Error>
                        ) : null}

                        <div className="mb-4">
                           <label
                                 className="label-form" htmlFor="nomCate">Nombre Categoria</label>
                           <input
                              id="nomCate"
                              type="text"
                              placeholder="Ingrese categoria"
                              value={formik.nomCate}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}

                              className="input-form"
                           />
                        </div>

                        {formik.touched.nomCate && formik.errors.nomCate ? (
                           <Error mensaje={formik.errors.nomCate} ></Error>
                        ) : null}

                        <div className="mb-4">
                           <label
                              className="label-form" htmlFor="desCate">Descripción </label>
                           <input
                              id="desCate"
                              type="text"
                              placeholder="Ingrese Descripción"
                              value={formik.desCate}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}

                              className="input-form"
                               
                           />
                        </div>

                        {formik.touched.desCate && formik.errors.desCate ? (
                           <Error mensaje={formik.errors.desCate} ></Error>
                        ) : null}

                        <input
                           type="submit"
                           className="btn-green cursor-pointer w-full mt-5"
                           value="Crear Categoria"
                        />

                        {msgCrearCat != null && crearCat == false ? (
                           <Error mensaje={msgCrearCat} ></Error>
                        ) : null}


                        {msgCrearCat != null && crearCat != false ? (
                           <Success mensaje={msgCrearCat} ></Success>
                        ) : null}


                     </form>


                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}

categoriacrear.propTypes = {
   /* getValCapctha: PropTypes.func,
    valcaptcha: PropTypes.string,
    mensaje: PropTypes.string,
    confirmaRobot: PropTypes.bool,
    olvidoClave: PropTypes.bool,
    formik:  PropTypes.object,*/
};

export default categoriacrear;