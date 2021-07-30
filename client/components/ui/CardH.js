//Importo Librerias 
import React, { Fragment } from 'react';


const Card = ({ imagen, titulo, desc, descDos }) => {
    return (
        <Fragment>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden"> 
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img src={imagen}  alt="pruebas" className='h-20 w-full  object-cover md:h-20 md:w-20'  style={{ width: '120px',  height: '120px' }}/>
                            </div>
                            <div className="p-3">
                                <div className="uppercase tracking-wide text-sm ">{titulo}</div>
                                <p className="mt-2 text-gray-500 ">{desc}  </p>
                                <p className="mt-2 text-gray-500 ">{descDos}  </p>
                            </div>
                        </div>
                    </div> 
        </Fragment>
    );
}

export default Card;