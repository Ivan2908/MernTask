import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';

import { MOSTRAR_ALERTA, LIMPIAR_ALERTA } from '../../types';

const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] =useReducer(alertaReducer, initialState);

    //Functions
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        //after 5 seconds the message dissapear.
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 5000);
    }

    return (
        <alertaContext.Provider
            value= {{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
 
}

export default AlertaState;