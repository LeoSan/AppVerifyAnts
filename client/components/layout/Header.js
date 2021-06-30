//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import { useRouter } from 'next/router';

//Importar Componentes 
import Bout from '../ui/Bout';

//Importar funciones Propias 


const Header = () => {

     const router = useRouter();

     // Esta función permite limpiar el state 
     const redireccionar = ()=>{
          router.push('/');
          //limpiarState();
     }

     const slogan = "<span className='text-gray-800 text-bold text-center'>Measuring for a best decision!</span>";

    return ( 
        <header className="somHeader">
               <nav className="flex flex-wrap md:flex-row lg:flex-row bg-gray-300">
                    
                    <div className="w-full flex-wrap  md:w-1/2 lg:w-1/2 px-2">
                         <img className=""  onClick={ ()=>redireccionar()  } src="/image/logo001.png" />  
                    </div>

                    <Bout/>
   
               </nav>   
        </header>
     );
}
 
export default Header;