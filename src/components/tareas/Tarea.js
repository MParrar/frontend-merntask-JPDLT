import { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from "../../context/proyecto/proyectoContext";


export const Tarea = ({ tarea }) => {
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    const [proyectoActual] = proyecto

    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado;
        actualizarTarea(tarea)
        obtenerTareas(proyectoActual._id);

    }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }
    return (
        <li className="tarea sombra">
            <p> {tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ?
                    (<button
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                    >
                        Completo</button>)
                    :
                    (<button
                        type="button"
                        onClick={() => cambiarEstado(tarea)}
                        className="incompleto"
                    >
                        Incompleto</button>)
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    )
}
