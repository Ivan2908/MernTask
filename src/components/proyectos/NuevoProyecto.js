import React, {Fragment, useState, useContext} from 'react'; 
import proyectoContext from '../../context/proyectos/proyectosContext';

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario,agregarProyecto, mostrarError } = proyectosContext;

    //State para Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    //Lee los contenidos del input
    const onChangeProyectos = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //validar el proyecto
        if(nombre === '') {
            mostrarError();
            return;
        }

        //agregar al state
        agregarProyecto(proyecto);
       

        //reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    //Extraer nombre de proyecto
    const { nombre } = proyecto;

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>
            {
                formulario
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre del Poyecto"
                                name="nombre"
                                value= {nombre}
                                onChange={onChangeProyectos}
                            />
            
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />
                        </form>
                    )
                :    null
            }

            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio </p> : null}
        </Fragment> 
        
     );
}
 
export default NuevoProyecto;