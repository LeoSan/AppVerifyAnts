//Importo Librerias 
import React, {Fragment} from 'react';


const Success = ({mensaje}) => {
    return ( 
        <Fragment>
            <div className="alert-success" role="alert">
            <p className="font-bold">Operación Exitosa:</p>        
            <p >{mensaje}</p>
            </div>
        </Fragment>
     );
}
 
export default Success;