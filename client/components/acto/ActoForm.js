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
import AuthContext from '../../context/auth/AuthContext';
import CategoriaContext from '../../context/categoria/categoriaContext';
import ActoContext from '../../context/acto/ActoContext';

//componentes UI
import Error from '../ui/Error';
import Success from '../ui/Success';

const Actoform = ({ view }) => {

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
  const { categoria  } = valorContext;

  //Acceder el stateContext de auth 
  const valorAuthContext = useContext(AuthContext);
  const { nickID } = valorAuthContext;

  //Acceder el stateContext de ActoContext 
  const valorActoContext = useContext(ActoContext);
  const { crearActo,listarActo, editActo,  msgMutaActo, mutaActo, acto } = valorActoContext;

  //Para poder iterarlo debes transformarlo en un arreglo ya que esta tipo objeto la categoria  
  ListActo = acto;
   const datos = { nickID }


  //Metodos Funcionales Generales 

  //Función: Esquema de validaciones 
  const formik = useFormik({
    initialValues: {
      nomActo: '',
      desActo: '',
      categoria: '',
      autor: nickID
    },
    validationSchema: Yup.object({
      nomActo: Yup.string()
        .min(5, "Nombre debe tener al menos 5 caracteres.")
        .required('El campo nombre es obligatorio.'),
      desActo: Yup.string()
        .min(10, "Descripción debe tener al menos 10 caracteres.")
        .required('El campo descripción es obligatorio.'),
      categoria: Yup.string()
        .required('El campo tipo categoria es obligatorio.'),
    }),

    onSubmit: formData => {
      try {

        if (id) {
          //state para Editar 
          formData.id = id;
          editActo(formData);

        } else {
          //state para Crear
          crearActo(formData);

        }

          //Luego que el usuario vea el mensaje refresco la lista 
          setTimeout(() => {
            listarActo(datos);  
          }, 10000);


      } catch (error) {
        console.log(error);
      }
    }
  });



    //Función: Permite encontrar que categoria editar 
    const getActoId = (arreglo, id, formik) => {
      // console.log("Paso 1-> id->",id); //Paso 1-> id-> undefined

         if (id) {
            //Forma de buscar la seleccion //Aqui hay un error hay que meterle un condicional cuando el arreglo esta vacio 
            const result = arreglo.find(({ _id }) => _id === id);
            // Forma de extraer e incorporar en los campos del formulario 
            //console.log("result", result);
            setformval({
                 categoria: result.categoria._id,
                 nomActo: 'Ingrese Acto',
                 desActo: 'Ingrese Descripción',
            })
     
            //Permite set select e input con el valor a editar    
            document.getElementById("categoria").value = result.categoria._id;
            document.getElementById("nomActo").value = result.nomActo;
            document.getElementById("desActo").value = result.desActo;
     
            //Inicializo el formik cuando es editar 
            formik.initialValues.categoria = result.categoria._id;
            formik.initialValues.nomActo = result.nomActo;
            formik.initialValues.desActo = result.desActo;
            return result;
         }
  }

  //Declaro UseEffect   
  //Metodo: Permite incorporar al campo de los formulario la categoria seleccionada    
  useEffect(() => {
      getActoId(ListActo, id, formik);
  }, []);





  //Valida y muestra interfaz 
  if (view.viewForm == false) { return null }

  return (
    <form className="mb-8" onSubmit={formik.handleSubmit}>
      <label
        className="text-2xl font-bold text-yellow-500 " >{titulo} Acto </label>


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
          className="label-form" htmlFor="nomActo">Nombre del Acto</label>
        <input
          id="nomActo"
          name="nomActo"
          type="text"
          placeholder={formval.nomActo}
          value={formik.nomActo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          className="input-form"
        />
      </div>

      {formik.touched.nomActo && formik.errors.nomActo ? (
        <Error mensaje={formik.errors.nomActo} ></Error>
      ) : null}

      <div className="mb-4">
        <label
          className="label-form" htmlFor="desActo">Descripción </label>
        <input
          id="desActo"
          name="desActo"
          type="text"
          placeholder={formval.desActo}
          value={formik.desActo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          className="input-form"

        />
      </div>

      {formik.touched.desActo && formik.errors.desActo ? (
        <Error mensaje={formik.errors.desActo} ></Error>
      ) : null}

      <input
        type="submit"
        className="btn-green cursor-pointer w-full mt-5"
        value={titulo}
      />
      
      {msgMutaActo != null && mutaActo == false ? (
        <Error mensaje={msgMutaActo} ></Error>
      ) : null}


      {msgMutaActo != null && mutaActo == true ? (
        <Success mensaje={msgMutaActo} ></Success>
      ) : null}



    </form>

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