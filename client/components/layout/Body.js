//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


//Importar Componentes UI
import Card from "../ui/Card";
import CardH from "../ui/CardH";

//Importar funciones Propias 

const Body = () => {

    const desLargaA = 'Hacer listas, pues, nos ayuda a sentir que el mundo es susceptible de ser controlado, que podemos dividirlo en una cantidad de piezas y contenerlo en un papel. Usar tu lista como un mapa de acciones a tomar te ayudará a mantener la concentración, y en consecuencia a lograr más tareas durante tu jornada y a disminuir la procrastinación';
    
    const desLargaB = 'Si llegas a fin de mes con menos dinero del que esperabas, puede que no sea por culpa de que tu salario sea insuficiente. Seguramente, los gastos hormiga tengan un papel importante en esto. Por desgracia, son muchas las personas a las que les cuesta llegar a fin de mes. Siempre se están preocupando por la falta de dinero y ponen el foco en tratar de conseguir un trabajo mejor pagado';

    return ( 
        <Fragment>
            <div className="bg-blue-200 w-full h-96" >
                slider
            </div>

            <div className="my-5 flex flex-wrap mt-5">
                <div className="w-full sm:w-1/2 lg:w-1/2 px-2 my-2">
                    <Card titulo={"El arte de hacer Listas "}              desc={ desLargaA } imagen = { "/image/ListaHomeA.jpg" } />              
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/2 px-2 my-2">
                    <Card titulo="Los gastos hormiga: asesinos de ahorros" desc={ desLargaB } imagen = { "/image/GastosA.jpg" }/>
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