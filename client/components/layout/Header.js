//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


//Importar Componentes 


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
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
               <div className="w-64 mb-8 md:mb-0 cursor-pointer">
                         <img 
                         onClick={ ()=>redireccionar()  }
                         src="/LogoAnt.png" /> 
               </div>
                    
               <div>
                        <Link href="/login">
                            <a className="bg-green-500 hover::bg-red-700 px-2 py-3 rounded-lg text-white font-bold uppercase mr-2 ">Acceder Cuenta</a>
                        </Link>
                        <Link href="/crear">
                             <a className="bg-orange-500 hover::bg-red-700  px-2 py-3 rounded-lg text-white font-bold uppercase">Generar Cuenta</a>
                        </Link>

               </div>
        </header>
     );
}
 
export default Header;