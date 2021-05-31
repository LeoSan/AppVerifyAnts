//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


//Importar Componentes 


//Importar funciones Propias 

const Header = () => {

     // Esta función permite limpiar el state 
     const redireccionar = ()=>{
          router.push('/');
          //limpiarState();
     }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
               <img 
                    onClick={ ()=>redireccionar()  }
                    className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.png" /> 
               <div>
                        <Link href="/login">
                            <a className="bg-indigo-500 hover::bg-red-700 px-2 py-3 rounded-lg text-white font-bold uppercase mr-2 ">Acceder Cuenta</a>
                        </Link>
                        <Link href="/crearcuenta">
                             <a className="bg-indigo-500 hover::bg-red-700  px-2 py-3 rounded-lg text-white font-bold uppercase">Generar Cuenta</a>
                        </Link>

               </div>
        </header>
     );
}
 
export default Header;