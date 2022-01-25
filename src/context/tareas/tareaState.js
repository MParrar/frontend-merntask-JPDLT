import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { ACTUALIZAR_TAREA, AGREGAR_TAREA, LIMPIAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from "../../types";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";



const TareaState = props => {
    const initialState = {

        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    };
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
        }
    }

    const agregarTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta.data.tarea
            })
        } catch (error) {
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {

        try {
            await clienteAxios.delete(`api/tareas/${id}`, { params: { proyecto } })
        } catch (error) {
        }
    }


    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
        }
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>

    )
}

export default TareaState;