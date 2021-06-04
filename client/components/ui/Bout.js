//Importo Librerias 
import React, { Fragment } from 'react';
import Link from 'next/link';


const Bout = ({ valor }) => {
    return (
        <Fragment>
            <Link href="/login">
                <a className="bg-green-500 hover::bg-red-700 px-2 py-3 rounded-lg text-white font-bold uppercase mr-2 ">Acceder Cuenta</a>
            </Link>
            <Link href="/crear">
                <a className="bg-orange-500 hover::bg-red-700  px-2 py-3 rounded-lg text-white font-bold uppercase">Generar Cuenta</a>
            </Link>
        </Fragment>
    );
}

export default Bout;