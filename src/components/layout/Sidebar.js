import { Listado } from "../proyectos/Listado"
import { NuevoProyecto } from "../proyectos/NuevoProyecto"

export const Sidebar = () => {
    return (
        <aside>
            <h1>MERN <span>Task</span></h1>
            <NuevoProyecto />
            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <Listado />
            </div>
        </aside>
    )
}
