//Importar Librerias React 
import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";
const Swal = require('sweetalert2'); 


class Alert {

    constructor(titulo = null, texto = null, icon = null ){
        this.titulo = titulo;
        this.texto = texto;
        this.icon = icon;
        
    }


    deploySucces(){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Excelente, Tus cambios se guardaron!',
        showConfirmButton: false,
        timer: 1500
      })
    }

    deployFault(){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tus cambios no se guardaron, vuelve intentar por favor!',
        showConfirmButton: false,
        timer: 1500
      })
    }

}
 
export default Alert;