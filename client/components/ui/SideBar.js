
//Importo Librerias 
import React, { Fragment } from 'react';
import Link from 'next/link';

const SideBar = () => {
       return (
              <Fragment>
                     <div className="md:w-2/5 xl:w-1/5 bg-green-600">
                            <div className="p-6">
                                   <p className="uppercase text-white text-2xl tracking-wide text-center font-bold" >Configración</p>

                                   <p className="mt-2 text-white text-xl font-bold">Catalagos</p>

                                   <nav className="mt-2" >
                                          <Link href="/home" >
                                                 <a className="bg-gray-500 px-1 py-1  text-white mr-2  block">Ver Actividad</a>
                                          </Link>

                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Ver Categoria</a>
                                          </Link>

                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Ver Recurrencia</a>
                                          </Link>
                                   </nav>
                                   <p className="mt-2 text-white text-xl font-bold">Funcionalidad</p>

                                   <nav className="mt-2" >
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Acción</a>
                                          </Link>
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Patrimonio</a>
                                          </Link>
                                          <Link href="/home">
                                                 <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Ingreso</a>
                                          </Link>
                                          <Link href="/home">
                                          <a className="bg-gray-500 px-1 py-1  text-white  mr-2 mt-2 block">Gasto</a>
                                          </Link>
                                   </nav>

                            </div>

                     </div>
              </Fragment>

       );
}

export default SideBar;