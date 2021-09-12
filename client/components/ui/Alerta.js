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

    deployModal = async()=>{

      const { value: formValues } = await  Swal.fire({
        title: 'Bitácora Actividad',
        html:
          'Duración :<input id="swal-input1" class="swal2-input">' +
          'Nota :<textarea id="swal-input2" class="swal2-input"> </textarea>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#3085d6',
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })

      return formValues;


    }    

}
 
export default Alert;