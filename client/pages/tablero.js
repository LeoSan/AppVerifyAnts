//Importar Librerias React 
import React, {useContext, useEffect} from 'react';
import Router , {useRouter}  from 'next/router';

//Importamos nuestros  useContext (Hooks)
import AuthContext from '../context/auth/AuthContext';

//Importo Componentes 
import Layout from '../components/layout/Layout';
import SideBar   from '../components/ui/SideBar'; 

const Home = () => {

   //Declaro useState 

   //Declaro Hook 
      //Hooks 
      const router = useRouter()
   
   
   //Declaro Hooks -> UseContext para usar el state 
   //Acceder el state de auth 
   const valorContext = useContext(AuthContext);
   const { autenticado} =  valorContext; 
   
   //Declaro UseEffect   

   useEffect(()=>{

    if(!autenticado){
     // router.push('/')
      console.log("Estoy en tablero autenticado->", autenticado);
    }

 },[autenticado])

   
   
   //Metodos Funcionales 

   //función : 
   //función : 
   //función : 

  return ( 
      <Layout>
            <div className="md:flex flex min-h-screen">
                <SideBar/>
                <div className="md:w-3/5 xl:w-4/5 p-6">

                  <div>
                    <img  src="/home.gif" /> 
                  </div>
                    
                </div>
           </div>            
      </Layout>
   );
}
 
export default Home ;