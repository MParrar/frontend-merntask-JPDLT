import { useContext, useEffect } from "react"
import proyectoContext from "../../context/proyecto/proyectoContext"
import AlertaContext from '../../context/alertas/alertasContext';
import { Proyecto } from "./Proyecto"
import { CSSTransition, TransitionGroup } from 'react-transition-group';



export const Listado = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos, mensaje } = proyectosContext;
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje])
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;
    return (
        <ul className="listado-proyectos">
            {alerta && <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>}
            <TransitionGroup>
                {proyectos.map(item => (
                    <CSSTransition
                        key={item._id}
                        timeout={200}
                        classNames="proyecto"

                    >
                        <Proyecto
                            proyecto={item}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}
