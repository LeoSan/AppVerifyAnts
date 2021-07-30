//Importar Librerias React 
import React, {useEffect, useContext, Fragment, useState} from 'react';
import { css } from "styled-components";


//Importar Componentes UI
import Card from "../ui/Card";
import CardH from "../ui/CardH";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/thumbs/thumbs.min.css"

//import "../../public/assets/swiper.css";

//Importar funciones Propias 

// import Swiper core and required modules
import SwiperCore, {
    Autoplay,Pagination,Navigation, Parallax
  } from 'swiper/core';
  
  // install Swiper modules
  SwiperCore.use([Autoplay,Pagination,Navigation,Parallax]);
  
  
  

const Body = () => {

    const desLargaA = 'Hacer listas, pues, nos ayuda a sentir que el mundo es susceptible de ser controlado, que podemos dividirlo en una cantidad de piezas y contenerlo en un papel. Usar tu lista como un mapa de acciones a tomar te ayudará a mantener la concentración, y en consecuencia a lograr más tareas durante tu jornada y a disminuir la procrastinación que con frecuencia deriva al descontento.  ';
    
    const desLargaB = 'Si llegas a fin de mes con menos dinero del que esperabas, puede que no sea por culpa de que tu salario sea insuficiente. Seguramente, los gastos hormiga tengan un papel importante en esto. Por desgracia, son muchas las personas a las que les cuesta llegar a fin de mes. Siempre se están preocupando por la falta de dinero y ponen el foco en tratar de conseguir un trabajo mejor pagado';

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return ( 
        <Fragment>
        
            <div>
              
                <Swiper 
                    spaceBetween={30} 
                    centeredSlides={true} 
                    speed={600} 
                    parallax={true}
                    pagination={{
                        "clickable": true
                    }} 
                    navigation={true} 
                    className="mySwiper2"

                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                      }}                    
                >
                        <SwiperSlide>
                            <img src="/imgSlider/bosque.png"  alt="pruebas"   />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src="/image/GastosA.jpg"     alt="pruebas"   />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src="/image/ListaHomeA.jpg"  alt="pruebas"  />
                        </SwiperSlide>

                </Swiper>

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
                <div className="flex items-center justify-center my-1 px-1"> 
                    <CardH titulo  = "Genera tu lista"
                           desc    = "Ant-Verify permite generar "
                           descDos = "listas de gastos y tareas."
                           imagen  = "/gif/anima07.gif"
                    />
                </div>

                <div className=" flex items-center justify-center my-1 px-1"> 
                    <CardH  titulo="Valida tus gastos"
                            desc    = "Ant-Verify permite notificarte"
                            descDos = "el limite de tus gastos."
                            imagen ="/gif/anima02.gif"
                    />      
                </div>

                <div className=" flex items-center justify-center my-1 px-1"> 
                    <CardH
                            titulo  = "Un mejor uso"
                            desc    = "Ant-Verify te enseña dar un mejor"
                            descDos = "uso de tu dinero."
                            imagen  = "/gif/anima08.gif"
                    />  
                </div> 
            </div> 



            <div className="flex flex-wrap  justify-around  mb-5">
                <div className="flex items-center justify-center my-1 px-1 "> 
                    <CardH 
                            titulo  = "Evita gastos hormiga"
                            desc    = "Ant-Verify te permite llevar  "
                            descDos = "una bitacora de tus gastos "
                            imagen  ="/gif/anima03.gif"
                    />
                </div>

                <div className=" flex items-center justify-center my-1 px-1"> 
                    <CardH
                            titulo = "Sal de tus deudas"
                            desc    = "Ant-Verify te ayuda en validar "
                            descDos = "y salir de esas deudas."
                            imagen ="/gif/anima01.gif"
                    />      
                </div>

                <div className=" flex items-center justify-center my-1 px-1"> 
                    <CardH
                            titulo = "Sabemos como ayudarte"
                            desc    = "Deja que Ant-Verify te ayude"
                            descDos = "en mejorar tu decisiones financieras."
                            imagen ="/gif/anima17.gif"
                    />  
                </div> 
            </div>             
            
        </Fragment>    

     );
}
 
export default Body;