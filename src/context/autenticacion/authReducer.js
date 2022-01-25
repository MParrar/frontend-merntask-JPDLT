import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types";


export default (state, action) => {
    switch (action.type) {

        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                autenticado: false,
                usuario: null,
                token: null,
                mensaje: action.payload,
                cargando: true
            }

        default:
            return state;
    }
}