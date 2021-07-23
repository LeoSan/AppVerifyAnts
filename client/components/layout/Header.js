//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import { useRouter } from 'next/router';

//Importar Componentes 
import Bout from '../ui/Bout';
import Bin from '../ui/Bin';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';

//Importar funciones Propias 


const Header = (  ) => {

   //Declaro useState 

   
   //Declaro UseContext 
     //Acceder el state de auth 
     const  valorContext = useContext(AuthContext);
     const { autenticado } =  valorContext; 


   //Declaro Hook    
       //Redireccionar   
       const router = useRouter();

   
   //Metodos Funcionales 

   //función : 
   //función : 
   //función : Permite redireccionar al home 
     const redireccionar = ()=>{
          router.push('/');
          //limpiarState();
     }

     const slogan = "<span className='text-gray-800 text-bold text-center'>Measuring for a best decision!</span>";

    return ( 
        <header className="somHeader">
               <nav className="flex flex-wrap md:flex-row lg:flex-row bg-gray-300">
                    
                    <div className="w-full flex-wrap  md:w-1/2 lg:w-1/2 px-2">
                         <img className="hover:cursor-pointer"  onClick={ ()=>redireccionar()  } src="/image/logo001.png" />  
                    </div>
                    { ( autenticado ) ? (
                         <Bin />   
                    ) : (
                         <Bout/>    
                    ) }
               </nav>   
        </header>
     );
}
 
export default Header;