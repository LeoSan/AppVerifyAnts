//Importo Librerias 
import React, { Fragment } from 'react';
import Link from 'next/link';


const Bout = ({ valor }) => {
    return (
        <Fragment>
                <div className="flex w-full flex-wrap md:flex-row md:items-stretch md:justify-end md:w-1/2 lg:w-1/2 px-2 ">
                    <div className=" flex-wrap mt-5">
                        <Link href="/login"> 
                            <button className="btn-yellow">Acceder </button>
                        </Link>
                    </div>
                    <div className=" flex-wrap mt-5">
                        <Link href="/crear">
                            <button className="btn-green"> Registrar  </button>
                        </Link>
                    </div>
                </div>              
        </Fragment>
    );
}

export default Bout;