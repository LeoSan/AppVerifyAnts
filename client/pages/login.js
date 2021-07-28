//Importo Librerias 
import React, {useContext, useEffect, Fragment, useState} from 'react';
import Router , {useRouter}  from 'next/router';
import Link from 'next/link';

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

const login = () => {


   //Declaro mis useState 
   const [valcaptcha, setvalcaptcha] = useState(0);
   const [confirmaRobot, setconfirmaRobot]  = useState(true);

   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(AuthContext);
   const { iniciarSesion, mensaje, autenticado} =  valorContext;
   

   //Hook para redireccionar 
   const router = useRouter()

   //Metodos Funcionales 

   //Declaro UseEffect
   
   useEffect(()=>{

      if(autenticado){
        // router.push('/tablero'); 
        router.push('/tablero')
        //console.log("autenticado->", autenticado);
      }

   },[autenticado])


   //función : Para capturar el valor del captcha 
   function getValCapctha(value) {
      setvalcaptcha(value);
      //console.log("Captcha value:", value);
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
                      .required('El Campo password es obligatorio.'), 
      }),
      
      onSubmit:formData=>{
               if ( valcaptcha !== 0 ){
                     formData.captcha = valcaptcha;

                     //Envio valores al state 
                     iniciarSesion(formData);

                     //Dejo todo como estaba
                     setconfirmaRobot(true);
                     setvalcaptcha(0);


               }else{
                  setconfirmaRobot(false);
                  console.log(confirmaRobot);
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
                                             className="block text-gray-700 text-sm font-bold mb-2  justify-between">
                                             ¿ Eres un Robot ? ó   
                                             <Link href="/olvido">   ¿ Olvidaste tu contraseña ?  </Link> 
                                          </label>
                                          
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
                                             value="Login"
                                    />    
                                    
                                    { mensaje != null  ? (
                                       <Error mensaje={ mensaje } ></Error>
                                       ): null}  

                              </form>  
               </div>
            </div>

      </Fragment>
      </Layout>
   );
}
 
export default login ;