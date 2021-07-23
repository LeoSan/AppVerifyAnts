//Importo Librerias 
import React, { Fragment, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';

//importar icon 
import { BeakerIcon, BookmarkIcon, CollectionIcon, CreditCardIcon, CashIcon, ClipboardIcon, HeartIcon, ClockIcon, ChatIcon, AnnotationIcon, DotsVerticalIcon, UserCircleIcon,CogIcon, LogoutIcon } from '@heroicons/react/solid'

const SideBar = () => {

    //Declaro useState 

   
    //Declaro UseContext 
        //Acceder el state de auth 
        const  valorContext = useContext(AuthContext);
        const { cerrarSesion, autenticado } =  valorContext; 

    //Declaro Variables 

    //Declaro Hook    
        //Redireccionar   
        const router = useRouter();

       //Declaro UseEffect
       useEffect(()=>{
              if(!autenticado){
                     router.push('/')
              }
       },[autenticado]);         
   
   
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
                     <div className="md:w-2/5 xl:w-1/5 bg-green-600">
                            <div className="p-6">
                                   <p className="uppercase text-white text-2xl tracking-wide text-center font-bold" >Tablero
                                   
                                   </p>

                                   <p className="mt-2 text-white text-xl font-bold">Catalagos</p>

                                   <nav className="mt-2" >
                                          <Link href="/home" >
                                                 <a className="bg-gray-500 px-1 py-1  text-white mr-2  block">Ver Actividad
                                                 <BeakerIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                          </Link>

                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Ver Categoria
                                                 <CollectionIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                 
                                          </Link>

                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Ver Recurrencia
                                                 <ClockIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                 
                                          </Link>
                                   </nav>
                                   <p className="mt-2 text-white text-xl font-bold">Funcionalidad</p>

                                   <nav className="mt-2" >
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Acción
                                                 <HeartIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                 
                                          </Link>
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Patrimonio
                                                 <ClipboardIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                 
                                          </Link>
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Ingreso
                                                 <CashIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                 
                                          </Link>
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Gasto
                                                 <CreditCardIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                
                                          </Link>
                                   </nav>
                                   <p className="mt-2 text-white text-xl font-bold">Notificaciones</p>

                                   <nav className="mt-2" >
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Alarmas
                                                 <AnnotationIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                 
                                          </Link>
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Consejos
                                                 <ChatIcon className="h-5 w-5 text-yellow-500"/>
                                                 </a>
                                                 
                                          </Link>

                                   </nav>
                                   <div className="flex flex-wrap  justify-around mt-5">
                                          <Link href="/perfil">
                                                 <button title="Editar tu perfil"  className="btn-yellow"> <UserCircleIcon className="h-5 w-5 "/></button>
                                          </Link>                                          
                                          <Link href="/config">
                                                 <button title="Configuracones del sistema"  className="btn-yellow">  <CogIcon className="h-5 w-5 "/> </button>
                                          </Link>
                                          
                                          <button title="Salir del sistema" onClick={ ()=>salirSesion() } className="btn-yellow"> <LogoutIcon className="h-5 w-5 "/></button>                                          
                                   </div>

                            </div>

                     </div>
              </Fragment>

       );
}

export default SideBar;