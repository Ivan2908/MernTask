import React, {useContext ,Fragment} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectosContext';
import tareaContext from '../../context/Tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {
  
    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto,eliminarProyecto } = proyectosContext;
    
    //obtain the task for the project
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;

    //if there are no proyects.
    if(!proyecto) return <h2>Select a Project</h2>

    //array destructuring for extract the actual pryect
    const [proyectoActual ] = proyecto;

    //delete a project
    const onclickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length ===0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                           <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                           >
                                <Tarea 
                                    tarea={tarea}
                                />
                           </CSSTransition>
                        ))}
                    </TransitionGroup>
                    
                }
            </ul> 

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={onclickEliminar}
            >Eliminar Proyecto &times;</button>    

        </Fragment>
     );
}
 
export default ListadoTareas;