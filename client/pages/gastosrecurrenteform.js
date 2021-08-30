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
import RecurrenteContext from '../context/recurrente/RecurrenteContext';
import AuthContext from '../context/auth/AuthContext';


//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar from '../components/ui/SideBar';

const gastosrecurrenteform = () => {

   //Declaro mis useState 
   const [formval, setformval] = useState({
      nomRecu: 'Ingrese nombre recurrencia',
      desRecu: 'Ingrese Descripción',
   });


   //Declaro Hook    
   //Redireccionar   
   const router = useRouter()

   //Forma de recibir parametros por get 
   let ListRecu = [];
   const { id } = router.query
   let titulo = 'Crear';
   if (id) { titulo = 'Editar' }

   //Declaro mis useState 
   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(RecurrenteContext);
   const {crearRecurrencia, editRecurrente,  msgCrearRecu, crearRecu, recurrente } = valorContext;   

   //Acceder el state de auth 
   const valorAuthContext = useContext(AuthContext);
   const { nickID, nickEmail } = valorAuthContext;
   
   //Para poder iterarlo debes transformarlo en un arreglo ya que esta tipo objeto la categoria  
   ListRecu = recurrente;

  
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

            if (id) {
                 //state para Editar 
                 formData.id = id;
                 editRecurrente(formData);

            }else{
               //console.log('Datos Formulario', formData);
               //Envio valores al state 
               crearRecurrencia(formData);
            }


         } catch (error) {
            console.log(error);
         }
      }
   });

   //Metodos Funcionales Generales    

   //Función: Permite encontrar que categoria editar 
   const getRecurrenteId = (arreglo, id, formik) => {
       console.log("arreglo 1-> id->",arreglo); //Paso 1-> id-> undefined
      if (id) {
         //Forma de buscar la seleccion //Aqui hay un error hay que meterle un condicional cuando el arreglo esta vacio 
         const result = arreglo.find(({ _id }) => _id === id);
         // Forma de extraer e incorporar en los campos del formulario 
         setformval({
            nomRecu: result.nomRecu,
            desRecu: result.desRecu,
         })
         //Permite set select e input con el valor a editar    
         document.getElementById("nomRecu").value = result.nomRecu;
         document.getElementById("desRecu").value = result.desRecu;
         //Inicializo el formik cuando es editar 
         formik.initialValues.nomRecu = result.nomRecu;
         formik.initialValues.desRecu = result.desRecu;

         return result;
      }
   }

   //Declaro UseEffect   
   //Metodo: Permite setear los campos con el valor id 
   useEffect(() => {
      getRecurrenteId(ListRecu, id, formik);
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
                           className="text-2xl font-bold text-yellow-500 " >{titulo} Recurrencia </label>

                        <div className="mb-4">
                           <label
                                 className="label-form" htmlFor="nomRecu">Nombre Recurrencia</label>
                           <input
                              id="nomRecu"
                              name="nomRecu"
                              type="text"
                              placeholder={formval.nomRecu}
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
                              name="desRecu"
                              type="text"
                              placeholder={formval.desRecu}
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
                           value={titulo}
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

gastosrecurrenteform.propTypes = {
   crearRecurrencia: PropTypes.func,
   msgCrearRecu: PropTypes.string,
   crearRecu: PropTypes.bool,
   formik:  PropTypes.object,
};

export default gastosrecurrenteform;