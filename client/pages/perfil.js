//Importo Librerias 
import React, {useContext, useEffect, Fragment, useState} from 'react';
import {  UserCircleIcon,CogIcon } from '@heroicons/react/solid'

//Importo componenentes 
import Layout from '../components/layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import UsuarioContext from '../context/usuario/usuarioContext';
import AuthContext    from '../context/auth/AuthContext';


//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar   from '../components/ui/SideBar'; 

const perfil = () => {

   //Declaro mis useState 
   const [valcaptcha, setvalcaptcha]        = useState(0);
   const [confirmaRobot, setconfirmaRobot]  = useState(true);
   const [valLogin, setvalLogin]            = useState(false);

//Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(UsuarioContext);
   const { editarUsuario, mensaje, editado } =  valorContext;   

   const  valorContextAuth = useContext(AuthContext);
   const { ninkName, nickEmail } =  valorContextAuth; 

   //Declaro Variables 
  
       
   //Metodos Funcionales 

   //función : Para capturar el valor del captcha 
   function getValCapctha(value) {
      setvalcaptcha(value);
      console.log("Captcha value:", value);
    }

    //función: Esquema de validaciones 
    const formik =useFormik({
      initialValues:{
              nombre:ninkName,
              apellido:'',
              fecha:'',
              sexo:'',
              pais:'',
      },
      validationSchema:Yup.object({
                           
               nombre:Yup.string()
                      .min(5, "Tu nombre debe tener al menos 5 caracteres.")
                      .required('El campo nombre es obligatorio.'),                         
               apellido:Yup.string()
                      .min(5, "Tu Apellido debe tener al menos 5 caracteres.")
                      .required('El campo nombre es obligatorio.'),                         
                fecha:Yup.string()
                      .required('El campo fecha  es obligatorio.'),                 
                sexo:Yup.string()
                      .required('El campo Sexo  es obligatorio.'),                 
                pais:Yup.string()
                      .required('El campo pais  es obligatorio.'),                                              
      }),
      
      onSubmit:formData=>{
              try {
                  
                  //Valido si no es un robot 
                  if ( valcaptcha !== 0 ){
                        formData.captcha = valcaptcha;
                        formData.email   = nickEmail;
                        console.log(formData);
                        //Envio valores al state 
                        editarUsuario(formData);

                        //Dejo todo como estaba
                        setconfirmaRobot(true);
                        setvalcaptcha(0);
                  }else{
                     setconfirmaRobot(false);
                     //console.log(confirmaRobot);
                  }
                      
              } catch (error) {
                      console.log(error);                                        
              }
      }
}); //fin del formik     

//

  return ( 

        <Layout>
            <div className="md:flex flex min-h-screen">
            <SideBar/>
                <div className="md:w-3/5 xl:w-4/5 p-6">
                        <div className="flex flex-wrap  justify-around mt-10">
                                <button title="Editar tu perfil"  className="btn-yellow"><UserCircleIcon className="h-5 w-5 "/> Editar Perfil </button>
                                <button title="Editar Password"   className="btn-yellow"><CogIcon className="h-5 w-5 "/> Editar Pass </button>
                        </div>


                        <div id="divEditPerfil" className="flex justify-center mt-10">

                            <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">
                                    <form className="mb-8" onSubmit={formik.handleSubmit}>
                                        <label 
                                                className="text-2xl font-bold text-yellow-500 " >Perfil <span className="uppercase font-bold"> {ninkName} </span>  </label>
            
                                                <div className="mb-4">
                                                    <label 
                                                            className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                                                    <input 
                                                            id="nombre"
                                                            type="text"
                                                            placeholder="Ingrese su Nombre"
                                                            value={formik.nombre}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}                                                         
            
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                                    />
                                                </div>
            
                                            {formik.touched.nombre && formik.errors.nombre ? (
                                                <Error mensaje={ formik.errors.nombre } ></Error>
                                                ): null}                                                  
                                                
                                                <div className="mb-4">
                                                    <label 
                                                            className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Apellido</label>
                                                    <input 
                                                            id="apellido"
                                                            type="text"
                                                            placeholder="Ingrese su apellido"
                                                            value={formik.apellido}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}                                                         
            
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                                    />
                                                </div>
            
                                            {formik.touched.nombre && formik.errors.nombre ? (
                                                <Error mensaje={ formik.errors.nombre } ></Error>
                                                ): null}    
                    
                                                
                                                <div className="mb-4">
                                                        <label 
                                                                className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Sexo</label>
                                                        <select  
                                                                id="sexo"
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
                                                                value={formik.sexo}
                                                                onChange={formik.handleChange}
                                                                
                                                        >
                                                            <option > Seleccione </option>
                                                            <option > Femenino </option>
                                                            <option > Masculino </option>
                                                            <option > Otros </option>
                                                        </select>
                                                </div>   
                                                {formik.touched.sexo && formik.errors.sexo ? (
                                                        <Error mensaje={ formik.errors.sexo } ></Error>
                                                        ): null}                                                                                                 
                                                
                                                <div className="mb-4">
                                                        <label 
                                                                className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Pais</label>
                                                        <select  
                                                                id="pais"
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
                                                                value={formik.pais}
                                                                onChange={formik.handleChange}
                                                        >
                                                            <option > Seleccione </option>
                                                            <option option="CO" > Colombia </option>
                                                            <option option="PE" > Peru </option>
                                                            <option option="MX" > Mexico </option>
                                                            <option option="VE" > Venezuela </option>
                                                        </select>
                                                </div>  
                                                
                                                {formik.touched.pais && formik.errors.pais ? (
                                                        <Error mensaje={ formik.errors.pais } ></Error>
                                                        ): null}                                                   
            

                                                <div className="mb-4">
                                                        <label 
                                                                className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Fecha Nacimiento</label>
                                                        <input 
                                                                id="fecha"
                                                                type="date"
                                                                value={formik.fecha}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} 
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                                        />                        

                                                </div>    
            
                                                {formik.touched.fecha && formik.errors.fecha ? (
                                                <Error mensaje={ formik.errors.fecha } ></Error>
                                                ): null}                                                    
                                                
                                                
                                                <div className="mb-4 items-center">
                                                    <label 
                                                        className="block text-gray-700 text-sm font-bold mb-2">¿ Eres un Robot ?</label>
                                            
                                                    <ReCAPTCHA className="flex items-center justify-center"
                                                        sitekey='6LdxEHIUAAAAAMhzsqkP-Q6ddj3xXkQwGTd38m9D'
                                                        onChange={getValCapctha}
                                                    />
                                                </div>     
                                                
                                                { confirmaRobot == false  ? (
                                                <Error mensaje={ 'Debes validar que no eres un robot' } ></Error>
                                                ): null}    
                                                            
                                                
                                                <input  
                                                        type="submit"
                                                        className="btn-green cursor-pointer w-full mt-5"
                                                        value="Editar Perfil"
                                                />      
                                                { mensaje != null && editado == null ? (
                                                <Error mensaje={ mensaje } ></Error>
                                                ): null}  
                                                                                    
                                                
                                                { mensaje != null && editado == true  ? (
                                                <Success mensaje={ mensaje } ></Success>
                                                ): null}  
                                    </form>  
                            </div>
                        </div>
                
                        

                        <div id="divEditPass" className="flex justify-center mt-10 ">
                                <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">
                                        <form className="mb-8" onSubmit={formik.handleSubmit} action="POST">
                                        <div className="mb-4">
                                        <label 
                                                 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                        <input 
                                                 id="password"
                                                 type="password"
                                                 placeholder="Ingrese Password"
                                                 value={formik.password}
                                                 onChange={formik.handleChange}
                                                 onBlur={formik.handleBlur}                                                        

                                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                        />
                               </div>    

                               {formik.touched.password && formik.errors.password ? (
                                  <Error mensaje={ formik.errors.password } ></Error>
                                 ): null}    


                               <div className="mb-4">
                                        <label 
                                                 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">Confirmar Password </label>
                                        <input 
                                                 id="password2"
                                                 type="password"
                                                 placeholder="Confirme Password"
                                                 value={formik.password2}
                                                 onChange={formik.handleChange}
                                                 onBlur={formik.handleBlur}                                                       

                                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                        />
                               </div>         
                               
                               {formik.touched.password2 && formik.errors.password2 ? (
                                  <Error mensaje={ formik.errors.password2 } ></Error>
                                 ): null}    
                               
                               
                               <div className="mb-4 items-center">
                                      <label 
                                         className="block text-gray-700 text-sm font-bold mb-2">¿ Eres un Robot ?</label>
                            
                                     <ReCAPTCHA className="flex items-center justify-center"
                                        sitekey='6LdxEHIUAAAAAMhzsqkP-Q6ddj3xXkQwGTd38m9D'
                                        onChange={getValCapctha}
                                     />
                               </div>     
                               
                               { confirmaRobot == false  ? (
                                  <Error mensaje={ 'Debes validar que no eres un robot' } ></Error>
                                  ): null}    
                                           
                               
                               <input  
                                        type="submit"
                                        className="btn-green cursor-pointer w-full mt-5 "
                                        value="Cambiar Contraseña"
                               />    
                                  { mensaje != null && cambio == null ? (
                                  <Error mensaje={ mensaje } ></Error>
                                  ): null}  
                                                                      
                                  
                                  { mensaje != null && cambio != null  ? (
                                  <Success mensaje={ mensaje } ></Success>
                                  ): null}  
                                        </form>
                                </div>                                                                
                        </div>                                                                

                        
                </div>
            </div>            
        </Layout>

   );
}
 
export default perfil ;