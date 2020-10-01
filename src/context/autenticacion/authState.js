import React, {  useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import ClienteAxios from '../../config/axios';
import tokenAuth from '../../config/token.js';


import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OBTENER_USUARIO
} from '../../types';
import clienteAxios from '../../config/axios';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [ state, dispatch ] = useReducer( authReducer, initialState );

    //Functions 
    const registrarUsuario = async datos => {
        try {
            
            const respuesta = await ClienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //obtain the user
            usuarioAutenticado();
        } catch (error) {

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //retorna el usuario autenticado
    const  usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,

            })
        }
    }

    //when the user log in
    const iniciarSesion = async datos => {
        try {
            
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            //obtain the user
            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //close the session of the user
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;