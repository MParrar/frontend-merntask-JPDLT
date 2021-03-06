import { useContext } from "react";
import proyectoContext from "../../context/proyecto/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";


export const Proyecto = ({ proyecto }) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    const seleccionarProyecto = id => {
        proyectoActual(id);
        obtenerTareas(id);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    )
}
