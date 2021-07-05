//Importo Librerias 
import React, {Fragment} from 'react';


const Error = ({mensaje}) => {
    return ( 
        <Fragment>
            <div className="alert-error" role="alert">
            <p className="font-bold">Hubo un error:</p>        
            <p >{mensaje}</p>
            </div>
        </Fragment>
     );
}
 
export default Error;