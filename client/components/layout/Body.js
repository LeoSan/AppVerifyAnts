//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


//Importar Componentes UI
import Card from "../ui/Card";
import CardH from "../ui/CardH";

//Importar funciones Propias 

const Body = () => {

    return ( 
        <Fragment>
            <div className="bg-blue-200 w-full h-96" >
                slider
            </div>

            <div className="my-5 flex flex-wrap mt-5">
                <div className="w-full sm:w-1/2 lg:w-1/2 px-2 my-2">
                    <Card/>              
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/2 px-2 my-2">
                    <Card/>
                </div>

            </div>            
            

            <div className="flex flex-wrap  justify-around  mb-5">
                <div className="flex items-center justify-center my-2 px-2 "> 
                    <CardH 
                        imagen ="/gif/anima07.gif"
                    />
                </div>

                <div className=" flex items-center justify-center my-2 px-2"> 
                    <CardH
                        imagen ="/gif/anima02.gif"
                    />      
                </div>

                <div className=" flex items-center justify-center my-2 px-2"> 
                    <CardH
                        imagen ="/gif/anima08.gif"
                    />  
                </div> 
            </div> 



            <div className="flex flex-wrap  justify-around  mb-5">
                <div className="flex items-center justify-center my-2 px-2 "> 
                    <CardH 
                        imagen ="/gif/anima03.gif"
                    />
                </div>

                <div className=" flex items-center justify-center my-2 px-2"> 
                    <CardH
                        imagen ="/gif/anima01.gif"
                    />      
                </div>

                <div className=" flex items-center justify-center my-2 px-2"> 
                    <CardH
                        imagen ="/gif/anima17.gif"
                    />  
                </div> 
            </div>             
            
        </Fragment>    

     );
}
 
export default Body;