//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';


//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import PatrimonioContext from '../../context/patrimonio/PatrimonioContext';
import CategoriaContext from '../../context/categoria/categoriaContext';

//Componentes UI
import Success from '../ui/Success';
import Error from '../ui/Error';

const patrimonioGeneralCard = ({ view }) => {

    //Declaro UseContext 
    //Acceder el state de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickEmail, nickID } = valorAuthContext;

    //Acceder el state de Patrimonio 
    const valorPatrimonioContext = useContext(PatrimonioContext);
    const {  patrimonio, listarPatrimonio, listarGeneralCard } = valorPatrimonioContext;

    //Acceder el state de Categoria 
    const valorContext = useContext(CategoriaContext);
    const {  listarCategoria, categoriaGastos } = valorContext;

    
    //Declaración Variables
    const datos = { nickID, nickEmail }
    const datosConsulta = {nomPatrimonio:'', usuario:nickID, categoria:0, activo:1, tipo:"1-M" }
    

    useEffect(() => {
       // listarGeneralCard(datos); 
    }, [])
    


    if (view.viewGeneralCard == false) { return null }
    
    return (

    <>
    <div className="flex flex-wrap  justify-around  mb-5">

                
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-3" >
            <div className="px-6 py-4">
            <div className="font-bold text-sm mb-2">Nombre Categoria</div>
                <div className="flex flex-col mx-auto space-y-2  text-white text-sm font-bold leading-6 max-w-xs">

                   
                        <div className="p-3 rounded-lg flex items-start  bg-yellow-300 ">
                            <div className='mr-5'>Descripcion</div>
                            <div className=""> 155969</div>
                        </div>                        
                        
                        <div className="p-3 rounded-lg flex items-start  bg-yellow-300 ">
                            <div className='mr-5'>Descripcion</div>
                            <div className=""> 155969</div>
                        </div>
                   
                    <div className="p-3 rounded-lg flex items-start  bg-gray-200 text-gray-700">
                        <div className='mr-9'>Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className=""> 20000</div>
                    </div>
                </div>

            </div>
        </div> 
        

    </div>
      
    </>    

    );
}

export default patrimonioGeneralCard;