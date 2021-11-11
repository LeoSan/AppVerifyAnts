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
- `npm i cors` -> para evitar los cross
- `npm install bcrypt` -> Paquete para generar contraseña
- `npm i jsonwebtoken` -> Paquete para generar los token
- `npm i log4js` ->  Paquete para manejar los logs
- `npm i express-validator` -> Para validar los router
- `npm i nodemailer` -> Paquete para enviar correos
- `npm i colors`-> Paquete para colocar color a los texto en el servidor
- `npm run dev` -> Iniciador 

#### Desarrollo Front  Desktop
- Next.Js 
- Tailwind css 

#### Comandos Front  
- `npx create-next-app -e with-tailwindcss my-project`->Esto ya te genera toda la configuración para tail tambien se puede hacer [manualmente](https://tailwindcss.com/docs/guides/nextjs)
- `npm install tailwindcss postcss-cli autoprefixer -D` -> Ejecutalo dentro de tu proyecto
- `npx tailwindcss init` -> Crea el archivo configurador deTailwind 
- Configuramos nuestro archivo en la raiz `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},//Para que sea compatible con todos los navegadores web 
  },
}

```
- Creamos la carpeta `assets` y el archivo `tailwind.css` como es next improvisare colocarla en public todo `\public\assets\tailwind.css`
```javascript

@tailwind base;
@tailwind components;
@tailwind utilities;
//Aqui puedes crear tus componenetes 
```
- Editamos el package.json  -> como estamos usando public debemos configurar esa ruta 

```javascript 
  "scripts": {
    "dev": "npm run build:css && next dev",
    "build": "npm run watch:css && next build",
    "start": " npm run build:css && next start",
    "build:css": "postcss public/assets/tailwind.css -o public/assets/main.css",
    "watch:css": "postcss public/assets/tailwind.css -o public/assets/main.css -w"
  },
``` 
- Editamos el archivo principal que en este caso es: _app.js 
  debemos decirle que deje apuntar al tailwind que esta en el module y que ahora apunte a nuestro archivo main.css 
  creamos en nuestro public el main.css ->vacio 
```javascript 
import './public/assets/main.css';
``` 
  
- `npm i react-google-recaptcha`-> Ejecutalo dentro de tu proyecto
- `npm install @heroicons/react` -> para usar iconos ->https://heroicons.dev/  -> Ejecutalo dentro de tu proyecto
- `npm i formik` -> Para instalar un validador de formularios
- `npm i yup` -> Para manejar esquemas de validaciones 
- `npm i react-router-dom` -> Para los redireccionamientos a paginas usando -> useNavigate
- `npm i axios` -> esto nos permitira consumir los ends point que desarrollamos en el servidor back 

>Nota: En esta Etapa creamos nuestro archivo ./config/ y definimos nuestros axios.js y auth.js 

>Nota 2: Iniciamos en crear nuestra estrcutura ./context/nombreContext.js , nombreReducer.js , nombreState.js y nuestros ./type/index.js en raiz

>Nota 3: Recuerda que si vas ausar recudecer y context debes tambien hacer el ajuste en el archivo raiz iniciador para Next es _app.js, importas tu cantidad de state y lo incoporas como un componente en el return.  Ejemplo 
```javascript
import AuthState from '../context/auth/authState';

 <AuthState>
           
                <Component { ...pageProps }  />
           
        </AuthState>
```
- `npm list --depth=0`
- `npm run dev` -> inicamos el front!!  

#### Desarrollo Front  Mobil


# Recordatorios Importantes

- [ ]Recordario 001: Recuerda que si deseas usar archivos en tu codigo fuente debes crear en public una carptea `static` ya que asi internamente lo renoce para referenciar Ejemplo-> 
```
//Para este ejemplo es para reproducir un audio 
//Audio 
var audio = new Audio('/static/audio/new-ticket.mp3');
audio.play();
```




   
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

- [x] Analisis         -> IEnero2021 - FMarzo3121 
- [x] Desarrollo Back  -> IMayo0121 - FMayo3121
- [ ] Desarrollo Front -> IMayo3121 - FACtual
- [ ] Deasrollo Mobil  -> Estudiando en Udemy  

### Link de Apoyos  
https://pandao.github.io/editor.md/en.html

### Link de Guias 
- [Guia para Back](https://docs.google.com/document/d/1XUuNH7dnrRydDHygcJM-Mqaxtfcih-i49stPy0IMwLA/edit#)
- [Estudios - Platzi](https://platzi.com/p/LEONARDCUENCA/)
- [Estudios - Udemy](https://www.udemy.com/user/leonard-cuenca-roa/)

