import clienteAxios from './axios';//Este es el archivo 

const tokenAuth = token =>{
    if(token){
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        clienteAxios.defaults.headers.common['x-auth-token'] = `${token}`; 
        return true;
    }else{
        delete clienteAxios.defaults.headers.common['Authorization'];
        return false;
    }
}

export default tokenAuth; 