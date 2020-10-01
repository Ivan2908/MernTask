import React, { useReducer } from 'react';

import clienteAxios from '../../config/axios';

import proyectoContext from './proyectosContext';
import proyectoReducer from './proyectoReducer';
import { 
        FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECYO
} from '../../types';


const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario : false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener los proyectos
    const obtenerProyectos = async () => {
        try {
           const resultado = await clienteAxios.get('/api/proyectos');
           
           dispatch({
               type: OBTENER_PROYECTOS,
               payload: resultado.data.proyectos
           })

        } catch (error) {

            const alerta = {
              msg: 'Hubo un error',
              categoria: 'alerta-error'
            }
  
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //agregar nuevo proyecto
   const agregarProyecto = async proyecto => {
        
       try {
           const resultado = await clienteAxios.post('/api/proyectos', proyecto);
           
           dispatch({
               type: AGREGAR_PROYECTO,
               payload: resultado.data
           })

       } catch (error) {

            const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
    }
   }


   //VALIDARE EL FORMULARIO POR ERRRORES
   const mostrarError = () => {
       dispatch({
           type: VALIDAR_FORMULARIO
       })
   }

   //seleccion el proyecto que usuario dio click
   const proyectoActual = proyectoId => {
       dispatch({
           type: PROYECTO_ACTUAL,
           payload: proyectoId
       })
   }

   //DELETE A PROJECT
   const eliminarProyecto = async proyectoId => {
      try {

          await clienteAxios.delete(`api/proyectos/${proyectoId}`);

          dispatch({
              type: ELIMINAR_PROYECYO,
              payload: proyectoId
          })

      } catch (error) {

          const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
          }

          dispatch({
              type: PROYECTO_ERROR,
              payload: alerta
          })
      }
   }


    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario : state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
               
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;