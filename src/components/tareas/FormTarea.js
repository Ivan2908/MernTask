import React, { useContext, useState,useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectosContext';
import tareaContext from '../../context/Tareas/tareaContext';

const FormTarea = () => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // state for the form
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })

    
    //obtain the function of the context for the task
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada,errortarea,agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //effect detect if a task is selected
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);

    //extract the name for the project
    const { nombre } = tarea;

    //if there are no proyects.
    if(!proyecto) return null;

    //array destructuring for extract the actual pryect
    const [proyectoActual ] = proyecto;

    //Read the values for the form
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //check
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // if is edition or if is a new task
        if(tareaseleccionada === null) {
            //add the new task for the principal state
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //update an existing task
            actualizarTarea(tarea);

            //delete tareasleccionada state
            limpiarTarea();
        }
        //obtain and filter the task of the actual project
        obtenerTareas(proyectoActual.id);

        //reset the form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
            
                onSubmit={onSubmit}

            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>

            { errortarea ? <p className="mensaje error"> The name of the task is obligatory</p> : null}
        </div>
     );
}
 
export default FormTarea;