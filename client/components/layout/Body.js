//Importar Librerias React 
import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


//Importar Componentes 


//Importar funciones Propias 

const Body = () => {

    return ( 
        <Fragment>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-6xl bg-indigo-100 ">
                            <h1 className="text-3xl font-light mb-4"> Aqui slider </h1> 

                            <h1 className="text-3xl font-light mb-4"> ▓ ▓ ▓ ▓ ▓ ▓ cuadro tag   </h1> 

                            Bienvenid@ a tu app de mediciones de tus gastos y actividades de manera felxible y comoda.     
                </div>
            </div>                
        </Fragment>    

     );
}
 
export default Body;