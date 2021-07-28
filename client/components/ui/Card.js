//Importo Librerias 
import React, { Fragment } from 'react';


const Card = ({ imagen, titulo, desc }) => {
    return (
        <Fragment>
            <div className='card'>
                <img src={imagen}  alt="pruebas" className='w-full' />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{titulo}</div>
                        <p className="text-gray-700 text-base">
                            {desc}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#NoProcrastinación</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#MejoraTuLista</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#TuOrganizador</span>
                    </div>
            </div>            
        </Fragment>
    );
}

export default Card;