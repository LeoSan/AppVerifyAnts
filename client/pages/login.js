//Importo Librerias 
import React, {useContext, useEffect, Fragment, useState} from 'react';
//import { useNavigate} from 'react-router-dom';

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importo componentes 
import Layout from '../components/layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';

//componentes UI
import Error from '../components/ui/Error';

const login = () => {


   //Declaro mis useState 
   const [valcaptcha, setvalcaptcha] = useState(0);

   //Declaro Hooks 
   //Hook para redireccionar 
   //const navigate = useNavigate(); 

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

      },
      validationSchema:Yup.object({
               email:Yup.string()
                      .email('El campo email no tiene formato adecuado.')
                      .required('El Campo email es obligatorio.'),                         
               password:Yup.string()
                      //.length(10, 'Debes agregar una clave de mas de 10 digitos.')
                      .required('El Campo password es obligatorio.'), 
      }),
      
      onSubmit:datos=>{
              
              try {
                  datos.captcha = valcaptcha;
                  console.log(datos);
                     //Redireccionar 
                     //navigate('/menu');
                      
                      
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
                              <form className="mb-8" onSubmit={formik.handleSubmit} >
                                     <label 
                                                      className="text-2xl font-bold text-yellow-500 " >Ingrese sus credenciales</label>

                                    <div className="mb-4 ">
                                             <label 
                                                      className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                             <input 
                                                      id="email"
                                                      type="text"
                                                      placeholder="Ingrese Email"
                                                      value={formik.email}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}                                                      
                                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md focus:border-yellow-500"
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
                                                      placeholder="Ingrese password"
                                                      value={formik.password}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md focus:border-yellow-500 "
                                             />
                                    </div>   

                                    {formik.touched.password && formik.errors.password ? (
                                       <Error mensaje={ formik.errors.password } ></Error>
                                      ): null}                                       
                                    
                                    <div className="mb-4 items-center">
                                          <label 
                                             className="block text-gray-700 text-sm font-bold mb-2">¿ Eres un Robot ?</label>
                                          
                                          <ReCAPTCHA className="flex items-center justify-center"
                                          sitekey='6LdxEHIUAAAAAMhzsqkP-Q6ddj3xXkQwGTd38m9D'
                                          onChange={getValCapctha}
                                          />

                                    </div>                                      
                                    <input 
                                             type="submit"
                                             className="bg-green-500 hover:bg-blue-300, cursor-pointer w-full mt-5 p-2 text-white uppercase font-bold rounded-lg focus:shadow-md"
                                             value="Login"
                                    />                                                                                                                      

                              </form>  
               </div>
            </div>

      </Fragment>
      </Layout>
   );
}
 
export default login ;