//Importar Librerias React 
import React, {Fragment} from 'react';
import Head from 'next/head'; 

//Importo Componentes 
import Header from './Header'; 
import Body   from './Body'; 
import Footer from './Footer'; 


//Importo funciones propias 

const Layout = ({children}) => {
    return ( 
        <Fragment>
            <Head>
                <title>AppVerifyAnts</title>
                <link href="https://unpkg.com/tailwindcss@1.0/dist/tailwind.css" rel="stylesheet"/>
            </Head>
            
            <div className="md:flex flex min-h-screen">
                <div className="container mx-auto">
                    <Header/>
                    <Body/>
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