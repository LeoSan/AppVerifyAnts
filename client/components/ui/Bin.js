//Importo Librerias 
import React, { Fragment, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';

//Importo componentes 
import CardH from "../ui/CardH";


const Bin = () => {

    //Declaro useState 

   
    //Declaro UseContext 
        //Acceder el state de auth 
        const  valorContext = useContext(AuthContext);
        const { ninkName, cerrarSesion, saludoTiempo } =  valorContext; 

    //Declaro Variables 
        const nomUsu  =  (ninkName == null )?'null':ninkName;  
    

    //Declaro Hook    
        //Redireccionar   
        const router = useRouter();
   
   
    //Metodos Funcionales 

        //función : 
        //función : 
        //función : Permite redireccionar al home 
        const salirSesion = ()=>{
            cerrarSesion();
            router.push('/');
        }


    return (
        <Fragment>
                <div className="flex w-full flex-wrap md:flex-row md:items-stretch md:justify-end md:w-1/2 lg:w-1/2 px-2 ">
                    <div className="flex-wrap mt-5">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden"> 
                                <div className="md:flex">
                                    <div className="md:flex-shrink-0">
                                        <img src='/avatar/nino.gif'  alt="pruebas" className='mt-2 rounded'  style={{ width: '60px',  height: '60px' }}/>
                                    </div>
                                    <div className="p-2">
                                        <div className=" tracking-wide text-sm "> Feliz { saludoTiempo() } </div>
                                        <p className="uppercase mt-2 text-gray-500 "> {nomUsu}   </p>
                                    </div>
                                </div>
                            </div> 
                             
                    </div>

                </div>              
        </Fragment>
    );
}

export default Bin;