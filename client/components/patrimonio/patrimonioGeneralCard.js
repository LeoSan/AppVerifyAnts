//Importar Librerias React 
import React, { useContext, useEffect, useState } from 'react';


//Importamos nuestros  useContext (Hooks)
import AuthContext from '../../context/auth/AuthContext';
import PatrimonioContext from '../../context/patrimonio/PatrimonioContext';
import CategoriaContext from '../../context/categoria/categoriaContext';

//Componentes UI
import Success from '../ui/Success';
import Error from '../ui/Error';

import  Minicard from "../patrimonio/cardMini"
const patrimonioGeneralCard = ({ view }) => {

    //Declaro UseContext 
    //Acceder el state de auth 
    const valorAuthContext = useContext(AuthContext);
    const { nickEmail, nickID } = valorAuthContext;

    //Acceder el state de Patrimonio 
    const valorPatrimonioContext = useContext(PatrimonioContext);
    const { patrimonio_card, listarGeneralCard } = valorPatrimonioContext;

    //Acceder el state de Categoria 
    const valorContext = useContext(CategoriaContext);
    const {  listarCategoria, categoriaPatrimonio } = valorContext;

    
    //Declaración Variables
    const datos = { nickID, nickEmail }
       
    useEffect(() => {
        listarGeneralCard(datos); 
        listarCategoria(datos); 
    }, []);

    if (view.viewGeneralCard == false) { return null }
    
    return (

    <>
    <div className="flex flex-wrap  justify-around  mb-5">
    {       
            categoriaPatrimonio.map((list) => (
                <div key={list._id}  className="max-w-sm rounded overflow-hidden shadow-lg m-3" >
                    <div className="px-6 py-4">
                    <div className="font-bold text-sm mb-2 capitalize" > {list.nomCate}</div>
                        <div className="flex flex-col mx-auto space-y-2  text-white text-sm font-bold leading-6 max-w-xs">
                        {
                            (patrimonio_card != null) ? (    
                            <Minicard categoria_id={list._id} listaPatrimonios={patrimonio_card}/>
                            ) :  null
                        }                            
                        </div>
                    </div>
                </div> 
            ))
    }
    </div>
      
    </>    

    );
}

export default patrimonioGeneralCard;