
import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';


import clienteAxios from '../../config/axios';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA

} from '../../types';


const TareaState = props => {
    const initalState = {
        tareasproyecto: [],
        tareaseleccionada: null,
        errortarea: false

    }

    //dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initalState);

    //create a functions

    //obtain the task for a project
    const obtenerTareas = async proyecto => {
        
        try {
                
          const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } })
          console.log(resultado);       
          dispatch({
              type: TAREAS_PROYECTO,
              payload: resultado.data.tareas
         })  
        } catch (error) {
             console.log(error)
        }
    }

    //ADD a task for the select project
    const agregarTarea = async tarea => {    
        
       try {
           const resultado = await clienteAxios.post('/api/tareas', tarea);
           console.log(resultado);
           dispatch({
               type: AGREGAR_TAREA,
               payload: tarea
           })
       } catch (error) {
           console.error(error)
       }
    }

    //VALide and show a error if is neccesarie
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA    
        })
    }

    //delete the task with the id
    const eliminarTarea = async (id, proyecto) => {
        
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

        } catch (error) {
            console.log(error)
        }
    }

    //EXTRACT a task for edition 
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Edit or modify a task
    const actualizarTarea = async tarea => {
       try {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
        
           
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tarea
        })
       } catch (error) {
           console.log(error);
       }
    }

    //DELETE THE tareasleccionada
    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }


    return (
        <tareaContext.Provider
            value = {{  
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
                
                
            }}
        >
            {props.children}
        </tareaContext.Provider>

    )
}

export default TareaState;