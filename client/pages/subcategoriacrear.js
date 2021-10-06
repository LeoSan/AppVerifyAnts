//Importo Librerias 
import React, { useContext, useEffect, Fragment, useState } from 'react';

//Importo componenentes 
import Layout from '../components/layout/Layout';

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import CategoriaContext from '../context/categoria/categoriaContext';
import SubcategoriaContext from '../context/subcategoria/SubcategoriaContext';
import AuthContext from '../context/auth/AuthContext';


//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar from '../components/ui/SideBar';

const subcategoriacrear = () => {

   //Declaro mis useState 
   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(CategoriaContext);
   const { crearCategoria, msgCrearCat, crearCat, categoria } = valorContext;   
      
   //Acceder el state de auth 
   const valorSubcategoriaContext = useContext(SubcategoriaContext);
   const { crearSubCategoria, msgCrearSubCat, crearSubCat } = valorSubcategoriaContext;   
   
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
         nomCate: '',
         desCate: '',
         categoria: '',
         autor: nickID
      },
      validationSchema: Yup.object({
         nomCate: Yup.string()
            .min(5, "Nombre categoria debe tener al menos 5 caracteres.")
            .required('El campo nombre es obligatorio.'),
         desCate: Yup.string()
            .min(10, "Descripción categoria debe tener al menos 10 caracteres.")
            .required('El campo descripción es obligatorio.'),
         categoria: Yup.string()
            .required('El campo tipo categoria es obligatorio.'),
      }),

      onSubmit: formData => {
         try {

            console.log('Datos Formulario', formData);
            //Envio valores al state 
             crearSubCategoria(formData);

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
                           className="text-2xl font-bold text-yellow-500 " >Crear Subcategoria </label>


                        <div className="mb-4">
                           <label
                                 className="label-form" htmlFor="actividad">Tipo Categoria</label>
                           <select
                              id="categoria"
                              className="input-form"
                              value={formik.categoria}
                              onChange={formik.handleChange}
                           >
                              <option > Seleccione </option>

                                    {categoria.map((list) => (

                                       <option key={list._id} value={list._id} > { list.nomCate} </option>
                                    ))}

                           </select>
                        </div>

                        {formik.touched.categoria && formik.errors.categoria ? (
                           <Error mensaje={formik.errors.actividad} ></Error>
                        ) : null}

                        <div className="mb-4">
                           <label
                                 className="label-form" htmlFor="nomCate">Nombre Subcategoria</label>
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
                           value="Crear SubCategoria"
                        />

                        {msgCrearSubCat != null && crearSubCat == false ? (
                           <Error mensaje={msgCrearSubCat} ></Error>
                        ) : null}


                        {msgCrearSubCat != null && crearSubCat == true ? (
                           <Success mensaje={msgCrearSubCat} ></Success>
                        ) : null}


                     </form>


                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}

subcategoriacrear.propTypes = {
   /* getValCapctha: PropTypes.func,
    valcaptcha: PropTypes.string,
    mensaje: PropTypes.string,
    confirmaRobot: PropTypes.bool,
    olvidoClave: PropTypes.bool,
    formik:  PropTypes.object,*/
};

export default subcategoriacrear;