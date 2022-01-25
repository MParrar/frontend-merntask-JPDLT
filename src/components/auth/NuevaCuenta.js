import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import AlertaContext from "../../context/alertas/alertasContext";
import AuthContext from "../../context/autenticacion/authContext";

export const NuevaCuenta = (props) => {
    let history = useNavigate();
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
    const authContext = useContext(AuthContext);
    const { registrarUsuario, mensaje, autenticado } = authContext;

    useEffect(() => {
        if (autenticado) {
            history('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, history]);


    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });
    const { email, password, confirmar, nombre } = usuario;
    const onChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        if (password.length < 6) {
            mostrarAlerta('La password debe ser minima de 6 caracteres', 'alerta-error')
            return;
        }

        if (password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error')
        }
        registrarUsuario({
            nombre,
            email,
            password
        })

    }
    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            type={"text"}
                            id="nombre"
                            name="nombre"
                            placeholder="Aquí tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
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
                        <label htmlFor="password">
                            Confirmar  Password
                        </label>
                        <input
                            type={"password"}
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input type={"submit"} className="btn btn-primario btn-block"
                            value={"Registrarme"} />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}
