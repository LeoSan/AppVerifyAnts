//Importo Librerias 
import React, { useContext,  useState } from 'react';

//Importo componente re-captcha 
import ReCAPTCHA from 'react-google-recaptcha';

//Librerias para validación 
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Importamos nuestros  useContext (Hooks)
import UsuarioContext from '../../context/usuario/usuarioContext';
import AuthContext from '../../context/auth/AuthContext';

//componentes UI
import Error from '../ui/Error';
import Success from '../ui/Success';


const EditPass = () => {


    //Declaro mis useState 
    const [valcaptcha, setvalcaptcha] = useState(0);
    const [confirmaRobot, setconfirmaRobot] = useState(true);

    //Declaro Hooks -> UseContext para usar el state 
    //Acceder el state de auth 
    const valorContext = useContext(UsuarioContext);
    const { cambiarClave, mensaje, cambio, limpiarEstadoMensaje } = valorContext;

    const valorContextAuth = useContext(AuthContext);
    const {  nickEmail } = valorContextAuth;

    //Declaro Variables 


    //Metodos Funcionales 

    //función : Para capturar el valor del captcha 
    function getValCapctha(value) {
        setvalcaptcha(value);
        //console.log("Captcha value:", value);
    }



    //función: Esquema de validaciones 
    const formikPass = useFormik({
        initialValues: {
            password: '',
            password2: '',
        },
        validationSchema: Yup.object({

            password: Yup.string()
                .required('El campo password es obligatorio.')
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Debe contener mas de8 Characters, Un caracter en Mayuscula, Un caracter en miniscula, Un Numero y un caracter especial"
                ),

            password2: Yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Ambas contraseñas deben ser iguales"
                )
            }),
        }),

        onSubmit: formData => {
            try {

                //Valido si no es un robot 
                if (valcaptcha !== 0) {
                    formData.captcha = valcaptcha;
                    formData.email  = nickEmail;
                    formData.token = localStorage.getItem('token');
                    console.log(formData);
                    //Envio valores al state 
                    cambiarClave(formData);

                    //Dejo todo como estaba
                    setconfirmaRobot(true);
                    setvalcaptcha(0);
                    //Limpio el estado del mensaje 
                    limpiarEstadoMensaje(); 
                } else {
                    setconfirmaRobot(false);
                    //console.log(confirmaRobot);
                }

            } catch (error) {
                console.log(error);
            }
        }
    }); //fin del formikPass     

    return (

        <div id="divEditPass" className="flex justify-center mt-10">
            <div className="w-full max-w-3xl pl-3 pr-3 rounded-lg pt-3 bg-white mb-5 overflow-hidden shadow-lg">
                <form className="mb-8" onSubmit={formikPass.handleSubmit} action="POST">

                    <label
                        className="text-2xl font-bold text-yellow-500 " >Cambiar Contraseña   </label>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingrese Password"
                            value={formikPass.password}
                            onChange={formikPass.handleChange}
                            onBlur={formikPass.handleBlur}

                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                        />
                    </div>

                    {formikPass.touched.password && formikPass.errors.password ? (
                        <Error mensaje={formikPass.errors.password} ></Error>
                    ) : null}


                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">Confirmar Password </label>
                        <input
                            id="password2"
                            type="password"
                            placeholder="Confirme Password"
                            value={formikPass.password2}
                            onChange={formikPass.handleChange}
                            onBlur={formikPass.handleBlur}

                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md "
                        />
                    </div>

                    {formikPass.touched.password2 && formikPass.errors.password2 ? (
                        <Error mensaje={formikPass.errors.password2} ></Error>
                    ) : null}


                    <div className="mb-4 items-center">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2">¿ Eres un Robot ?</label>

                        <ReCAPTCHA className="flex items-center justify-center"
                            sitekey='6LdxEHIUAAAAAMhzsqkP-Q6ddj3xXkQwGTd38m9D'
                            onChange={getValCapctha}
                        />
                    </div>

                    {confirmaRobot == false ? (
                        <Error mensaje={'Debes validar que no eres un robot'} ></Error>
                    ) : null}


                    <input
                        type="submit"
                        className="btn-green cursor-pointer w-full mt-5 "
                        value="Cambiar Contraseña"
                    />
                    {mensaje != null && cambio == null ? (
                        <Error mensaje={mensaje} ></Error>
                    ) : null}


                    {mensaje != null && cambio != null ? (
                        <Success mensaje={mensaje} ></Success>
                    ) : null}
                </form>
            </div>
        </div>





    );
}

export default EditPass;