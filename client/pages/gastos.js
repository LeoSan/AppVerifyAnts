import React, { useContext, useEffect, useState } from 'react';

//importar icon 
import { PlusCircleIcon, ViewListIcon, CheckCircleIcon, ChipIcon, ClipboardCheckIcon } from '@heroicons/react/solid'

//Importo Componentes 
import Layout from '../components/layout/Layout';

//componentes UI
import SideBar from '../components/ui/SideBar';

//Componentes patrimonio
import GastosForm from '../components/gastos/gastosForm';
import GastosList from '../components/gastos/gastosList';
import GastosCard from '../components/gastos/gastosCard';
import GastosStadistic from '../components/gastos/gastosStadistic';


const gastos = () => {

      //Declaration General Values  
      const contView = { viewListGastos: true, viewFormGasto: false, viewGastosCard:false, viewGastosStatistics:false  }

      //Declaration UseState
      const [view, setView] = useState({});
      //Declaration UseContext

      //Declaration UseEffect
        useEffect(() => {
          setView(contView);
      }, []);

    //Declaration General Function  

    //Method Description: 
    const viewListGastos = (contView) => {
      contView.viewListGastos = true;
      contView.viewFormGasto = false;
      contView.viewGastosStatistics = false;
      contView.viewGastosCard = false;
      setView(contView);
  }


  //Method Description: 
  const viewFormGasto = (contView) => {
    contView.viewListGastos = false;
    contView.viewFormGasto = true;
    contView.viewGastosStatistics = false;
    contView.viewGastosCard = false;
      setView(contView);
  }

  
  //Method Description: 
  const viewGastosCard = (contView) => {
    contView.viewListGastos = false;
    contView.viewFormGasto = false;
    contView.viewGastosStatistics = false;
    contView.viewGastosCard = true;
      setView(contView);
  }

  //Method Description: 
  const viewGastosStatistics = (contView) => {
    contView.viewListGastos = false;
    contView.viewFormGasto = false;
    contView.viewGastosStatistics = true;
    contView.viewGastosCard = false;
      setView(contView);
  }


  return (
    <Layout>
    <div className="md:flex flex min-h-screen">

        <SideBar />

        <div className="md:w-3/5 xl:w-4/5 p-6">

            <div className="flex justify-center mt-10">
                <div className="w-full  pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">

                    <div className="flex flex-row justify-around">
                        
                        <button title="Ver listado de tus gastos " className="btn-yellow cursor-pointer w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewListGastos(contView) }}>
                            <ViewListIcon className="w-6 " /> Listado
                        </button>
                        <button title="Formulario para ingresar tus gastos" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewFormGasto(contView) }}>
                            <PlusCircleIcon className="w-6 " /> Ingresar
                        </button>
                        <button title="Ver tablero categorizado por tipo de gastos" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewGastosCard(contView) }}>
                            <CheckCircleIcon className="w-6" /> Detalle
                        </button>
                        <button title="Ver tablero estadisticos" className="btn-yellow cursor-pointer  w-full  text-center font-extrabold flex  rounded-full" onClick={() => { viewGastosStatistics(contView) }}>
                            <ClipboardCheckIcon className="w-6" /> Estadisticos
                        </button>

                    </div>

                    <div className="flex flex-col mt-5 mb-5">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                  <GastosForm view={view}/>

                                  <GastosList view={view}/>
                                  
                                  <GastosCard view={view}/>
                                  
                                  <GastosStadistic view={view}/>
                            

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default gastos