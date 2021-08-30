import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
const Swal = require('sweetalert2');

//importar icon 
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid'

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';


const ActoList = ({view}) => {

    if (view.viewList == false){ return null }

    return ( 
        <div className="flex flex-col">
            <label className="text-2xl font-bold text-yellow-500 " >Lista de Actos </label>
            <label className="text-xs font-bold text-gray-500 " >Acto es una acción u obra que realiza una persona.</label>
            <label className="text-xs font-bold text-gray-500 " >Pueden mejorar si son medidos en el tiempo.</label>
        </div>
     );
}

ActoList.propTypes = {
    /*  listarCategoria: PropTypes.func,
      mensajeList: PropTypes.string,
      nickEmail: PropTypes.string,
      nickID: PropTypes.string,
      categoria: PropTypes.object,
      ListCategoria: PropTypes.array,
      router:  PropTypes.object,
      */
  };
 
export default ActoList;