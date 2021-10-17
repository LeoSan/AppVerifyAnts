import { Fragment } from "react";
import { AdjustmentsIcon, SearchIcon } from '@heroicons/react/solid'


const Filtros = ({ categoria, semana, meses, idCate, idMes, idAnio, idSemana }) => {
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
            <option value="2021" selected> 2021 </option>
            <option value="2022" selected> 2022 </option>
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
            <button title="Filtrar" className="btn-yellow-circle ml-4 h-8 w-8"> <SearchIcon className="pl-2 h-6 w-6" /></button>
          </div>
        </div>

      </div>
    </Fragment>

  );
}

export default Filtros;