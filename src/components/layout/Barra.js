import { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext"

export const Barra = () => {

    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario, cerraSesion } = authContext;
    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
                : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerraSesion()}
                >
                    Cerrar Sesion
                </button>
            </nav>
        </header>
    )
}
