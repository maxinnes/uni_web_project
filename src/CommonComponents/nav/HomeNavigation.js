import React from "react";
import {Link, NavLink} from "react-router-dom";

class HomeNavigation extends React.Component{
    render() {
        // return <nav className="nav justify-content-center">
        //     <Link className="nav-link" to="/">Home</Link>
        //     <Link className="nav-link" to="/pricing">Pricing</Link>
        //     <Link className="nav-link" to="/about">About</Link>
        // </nav>
        return <nav>
            <ul className="nav">
                <li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/">Home</NavLink></li>
                <li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/pricing">Pricing</NavLink></li>
                <li className="nav-item mx-2"><NavLink activeClassName="active" className="nav-link" to="/about">About</NavLink></li>
            </ul>
        </nav>
    }
}

export default HomeNavigation;