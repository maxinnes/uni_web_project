import React from "react";
import {Link} from "react-router-dom";

class HomeNavigation extends React.Component{
    render() {
        return <nav className="nav justify-content-center">
            <Link className="nav-link active" to="/">Home</Link>
            <Link className="nav-link" to="/pricing">Pricing</Link>
            <Link className="nav-link" to="/about">About</Link>
            {/*<a className="nav-link active" href="/">Home</a>*/}
            {/*<a className="nav-link" href="/">Pricing</a>*/}
            {/*<a className="nav-link" href="/">About</a>*/}
        </nav>
    }
}

export default HomeNavigation;