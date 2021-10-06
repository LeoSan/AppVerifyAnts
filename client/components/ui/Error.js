//Importo Librerias 
import React, {Fragment} from 'react';
import PropTypes from "prop-types";


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


Error.propTypes = {
   /* handleClick: PropTypes.func,
    direction: PropTypes.string,
    playState: PropTypes.bool,
    imgProps:  PropTypes.object,
    wrapperProps: PropTypes.object*/
  };
  
 
export default Error;