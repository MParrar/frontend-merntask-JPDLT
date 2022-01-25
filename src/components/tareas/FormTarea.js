import { useContext, useEffect, useState } from "react"
import proyectoContext from "../../context/proyecto/proyectoContext"
import tareaContext from '../../context/tareas/tareaContext';



export const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea,
        limpiarTarea } = tareasContext;
    useEffect(() => {
        if (tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada);
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada]);

    const [tarea, setTarea] = useState({
        nombre: '',
        proyectoId: ''
    });
    const { nombre } = tarea;
    if (!proyecto) return <h2>selecciona un proyecto</h2>
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }
        if (tareaSeleccionada === null) {
            tarea.proyecto = proyecto[0]._id;
            agregarTarea(tarea);

        } else {
            actualizarTarea(tarea)
            limpiarTarea();

        }
        obtenerTareas(proyecto[0]._id)
        setTarea({
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
                        type={"text"}
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type={"submit"}
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errorTarea && <p className="mensaje error">El nombre de la tarea es obligatorio</p>}
        </div>
    )
}
