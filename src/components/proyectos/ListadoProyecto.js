import React, { useContext,useEffect } from 'react'; 
import Proyecto from './Proyecto';

import { TransitionGroup, CSSTransition} from 'react-transition-group';

import proyectoContext from '../../context/proyectos/proyectosContext';
import AlertaContext from '../../context/alerts/alertaContext';


const ListadoProyectos = () => {

    //Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje,proyectos,obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta,mostrarAlerta } = alertaContext;

    //obtener proyectos cuando carga el componente
    useEffect(() => {

          //if are an error
          if(mensaje){
               mostrarAlerta(mensaje.msg, mensaje.categoria);
          }

          obtenerProyectos();
          //eslint-disable-next-line
    }, [mensaje]);

    //revisar si proyecto tiene contenido
    if(proyectos.length === 0 ) return <p>No projects, create a new one</p>;

    return ( 
        <ul className="listado-proyectos">
           { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null}  
           <TransitionGroup>
                {proyectos.map(proyecto => (
                   <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                   >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                   </CSSTransition>
                ))}
           </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;