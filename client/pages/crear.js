//Importo Librerias 
import React, {useContext, useEffect, Fragment, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
//Importo componenentes 
import Layout from '../components/layout/Layout';

const crear = () => {


   //Declaro mis useState 
   const [valcaptcha, setvalcaptcha] = useState(0);
   
   //Metodos Funcionales 

   //función : Para capturar el valor del captcha 
   function getValCapctha(value) {
      setvalcaptcha(value);
      console.log("Captcha value:", value);
    }
    

  return ( 
      <Layout>
         <Fragment>


            <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">
                              <form className="mb-8">
                              <label 
                                                      className="text-2xl font-bold text-yellow-500 " >Crear cuenta </label>

                                    <div className="mb-4">
                                             <label 
                                                      className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                             <input 
                                                      id="Email"
                                                      type="text"
                                                      placeholder="Ingrese Email"

                                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                             />
                                    </div>
                                    <div className="mb-4">
                                             <label 
                                                      className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                             <input 
                                                      id="password"
                                                      type="password"
                                                      placeholder="Ingrese Password"

                                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                             />
                                    </div>    
                                    <div className="mb-4">
                                             <label 
                                                      className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">Confirmar </label>
                                             <input 
                                                      id="password2"
                                                      type="password2"
                                                      placeholder="Confirme Password"

                                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                                             />
                                    </div>                                       
                                    
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
                                             value="Crear Cuenta"
                                    />                                                                                                                      

                              </form>  
               </div>
            </div>

      </Fragment>
      </Layout>
   );
}
 
export default crear ;