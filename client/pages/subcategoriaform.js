//Importo Librerias 
import React, { useContext, useEffect, Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
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

const subcategoriaform = () => {

   //Declaro mis useState 
   const [formval, setformval] = useState({
      actividad: '',
      nomCate: 'Ingrese categoria',
      desCate: 'Ingrese Descripción',
   });

   //Declaro Hook    
   //Redireccionar   
   const router = useRouter()

   //Forma de recibir parametros por get 
   let ListSub = [];
   const { id } = router.query
   let titulo = 'Crear';
   if (id) { titulo = 'Editar' }

   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el stateContext  de Categoria 
   const valorContext = useContext(CategoriaContext);
   const { categoria = null } = valorContext;
   
   //Acceder el stateContext de SubCategoria  
   const valorSubcategoriaContext = useContext(SubcategoriaContext);
   const { crearSubCategoria, editSubCategoria, msgCrearSubCat, crearSubCat, subcategoria } = valorSubcategoriaContext;

   //Acceder el stateContext de auth 
   const valorAuthContext = useContext(AuthContext);
   const { nickID } = valorAuthContext;

   //Para poder iterarlo debes transformarlo en un arreglo ya que esta tipo objeto la categoria  
   ListSub  = subcategoria;

   //Metodos Funcionales Generales 

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

            if (id) {
               //state para Editar 
               formData.id = id;
               editSubCategoria(formData);

            } else {
               //Envio valores al state 
               crearSubCategoria(formData);

            }


         } catch (error) {
            console.log(error);
         }
      }
   });

   //Función: Permite encontrar que categoria editar 
   const getSubCategoriaId = (arreglo, id, formik) => {
      // console.log("Paso 1-> id->",id); //Paso 1-> id-> undefined
   
      
      if (id) {
         //Forma de buscar la seleccion //Aqui hay un error hay que meterle un condicional cuando el arreglo esta vacio 
         const result = arreglo.find(({ _id }) => _id === id);
         // Forma de extraer e incorporar en los campos del formulario 
         //console.log("result", result);
         setformval({
            actividad: result.categoria._id,
            nomCate: result.nomCate,
            desCate: result.desCate,
         })

         //Permite set select e input con el valor a editar    
         document.getElementById("categoria").value = result.categoria._id;
         document.getElementById("nomCate").value = result.nomCate;
         document.getElementById("desCate").value = result.desCate;

         //Inicializo el formik cuando es editar 
         formik.initialValues.categoria = result.categoria._id;
         formik.initialValues.nomCate = result.nomCate;
         formik.initialValues.desCate = result.desCate;
         return result;
      }
   }

   //Declaro UseEffect   
   //Metodo: Permite incorporar al campo de los formulario la categoria seleccionada    
   useEffect(() => {
      getSubCategoriaId(ListSub, id, formik);
   }, []);

   return (
      <Layout>
         <div className="md:flex flex min-h-screen">

            <SideBar />

            <div className="md:w-3/5 xl:w-4/5 p-6">
               <div className="flex justify-center mt-10">
                  <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                     <form className="mb-8" onSubmit={formik.handleSubmit}>
                        <label
                           className="text-2xl font-bold text-yellow-500 " >{titulo} Subcategoria </label>


                        <div className="mb-4">
                           <label
                              className="label-form" htmlFor="actividad">Tipo Categoria</label>
                           <select
                              id="categoria"
                              name="categoria"
                              className="input-form"
                              value={formik.categoria}
                              onChange={formik.handleChange}
                           >
                              <option value="0" > Seleccione </option>

                           {

                             !categoria ? null : categoria.map((list) => (
                                 <option key={list._id} value={list._id} > {list.nomCate} </option>
                              ))
                              
                           }

                           </select>
                        </div>

                        {formik.touched.categoria && formik.errors.categoria ? (
                           <Error mensaje={formik.errors.categoria} ></Error>
                        ) : null}

                        <div className="mb-4">
                           <label
                              className="label-form" htmlFor="nomCate">Nombre Subcategoria</label>
                           <input
                              id="nomCate"
                              name="nomCate"
                              type="text"
                              placeholder={formval.nomCate}
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
                              name="desCate"
                              type="text"
                              placeholder={formval.desCate}
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
                           value={titulo}
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

subcategoriaform.propTypes = {
   crearSubCategoria: PropTypes.func,
   getSubCategoriaId: PropTypes.func,
   editSubCategoria: PropTypes.func,
   formik:  PropTypes.object,
   formval:  PropTypes.object,
   valorContext:  PropTypes.object,
   valorSubcategoriaContext:  PropTypes.object,
   valorAuthContext:  PropTypes.object,
   msgCrearSubCat: PropTypes.string,
   nickID: PropTypes.string,
   crearSubCat: PropTypes.bool,
   subcategoria: PropTypes.array,
   categoria: PropTypes.array,
};

export default subcategoriaform;