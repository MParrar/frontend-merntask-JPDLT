import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import AlertaContext from "../../context/alertas/alertasContext";
import AuthContext from "../../context/autenticacion/authContext";

export const Login = () => {

    let history = useNavigate();
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { iniciarSesion, mensaje, autenticado } = authContext;

    useEffect(() => {
        if (autenticado) {
            history('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, history]);

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });
    const { email, password } = usuario;
    const onChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        iniciarSesion({ email, password });

    }
    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type={"email"}
                            id="email"
                            name="email"
                            placeholder="Aquí tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type={"password"}
                            id="password"
                            name="password"
                            placeholder="Aquí tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input type={"submit"} className="btn btn-primario btn-block"
                            value={"Iniciar Sesión"} />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>

        </div>
    )
}
