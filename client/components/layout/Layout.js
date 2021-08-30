//Importar Librerias React 
import React, {Fragment, useContext} from 'react';
import Head from 'next/head'; //-> Indispensable para poder usar link style o cualquier plugin

//Importo Componentes 
import Header from './Header'; 
import Footer from './Footer'; 

const Layout = ({children}) => {



    return ( 
        <Fragment>
            <Head>
                <title>AppVerifyAnts</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://www.google.com/recaptcha/api.js"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
                
            </Head>
            <div className="font-Roboto bg-gray-100"> 
                <Header />
                <main className="mt-2">
                    {children}
                </main>
                <Footer/>
            </div>    
        </Fragment>
     );
}
 
export default Layout;