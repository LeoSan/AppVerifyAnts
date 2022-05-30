//Importo Librerias 
import React, { useContext, useEffect, Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
//Importo componenentes 
import Layout from '../../components/layout/Layout';

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import CategoriaContext from '../../context/categoria/categoriaContext';
import SubcategoriaContext from '../../context/subcategoria/SubcategoriaContext';
import AuthContext from '../../context/auth/AuthContext';


//componentes UI
import Error from '../../components/ui/Error';
import Success from '../../components/ui/Success';
import SideBar from '../../components/ui/SideBar';

const gastosForm = ({ view }) => {

  //Permite mostrar o ocultar el formulario 
  if (view.viewFormGasto == false) { return null }

     //Declaro mis useState 
     const [formval, setformval] = useState({
      nomGasto: 'Ingrese Nombre del gasto.',
      desGasto: 'Ingrese Descripción del gasto.',
   });
   
  //Declaro Hooks -> UseContext para usar el state 
   //Acceder el stateContext  de Categoria 
   const valorContext = useContext(CategoriaContext);
   const { categoriaGastos, listarCategoria} = valorContext;
   
   //Acceder el stateContext de SubCategoria  
   const valorSubcategoriaContext = useContext(SubcategoriaContext);
   const {subcategoria, listarSubCategoria } = valorSubcategoriaContext;

   //Acceder el stateContext de auth 
   const valorAuthContext = useContext(AuthContext);
   const { nickID, nickEmail } = valorAuthContext;
   //Para poder iterarlo debes transformarlo en un arreglo ya que esta tipo objeto la categoria  

   //Metodos Funcionales Generales 

   const listaSubCategorias =(e)=>{
    e.preventDefault();
    let id_catagoria = document.getElementById('categoria').value;

    const datos = {
      nomCate: nickEmail,
      autor: nickID,
      categoria: id_catagoria,
      activo: 1,
      tipo: "1-M-AC"
    }
    listarSubCategoria(datos);
   }

   //Función: Esquema de validaciones 
   const formik = useFormik({
      initialValues: {
        categoria: '', 
        subcategoria: '', 
        nomGasto: '',
        desGasto: '',
        montoGasto: '',
        registro:'', 
        usuario: nickID
      },
      validationSchema: Yup.object({
        categoria: Yup.string()
            .required('El campo tipo categoria es obligatorio.'),
        subcategoria: Yup.string()
            .required('El campo tipo subcategoria es obligatorio.'),
        nomGasto: Yup.string()
            .min(5, "Para nombrar tu gasto debe ser mas de 5 caracteres.")
            .required('El campo nombre es obligatorio.'),
        desGasto: Yup.string()
            .min(10, "Para describir tu gasto debe ser mas de 10 caracteres.")
            .required('El campo descripción es obligatorio.'),
            montoGasto: Yup.string()
            .required('El campo monto es obligatorio.'),        
        registro: Yup.string()
            .required('El campo fecha es obligatorio.'),

      }),

      onSubmit: formData => {
        
          console.log("entro");
      }
   });


   let datos = {
    nickEmail:nickEmail,
    nickID:nickID,
   }


  //Declaro UseEffect   
   //Metodo: Permite incorporar al campo de los formulario la categoria seleccionada    
   useEffect(() => {
    listarCategoria(datos);
 }, []);
  
  
  return (
    
          <div className="flex justify-center mt-10">
             <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                <form className="mb-8 px-8" onSubmit={formik.handleSubmit}>
                   <label
                      className="text-2xl font-bold text-yellow-500 "> Ingresar Gastos </label>


                   <div className="mb-4">
                      <label
                         className="label-form" htmlFor="actividad">Categoria</label>
                      <select
                         id="categoria"
                         name="categoria"
                         className="input-form"
                         value={formik.categoria}
                         onChange={(e)=>listaSubCategorias(e)}
                      >
                         <option value="0" > Seleccione </option>

                      {

                        !categoriaGastos ? null : categoriaGastos.map((list) => (
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
                         className="label-form" htmlFor="actividad">Sub-Categoria</label>
                      <select
                         id="subcategoria"
                         name="subcategoria"
                         className="input-form"
                         value={formik.subcategoria}
                         onChange={formik.handleChange}
                      >
                         <option value="0" > Seleccione </option>

                      {

                        !subcategoria ? null : subcategoria.map((list) => (
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
                         className="label-form" htmlFor="nomCate">Nombre del Gasto</label>
                      <input
                         id="nomGasto"
                         name="nomGasto"
                         type="text"
                         placeholder={formval.nomGasto}
                         value={formik.nomGasto}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}

                         className="input-form"
                      />
                   </div>

                   {formik.touched.nomGasto && formik.errors.nomGasto ? (
                      <Error mensaje={formik.errors.nomGasto} ></Error>
                   ) : null}

                   <div className="mb-4">
                      <label
                         className="label-form" htmlFor="nomCate">Describe el Gasto</label>
                      <input
                         id="desGasto"
                         name="desGasto"
                         type="text"
                         placeholder={formval.desGasto}
                         value={formik.desGasto}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}

                         className="input-form"
                      />
                   </div>

                   {formik.touched.desGasto && formik.errors.desGasto ? (
                      <Error mensaje={formik.errors.desGasto} ></Error>
                   ) : null}                   
                   
                   
                   <div className="mb-4">
                      <label
                         className="label-form" htmlFor="nomCate">Monto del Gasto</label>
                      <input
                         id="montoGasto"
                         name="montoGasto"
                         type="number"
                         placeholder={formval.montoGasto}
                         value={formik.montoGasto}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}

                         className="input-form"
                      />
                   </div>

                   {formik.touched.montoGasto && formik.errors.montoGasto ? (
                      <Error mensaje={formik.errors.montoGasto} ></Error>
                   ) : null}


                   <div className="mb-4">
                      <label
                         className="label-form" htmlFor="nomCate">Ingresa fecha del gasto</label>
                      <input
                         id="registro"
                         name="registro"
                         type="date"
                         placeholder={formval.registro}
                         value={formik.registro}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}

                         className="input-form"
                      />
                   </div>

                   {formik.touched.registro && formik.errors.registro ? (
                      <Error mensaje={formik.errors.registro} ></Error>
                   ) : null}

                 


                   <input
                   type="submit"
                   className="btn-green cursor-pointer w-full mt-5"
                   value="Ingresar Gasto"
                />

                </form>


             </div>
          </div>
  )
}

export default gastosForm;