import React, { useContext, useEffect, useState, Fragment } from 'react';
import { AdjustmentsIcon, SearchIcon } from '@heroicons/react/solid';

import AuthContext from '../../context/auth/AuthContext';
import ActoContext from '../../context/acto/ActoContext';



const Filtros = ({ categoria, semana, meses, idCate, idMes, idAnio, idSemana, tipoEvento }) => {

  //Acceder el stateContext de auth 
  const valorAuthContext = useContext(AuthContext);
  const { nickID } = valorAuthContext;

  //Acceder el stateContext de ActoContext 
  const valorActoContext = useContext(ActoContext);
  const { filtroDatoBarra } = valorActoContext;



  const tipo = tipoEvento;

  const filtrarData = (e) => {
    e.preventDefault();

    switch (tipo) {
      case 'datosBarra':
        const cateBarra = document.getElementById("cateBarra").value;
        const mesBarra = document.getElementById("mesBarra").value;
        const anioBarra = document.getElementById("anioBarra").value;
        const semBarra = document.getElementById("semBarra").value;
        let datos = { nickID, cateBarra, mesBarra, anioBarra, semBarra, tipo: "datosBarra" }

        filtroDatoBarra(datos);

        break;
      case 'datosLinea':
        alert('Entro a Linea');
        break;
      case 'datosPie':
        alert('Entro a Pie');
        break;

      default:
        break;
    }


  }

  return (

    <Fragment>
      <div className="flex space-x-4">

        <div className="flex-grow h-10 rounded-md bg-green-500 text-white font-extrabold flex items-center justify-center">
          <svg className="h-5 w-14" fill="none">
            <AdjustmentsIcon className="w-6" />
          </svg>

          <select
            id={idAnio}
            name={idAnio}
            className="rounded-md text-gray-700 text-center capitalize"
          >

            <option value="0" selected> Año </option>
            <option value="2021" > 2021 </option>
            <option value="2022" > 2022 </option>
          </select>
          <svg className="h-5 w-14" fill="none">
            <AdjustmentsIcon className="w-6" />
          </svg>

          <select
            id={idMes}
            name={idMes}
            className="rounded-md text-gray-700 text-center capitalize"
          >
            <option value="0" selected> Mes </option>

            {
              !meses ? null : meses.map((list) => (
                <option key={list.id} value={list.id} > {list.mes} </option>
              ))

            }
          </select>



          <svg className="h-5 w-14" fill="none">
            <AdjustmentsIcon className="w-6" />
          </svg>

          <select
            id={idSemana}
            name={idSemana}
            className="rounded-md text-gray-700 text-center capitalize"
          >
            <option value="0" selected> Semana </option>
            {
              !semana ? null : semana.map((list) => (
                <option key={list.id} value={list.id} > {list.semana} </option>
              ))
            }
          </select>
          <svg className="h-5 w-14" fill="none">
            <AdjustmentsIcon className="w-6" />
          </svg>

          <select
            id={idCate}
            name={idCate}
            className="rounded-md text-gray-700 text-center capitalize"
          >
            <option value="0" selected> Categorias </option>
            {
              !categoria ? null : categoria.map((list) => (
                <option key={list._id} value={list._id} > {list.nomCate} </option>
              ))

            }
          </select>

          <div className="ml-6">
            <button title="Filtrar" className="btn-yellow-circle ml-4 h-8 w-8" onClick={(e) => { filtrarData(e) }}> <SearchIcon className="pl-2 h-6 w-6" /></button>
          </div>
        </div>

      </div>
    </Fragment>

  );
}

export default Filtros;