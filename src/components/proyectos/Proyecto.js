import React,{ useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectosContext';
import tareaContext from '../../context/Tareas/tareaContext';


const Proyecto = ({proyecto}) => {

     //obtener el state de proyectos
     const proyectosContext = useContext(proyectoContext);
     const { proyectoActual } = proyectosContext;

     //obtain the function of the context for the task
     const tareasContext = useContext(tareaContext);
     const { obtenerTareas } = tareasContext;

     //function to add the actual project
     const seleccionarProyecto = id => {
        proyectoActual(id); //pin a current project
        obtenerTareas(id); //filter the task when the user press click
     }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick= {() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;