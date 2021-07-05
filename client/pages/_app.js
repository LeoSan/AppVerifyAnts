import React from 'react';

//Archivo  principal donde se colocaran todos los componentes 
// En Next los guiones bajo significan que tienen la jerarquia mas alta _app.js 
// Nota: si usamos hook en next debemos colocar aqui el state.js 
import AuthState from '../context/auth/authState';
import UsuarioState from '../context/usuario/usuarioState';

//import 'tailwindcss/tailwind.css'
import '../public/assets/main.css';


const MyApp = ( {Component, pageProps } )=>{

    return(
        <AuthState>
            <UsuarioState>
                <Component { ...pageProps }  />
            </UsuarioState>
        </AuthState>
    )
}

export default MyApp;