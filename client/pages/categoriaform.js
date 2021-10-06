//Importo Librerias 
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from "prop-types";

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

const categoriaform = () => {
   //Declaro useState 

   const [formval, setformval] = useState({
      actividad:'',
      nomCate:'Ingrese categoria',
      desCate:'Ingrese Descripción',
  });  

   //Declaro Hook    
   //Redireccionar   
   const router = useRouter()

   //Forma de recibir parametros por get 
   let LisCate = [];
   const { id } = router.query
   let titulo = 'Crear';
   if (id) { titulo = 'Editar' }

   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(CategoriaContext);
   const { crearCategoria, editCategoria, msgCrearCat, msgEditCat, crearCat,  editaCat, categoria } = valorContext;

   //Para poder iterarlo debes transformarlo en un arreglo ya que esta tipo objeto la categoria  
   LisCate = categoria;

   //Acceder el state de auth 
   const valorAuthContext = useContext(AuthContext);
   const { nickID } = valorAuthContext;   

   //Objeto : Plugin Formik para gestionar las validaciones de formulario 
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
            if (id){
               //state para Editar 
               formData.id=id;
               editCategoria(formData);
            }else{
               //Envio valores al state 
               crearCategoria(formData);
            }

         } catch (error) {
            //genear dispath para manejo de errror 
            console.log(error);
         }
      }
   });

   //Metodos Funcionales Generales 

   //Función: Permite encontrar que categoria editar 
   const getCategoriaId = (categoria, id, formik) => {
     // console.log("Paso 1-> id->",id); //Paso 1-> id-> undefined
      if ( id ) {
         //Forma de buscar la seleccion 
         const result = categoria.find(({ _id }) => _id === id);
         // Forma de extraer e incorporar en los campos del formulario 
         setformval({
            actividad:result.actividad._id,
            nomCate:result.nomCate,
            desCate:result.desCate,
         })

         //Permite set select e input con el valor a editar    
         document.getElementById("actividad").value = result.actividad._id; ;
         document.getElementById("nomCate").value = result.nomCate; ;
         document.getElementById("desCate").value = result.desCate; ;

         //Inicializo el formik cuando es editar 
         formik.initialValues.actividad = result.actividad._id;
         formik.initialValues.nomCate = result.nomCate;
         formik.initialValues.desCate = result.desCate;

         return  result;    
         //Recordar Leonard no funciono tu idea primaria 
         //formik.actividad = result.actividad._id;
      }
   }


   //Ejecución de Metodo Dinamicos 
   //Metodo: Permite incorporar al campo de los formulario la categoria seleccionada    
       //Declaro UseEffect    
      useEffect(() => {
          getCategoriaId(LisCate, id, formik);
     }, []);
 

   


   //Metodo que al escribir  tiene que ir guardando // Mas como referencia no esta implementado 
   const editarCampo = (e, formik, titulo )=>{
         //Forma de pasar la e de eventos  No olvidar leo 
        // onChange={formik.handleChange, (e)=>{editarCampo(e, formik, titulo)}}
         editarBusqueda({
            ...editar,
           [e.target.name] : e.target.value
        });
   }//fin del evento 

   return (
      <Layout>
         <div className="md:flex flex min-h-screen">

            <SideBar />

            <div className="md:w-3/5 xl:w-4/5 p-6">
               <div className="flex justify-center mt-10">
                  <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                     <form className="mb-8 px-8" onSubmit={formik.handleSubmit}>
                        <label
                           className="text-2xl font-bold text-yellow-500 " >{titulo} Categoria </label>

                        <div className="mb-4">
                           <label
                              className="label-form" htmlFor="actividad">Tipo Actividad</label>
                           <select
                              id="actividad"
                              name="actividad"
                              className="input-form"
                              value={formik.actividad}
                              onChange={formik.handleChange}
                           >
                              <option value="0" selected> Seleccione </option>
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

                        {msgCrearCat != null && crearCat == false   ? (
                           <Error mensaje={msgCrearCat} ></Error>
                        ) : null}


                        { msgCrearCat != null  && crearCat != false  ? (
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

categoriaform.propTypes = {
    getCategoriaId: PropTypes.func,
    LisCate: PropTypes.array,
    msgCrearCat: PropTypes.string,
    crearCat: PropTypes.bool,
    router: PropTypes.object,
    formik:  PropTypes.object,
    valorContext:  PropTypes.object,
    valorAuthContext:  PropTypes.object,
    categoria:  PropTypes.object,
    crearCategoria:  PropTypes.object,
};

export default categoriaform;