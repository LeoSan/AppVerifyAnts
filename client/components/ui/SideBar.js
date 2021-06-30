
//Importo Librerias 
import React, { Fragment } from 'react';
import Link from 'next/link';

//importar icon 
import { BeakerIcon, BookmarkIcon, CollectionIcon, CreditCardIcon, CashIcon, ClipboardIcon, HeartIcon, ClockIcon, ChatIcon, AnnotationIcon, DotsVerticalIcon } from '@heroicons/react/solid'

const SideBar = () => {
       return (
              <Fragment>
                     <div className="md:w-2/5 xl:w-1/5 bg-green-600">
                            <div className="p-6">
                                   <p className="uppercase text-white text-2xl tracking-wide text-center font-bold" >Configración
                                   <DotsVerticalIcon className="h-5 w-5 text-yellow-600"/>
                                   
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

                            </div>

                     </div>
              </Fragment>

       );
}

export default SideBar;