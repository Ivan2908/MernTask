import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import alertaContext from '../../context/alerts/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extract the value of the context auth
    const authsContext = useContext(authContext);
    const { mensaje, autenticado, registrarUsuario } = authsContext;

    //extract the value of the context
    const alertasContext = useContext(alertaContext);
    const { alerta,mostrarAlerta } = alertasContext;

    //In case the user has been aunthenticated or registered or has a duplicate register.
    useEffect(() => {
        if(autenticado) {
            props.history.push('/proyectos');
        }

        if(mensaje) {
            mostrarAlerta( mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //State para iniciar sesion
    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar:''
    })


    const { nombre,email,password,confirmar } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar que no haya campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los Campos son obligatorios', 'alerta-error');
            return;
        }

        //password minimo de 6 caracteres
        if(password.length < 6) {
            mostrarAlerta('El password debe ser al menos de 6 caracteres', 'alerta-error');
            return;
        }

        //revisar que los 2 password sean iguales
        if(password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error')
        }

        //pasarlo al action
        registrarUsuario({ 
            nombre,
            email,
            password
         });
        
    }

    return ( 
        <div className="form-usuario">
            { alerta ?  ( <div className={ `alerta ${alerta.categoria}` }> {alerta.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1> Crear una Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre "> Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu nombre"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email "> Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu email"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password "> Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar "> Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Confirmar password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo.form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesion
                </Link>
            </div>
        </div>  
          
     );
}
 
export default NuevaCuenta;