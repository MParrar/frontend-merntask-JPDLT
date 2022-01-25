import { Tarea } from "./Tarea"
import proyectoContext from "../../context/proyecto/proyectoContext";
import tareaContext from '../../context/tareas/tareaContext'
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export const ListadoTareas = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext
    if (!proyecto) return null;
    const [proyectoActual] = proyecto;
    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasProyecto.length === 0 ?
                    (<li className="tarea">No hay tareas</li>)
                    :
                    <TransitionGroup>
                        {tareasProyecto.map((item) => (
                            <CSSTransition
                                timeout={200}
                                classNames="tarea"
                                key={item._id}>
                                <Tarea

                                    tarea={item}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >Eliminar proyectos &times;</button>
        </>
    )
}
