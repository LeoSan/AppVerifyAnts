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
import AuthContext    from '../context/auth/AuthContext';


//componentes UI
import Error from '../components/ui/Error';
import Success from '../components/ui/Success';
import SideBar   from '../components/ui/SideBar'; 

const congif = () => {

   //Declaro mis useState 
   const [valcaptcha, setvalcaptcha]        = useState(0);
   const [confirmaRobot, setconfirmaRobot]  = useState(true);
   const [valLogin, setvalLogin]            = useState(false);

//Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(UsuarioContext);
   const { registrarUsuario, mensaje, registro } =  valorContext;   

   const  valorContextAuth = useContext(AuthContext);
   const { ninkName } =  valorContextAuth; 

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
              nombre:'',
              email:'',
              password:'',
              password2:'',
      },
      validationSchema:Yup.object({
               email:Yup.string()
                      .email('El campo email no tiene formato adecuado.')
                      .required('El campo email es obligatorio.'),                
               nombre:Yup.string()
                      .min(5, "Tu nombre debe tener al menos 5 caracteres.")
                      .required('El campo nombre es obligatorio.'),                         
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
            <div className="md:flex flex min-h-screen">
                <SideBar/>
                <div className="md:w-3/5 xl:w-4/5 p-6">

                        <div className="flex justify-center mt-10">
                            <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">
                                    <form className="mb-8" onSubmit={formik.handleSubmit}>
                                        <label 
                                                                className="text-2xl font-bold text-yellow-500 " >Instalador para iniciar  <span className="uppercase font-bold"> {ninkName} </span>  </label>
            
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


                                                
                                                <input  
                                                        type="submit"
                                                        className="btn-green cursor-pointer w-full mt-5"
                                                        value="Guardar"
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
                </div>
            </div>            
        </Layout>

   );
}
 
export default congif;