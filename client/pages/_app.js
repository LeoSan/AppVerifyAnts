import React from 'react';

//Archivo  principal donde se colocaran todos los componentes 
// En Next los guiones bajo significan que tienen la jerarquia mas alta _app.js 
// Nota: si usamos hook en next debemos colocar aqui el state.js 
import AuthState from '../context/auth/authState';
import UsuarioState from '../context/usuario/usuarioState';
import CategoriaState from '../context/categoria/categoriaState';
import SubcategoriaState from '../context/subcategoria/subcategoriaState';
import RecurrenteState from '../context/recurrente/recurrenteState';
import ActoState from '../context/acto/actoState';
import PatrimonioState from '../context/patrimonio/patrimonioState';

//import 'tailwindcss/tailwind.css'
import '../public/assets/main.css';
import '../public/assets/swiper.css';


const MyApp = ({ Component, pageProps }) => {

    return (
        <AuthState>
            <UsuarioState>
                <CategoriaState>
                    <SubcategoriaState>
                        <RecurrenteState>
                            <ActoState>
                                <PatrimonioState>
                                    <Component {...pageProps} />
                                </PatrimonioState>    
                            </ActoState>
                        </RecurrenteState>
                    </SubcategoriaState>
                </CategoriaState>
            </UsuarioState>
        </AuthState>
    )
}

export default MyApp;