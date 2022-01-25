import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { AGREGAR_PROYECTOS, ELIMINAR_PROYECTO, FORMULARIO_PROYEXTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, PROYECTO_ERROR, VALIDAR_FORMULARIO } from "../../types";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";


const ProyectoState = props => {

    const inicialState = {
        formulario: false,
        proyectos: [],
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }
    const [state, dispatch] = useReducer(proyectoReducer, inicialState);

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYEXTO
        })
    }

    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
        }
    }

    const agregarProyecto = async proyecto => {
        try {
            const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: respuesta.data
            })
        } catch (error) {
        }

    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    return (
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;