//Importar Librerias React 
import React, {Fragment} from 'react';
import Head from 'next/head'; 

//Importo Componentes 
import Header from './Header'; 

import Footer from './Footer'; 


//Importo funciones propias 

const Layout = ({children}) => {
    return ( 
        <Fragment>
            <Head>

                <title>AppVerifyAnts</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
               
                <link href="https://unpkg.com/tailwindcss@1.0/dist/tailwind.css" rel="stylesheet"/>
                
                <script src="https://www.google.com/recaptcha/api.js"></script>
            </Head>
            
            <div className="md:flex flex min-h-screen">
                <div className="container mx-auto">
                    <Header/>
                   
                    <main className="mt-20">
                        {children}
                    </main>
                    <Footer/>
                </div>
                
            </div>
        </Fragment>
     );
}
 
export default Layout;