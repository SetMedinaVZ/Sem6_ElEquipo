import React from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = ({pagina}) => {
    
    return (
        <div className="nav-bar">
            <Link className={`link home ${pagina === "home" ? "home_f" : ""}`} to="/"></Link>
            <Link className={`link quests ${pagina === "quests" ? "quests_f" : ""}`} to="/quests"></Link>
            <Link className={`linkScan escaneo ${pagina === "escaneo" ? "escaneo_f" : ""}`} to="/escaneo"></Link>
            <Link className={`link carrito ${pagina === "carrito" ? "carrito_f" : ""}`} to="/carrito"></Link>
            <Link className={`link cupones ${pagina === "cupones" ? "cupones_f" : ""}`} to="/cupones"></Link>
        </div>
    )
}

export default NavBar