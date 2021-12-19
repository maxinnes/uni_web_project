import React from "react";
import {NavLink} from "react-router-dom";
import styles from '../../scss/WelcomePages.module.css';

// old class home-nav
export default function HomeNavigation(){

    return <nav className="home-nav">
        <ul className="nav">
            {/*<li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/">Home</NavLink></li>*/}
            {/*<li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/pricing">Pricing</NavLink></li>*/}
            {/*<li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/about">About</NavLink></li>*/}
            <li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/pricing">Pricing</NavLink></li>
            <li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/about">About</NavLink></li>
        </ul>
    </nav>
}