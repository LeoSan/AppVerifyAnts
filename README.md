# AppVerifyAnts
Mi primera app usando MERN, es un proyecto personal, donde deseo plasmar y controlar los gastos hormigas y mezclarlo con el registro de mis actividades diarias y recordatorios diarios para cumplir con la premisa de que todo lo que no se mide no se puede mejorar

<p align="center"><img src="https://alejandrojs.files.wordpress.com/2019/09/ios-android-development-using-react-native.png" width="400"> </p>

<p align="center"><img src="https://i.morioh.com/2019/12/24/53dcf7ce495e.jpg" width="400"> </p>

<p align="center"><img src="https://www.atsistemas.com/dam/jcr:20b575da-1767-43dc-b18f-4f2a9f722877/1375-775-tailwind-css.png" width="400"> </p>

### Tecnologias aplicadas 
#### Desarrollo Back 
- Node.Js V15-14 
- Expresss 
- Mongo DB
- Mongoose 

#### Comandos Back 
- `npm init`
- `npm i express`
- `npm i --save-dev nodemon`
- `npm install mongoose --save`
- `npm install dotenv`
- `npm run dev` -> Iniciador 

#### Desarrollo Front  Desktop
- Next.Js 
- Tailwind css 

#### Comandos Front  
- `npx create-next-app -e with-tailwindcss my-project`->Esto ya te genera toda la configuración para tail tambien se puede hacer [manualmente](https://tailwindcss.com/docs/guides/nextjs)
- `npm install tailwindcss postcss-cli autoprefixer -D` -> Ejecutalo dentro de tu proyecto
- `npx tailwindcss init` -> Crea el archivo configurador deTailwind 
- Configuramos nuestro archivo en la raiz `postcss.config.js`
```
<code>

module.exports = {
  plugins: [
    // ...
    require('tailwindcss'),
    require('autoprefixer'),//PAra que sea compatble con todos los navegadores web 
    // ...
  ]
}

```
- Creamos la carpeta `assets` y el archivo `tailwind.css` como es next improvisare colocarla en public todo `\public\assets\tailwind.css`
```
<code>
@tailwind base;
@tailwind components;
@tailwind utilities;
//Aqui puedes crear tus componenetes 
```
- Editamos el package.json  -> como estamos usando public debemos configurar esa ruta 

``` 
<code>
  "scripts": {
    "dev": " build:css && next dev",
    "build": "build:css && next build",
    "start": "build:css && next start",
    "build:css": "postcss public/assets/tailwind.css -o public/assets/main.css",
    "watch:css": "postcss public/assets/tailwind.css -o public/assets/main.css -w"
  },
``` 
- Editamos el archivo principal que en este caso es: _app.js 
  debemos decirle que deje apuntar al tailwind que esta en el module y que ahora apunte a nuestro archivo main.css 
  creamos en nuestro public el main.css ->vacio 
``` 
import './public/assets/main.css';
``` 
  
- `npm i react-google-recaptcha`-> Ejecutalo dentro de tu proyecto
- `npm install @heroicons/react` -> para usar iconos ->https://heroicons.dev/  -> Ejecutalo dentro de tu proyecto
- `npm list --depth=0`


#### Desarrollo Front  Mobil

### Es mi forma de Practicar lo Nuevo de React 

### Perspectiva
- Aprender NEXT - (Interfaz para Desktop)     - Front 
- Aprender Node.js - Express - (servicio web) - Back
- Aprender React-Native - (App mobil)         - Front

### Cosas que quedan pendiente Se iran aprendiendo en el camino. 
- Tailwind
- react-native
- maquetación
- Diseño 

### Fechas

- Analisis         -> IEnero2021 - FMarzo3121 
- Desarrollo Back  -> IMayo0121 - FMayo3121
- Desarrollo Front -> IMayo3121 - FACtual
- Deasrollo Mobil  -> Estudiando en Udemy  

### Link de Apoyos  
https://pandao.github.io/editor.md/en.html

### Link de Guias 
- [Guia para Back](https://docs.google.com/document/d/1XUuNH7dnrRydDHygcJM-Mqaxtfcih-i49stPy0IMwLA/edit#)
- [Estudios - Platzi](https://platzi.com/p/LEONARDCUENCA/)
- [Estudios - Udemy](https://www.udemy.com/user/leonard-cuenca-roa/)

