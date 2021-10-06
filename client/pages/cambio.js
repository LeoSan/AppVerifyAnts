//Importo Librerias 
import React, {useContext, useEffect, Fragment, useState} from 'react';

//Importo componenentes 
import Layout from '../components/layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import UsuarioContext from '../context/usuario/usuarioContext';


//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';

const crear = () => {


   //Declaro mis useState 
   const [valcaptcha, setvalcaptcha]        = useState(0);
   const [confirmaRobot, setconfirmaRobot]  = useState(true);
   const [valLogin, setvalLogin]            = useState(false);

//Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(UsuarioContext);
   const { registrarUsuario, mensaje, registro } =  valorContext;   
   
   
   //Metodos Funcionales 

   //función : Para capturar el valor del captcha 
   function getValCapctha(value) {
      setvalcaptcha(value);
      console.log("Captcha value:", value);
    }

    //función: Esquema de validaciones 
    const formik =useFormik({
      initialValues:{
              email:'',
              password:'',
              password2:'',
      },
      validationSchema:Yup.object({
              
               email:Yup.string()
                      .email('El campo email no tiene formato adecuado.')
                      .required('El campo email es obligatorio.'),                

               password:Yup.string()
                      .required('El campo password es obligatorio.')
                      .matches(
                        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                        "Debe contener mas de8 Characters, Un caracter en Mayuscula, Un caracter en miniscula, Un Numero y un caracter especial"
                      ),  
                      
               password2: Yup.string().when("password", {
                        is: val => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                          [Yup.ref("password")],
                          "Ambas contraseñas deben ser iguales"
                        )
                      }),                      
             
      }),
      
      onSubmit:formData=>{
              try {
                  
                  //Valido si no es un robot 
                  if ( valcaptcha !== 0 ){
                        formData.captcha = valcaptcha;
                        //Envio valores al state 
                        registrarUsuario(formData);

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
});    
    

  return ( 
      <Layout>
         <Fragment>


            <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">
                              <form className="mb-8" onSubmit={formik.handleSubmit}>
                              <label 
                                                      className="text-2xl font-bold text-yellow-500 " >Cambiar Contraseña </label>


                                    <div className="mb-4">
                                             <label 
                                                      className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                             <input 
                                                      id="email"
                                                      type="text"
                                                      placeholder="Ingrese Email"
                                                      value={formik.email}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}                 

                                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                             />
                                    </div>

                                    {formik.touched.email && formik.errors.email ? (
                                       <Error mensaje={ formik.errors.email } ></Error>
                                      ): null}                                     


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
                                             className="bg-green-500 hover:bg-blue-300, cursor-pointer w-full mt-5 p-2 text-white uppercase font-bold rounded-lg focus:shadow-md"
                                             value="Crear Cuenta"
                                    />    
                                       { mensaje != null && registro == null ? (
                                       <Error mensaje={ mensaje } ></Error>
                                       ): null}  
                                                                           
                                       
                                       { mensaje != null && registro != null  ? (
                                       <Success mensaje={ mensaje } ></Success>
                                       ): null}  
                                       
                                       
                                       

                              </form>  
               </div>
            </div>

      </Fragment>
      </Layout>
   );
}
 
export default crear ;