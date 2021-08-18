//Importo Librerias 
import React, {useContext, useEffect, Fragment, useState} from 'react';
import Router , {useRouter}  from 'next/router';
import PropTypes from "prop-types";

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';

//Importo componentes 
import Layout from '../components/layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';

//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';

const login = () => {


   //Declaro mis useState 
   const [valcaptcha, setvalcaptcha] = useState(0);
   const [confirmaRobot, setconfirmaRobot]  = useState(true);

   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(AuthContext);
   const { olvidoClave, mensaje} =  valorContext;
   

   //Hook para redireccionar 
   const router = useRouter()

   //Metodos Funcionales 

   //Declaro UseEffect
   

   //función : Para capturar el valor del captcha 
   function getValCapctha(value) {
      setvalcaptcha(value);
      //console.log("Captcha value:", value);
    }


    //función: Esquema de validaciones 
    const formik = useFormik({
      initialValues:{
              email:'',
            

      },
      validationSchema:Yup.object({
               email:Yup.string()
                      .email('El campo email no tiene formato adecuado.')
                      .required('El Campo email es obligatorio.'),                         
              
      }),
      
      onSubmit:formData=>{
               if ( valcaptcha !== 0 ){
                     formData.captcha = valcaptcha;

                     //Envio valores al state 
                     olvidoClave(formData);

                     //Dejo todo como estaba
                     setconfirmaRobot(true);
                     setvalcaptcha(0);


               }else{
                  setconfirmaRobot(false);
                  //console.log(confirmaRobot);
               }
      }
});      
    
  return ( 
     
      <Layout>
         <Fragment>
          

            <div className="flex justify-center mt-10">
               <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">
                              <form className="mb-8" onSubmit={formik.handleSubmit} action="POST" >
                                     <label 
                                                      className="text-2xl font-bold text-yellow-500 " >Restablecer Contraseña</label>

                                    <div className="mb-4 ">
                                             <label 
                                                      className="label-form" htmlFor="email">Email</label>
                                             <input 
                                                      id="email"
                                                      type="text"
                                                      placeholder="Ingrese Email"
                                                      value={formik.email}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}                                                      
                                                      className="input-form"
                                             />
                                    </div>


                                    {formik.touched.email && formik.errors.email ? (
                                       <Error mensaje={ formik.errors.email } ></Error>
                                      ): null} 
                                    
                                    
                                    <div className="mb-4 items-center">
                                          <label 
                                             className="label-form">¿ Eres un Robot ? </label>
                                          
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
                                             className="btn-green cursor-pointer w-full mt-5 p-2"
                                             value="Enviar Correo"
                                    />    
                                    
                                    { mensaje != null  ? (
                                       <Success mensaje={ mensaje } ></Success>
                                       ): null}  

                              </form>  
               </div>
            </div>

      </Fragment>
      </Layout>
   );
}

login.propTypes = {
    getValCapctha: PropTypes.func,
    valcaptcha: PropTypes.string,
    mensaje: PropTypes.string,
    confirmaRobot: PropTypes.bool,
    olvidoClave: PropTypes.bool,
    formik:  PropTypes.object,
  };
 
export default login ;