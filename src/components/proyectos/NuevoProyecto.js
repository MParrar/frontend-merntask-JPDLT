import { useContext, useState } from "react"
import proyectoContext from "../../context/proyecto/proyectoContext";

export const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;
    const [proyecto, setProyecto] = useState({
        nombre: '',
    });
    const { nombre } = proyecto;
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitProyecto = e => {
        e.preventDefault();

        if (!nombre) {
            mostrarError();
            return;
        }
        agregarProyecto(proyecto);
        setProyecto({
            nombre: ""
        })

    }
    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
            {formulario &&
                (<form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type={"text"}
                        className="input-text"
                        placeholder="Nombre proyecto"
                        name="nombre"
                        onChange={onChangeProyecto}
                        value={nombre}
                    />
                    <input
                        type={"submit"}
                        className="btn btn-primario btn-block"
                        value={"Agregar proyecto"}
                    />
                </form>)}
            {errorFormulario && <p className="mensaje error"> El nombre del proyecto es obligatorio</p>}
        </>
    )
}
