import React, { useContext } from 'react'; 

import tareaContext from '../../context/Tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectosContext';

const Tarea = ({tarea}) => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //destructuring
    const [proyectoActual] = proyecto;
  

    //obtain the function of the context for the task
    const tareasContext = useContext(tareaContext);
    const { actualizarTarea,eliminarTarea, obtenerTareas, guardarTareaActual } = tareasContext;

    //function eject when the user push the botton delete
    const tareaEliminar = id => {
        
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    } 

    //FUCTION to modify the state for the task
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //Add current task when user wants to edit it
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombre">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado 
                ? 
                    (
                        <button 
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :

                    (
                        <button 
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
            }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;
