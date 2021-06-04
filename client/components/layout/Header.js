//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


//Importar Componentes 
import Bin from '../ui/Bin';
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
        <header className="py-2 flex flex-col md:flex-row items-center justify-between">
               <div className="w-64 mb-2 md:mb-0 cursor-pointer">
                         <img 
                         onClick={ ()=>redireccionar()  }
                         src="/LogoAnt.png" /> 
               </div>
                    
               <div className="">
                    <Bin/>
               </div>
        </header>
     );
}
 
export default Header;