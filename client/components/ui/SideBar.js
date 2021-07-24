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

                                          <div className="flex flex-nowrap hover:bg-gray-500 hover:cursor-pointer">
                                                 <div className="bg-gray-500 px-1 py-1   mr-2 ">
                                                        <BeakerIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2    ">
                                                        Ver actividad
                                                 </div>
                                          </div>

                                          <div className="flex flex-nowrap hover:bg-gray-500 hover:cursor-pointer">
                                                 <div className="bg-gray-500 px-1 py-1   mr-2 ">
                                                        <CollectionIcon className="h-5 w-5 text-white "/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2  ">
                                                        Ver Categoria 
                                                 </div>
                                          </div>

                                          <div className="flex flex-nowrap hover:bg-gray-500 hover:cursor-pointer">
                                                 <div className="bg-gray-500 px-1 py-1   mr-2 ">
                                                        <ClockIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2  ">
                                                        Ver Recurrencia 
                                                 </div>
                                          </div>                                          
                                          


                                   </nav>
                                   <p className="mt-2 text-white text-xl font-bold">Funcionalidad</p>

                                   <nav className="mt-2" >

                                          
                                          <div className="flex flex-nowrap hover:bg-yellow-500 hover:cursor-pointer">
                                                 <div className="bg-yellow-500 px-1 py-1   mr-2 ">
                                                        <HeartIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2 ">
                                                        Acción
                                                 </div>
                                          </div>                                          
                                          <div className="flex flex-nowrap hover:bg-yellow-500 hover:cursor-pointer">
                                                 <div className="bg-yellow-500 px-1 py-1   mr-2 ">
                                                        <ClipboardIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2  ">
                                                        Patrimonio
                                                 </div>
                                          </div>                                          
                                           
                                          <div className="flex flex-nowrap hover:bg-yellow-500 hover:cursor-pointer">
                                                 <div className="bg-yellow-500 px-1 py-1   mr-2 ">
                                                        <CashIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2  ">
                                                        Ingreso
                                                 </div>
                                          </div>                                          
                                          <div className="flex flex-nowrap hover:bg-yellow-500 hover:cursor-pointer">
                                                 <div className="bg-yellow-500 px-1 py-1   mr-2 ">
                                                        <CreditCardIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2 ">
                                                        Gasto
                                                 </div>
                                          </div>                                          

                                   </nav>
                                   <p className="mt-2 text-white text-xl font-bold">Notificaciones</p>

                                   <nav className="mt-2" >
                                          <div className="flex flex-nowrap hover:cursor-pointer hover:bg-gray-500">
                                                 <div className="bg-gray-500 px-1 py-1   mr-2 ">
                                                        <AnnotationIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2 ">
                                                        Alarmas
                                                 </div>
                                          </div>                                          
                                          <div className="flex flex-nowrap hover:cursor-pointer hover:bg-gray-500">
                                                 <div className="bg-gray-500 px-1 py-1   mr-2 ">
                                                        <ChatIcon className="h-5 w-5 text-white"/> 
                                                 </div>
                                                 <div className=" px-1 py-1  text-white mr-2 ">
                                                        Gasto
                                                 </div>
                                          </div>  

                                   </nav>
                                   <div className="flex flex-wrap  justify-around mt-10">
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