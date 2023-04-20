import React from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = ({handleNavToggle}) => {
    return (
        <div className="nav-bar">
            <Link className={'link perfil'} to="/perfil"></Link>
            <Link className={"link quests"} to="/quests"></Link>
            <Link className={"linkScan escaneo"} to="/escaneo"></Link>
            <Link className={"link carrito"} to="/carrito"></Link>
            <Link className={"link cupones"} to="/cupones"></Link>
        </div>
    )
}

export default NavBar