//Importo Librerias 
import React, { Fragment } from 'react';
import Link from 'next/link';


const Bin = ({ valor }) => {
    return (
        <Fragment>
            
            <p className="px-2 py-3 text-gray-500  text-xl font-bold">Buen Día, Leonard </p>
           
            <Link href="/login">
                <a className="bg-green-500  hover::bg-red-700 px-2 py-3 rounded-lg text-white font-bold uppercase mr-2 ">Perfil</a>
            </Link>
            <Link href="/crear">
                <a className="bg-orange-500  hover::bg-red-700  px-2 py-3 rounded-lg text-white font-bold uppercase"> Salir </a>
            </Link>
        </Fragment>
    );
}

export default Bin;