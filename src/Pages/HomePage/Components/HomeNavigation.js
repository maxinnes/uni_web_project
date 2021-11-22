import React from "react";
import {Link} from "react-router-dom";

class HomeNavigation extends React.Component{
    render() {
        return [<nav className="nav justify-content-center">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/pricing">Pricing</Link>
            <Link className="nav-link" to="/about">About</Link>
        </nav>,
            <div className="navigation-dot-container">
                <div className="navigation-dot" />
            </div>]
    }
}

export default HomeNavigation;