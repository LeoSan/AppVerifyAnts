//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';

const patrimonioEstadisticas = ({ view }) => {

    if (view.viewTablePatri == false) { return null }
    
    return (
        <>
            <h1>Vista Estadisticas</h1> 
        </>
    );
}

export default patrimonioEstadisticas;