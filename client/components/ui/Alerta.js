//Importar Librerias React 
import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";
const Swal = require('sweetalert2'); 
//Librerias datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Alert {

    constructor(titulo = null, texto = null, icon = null ){
        this.titulo = titulo;
        this.texto = texto;
        this.icon = icon;
        
    }

    modalAlertError(mensaje){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: mensaje,
        showConfirmButton: false,
        timer: 5000
      })
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
        title: '<label class="text-2xl font-bold text-yellow-500 " >Tu Bitácora </label>',
        html:
          '<div class="mb-4"><label class="label-form">Duración habito:</label><input id="swal-input1" class="input-form" type="number" placeholder="Ingrese el total de minutos que duro esta actividad"/></div>' +
          '<div class="mb-4"><label class="label-form">Fecha habito:</label><input id="swal-input3" class="input-form" type="date" placeholder="Anexa tu fecha" /></div>'+
          '<div class="mb-4"><label class="label-form">Incluye una Nota:</label><textarea id="swal-input2" class="input-form" placeholder="Describe tu experiencia para reflexionar" > </textarea></div>'
        ,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#10b981',
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('swal-input3').value
          ]
        }
      });

      return formValues;
    }    

}
 
export default Alert;