import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext";

export default function AccountButtons(){
    let auth = useContext(AuthContext)

    // Define buttons
    const loggedOutButtons = <>
        <button type="button" className="btn btn-outline-dark me-3" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createAccountModal">Sign up</button>
    </>
    const loggedInButtons = <>
        <button onClick={auth.logout} type="button" className="btn btn-outline-dark me-3">Logout</button>
        <NavLink to="/dashboard">
            <button type="button" className="btn btn-dark">Dashboard</button>
        </NavLink>
    </>

    return auth.isLoggedIn ? loggedInButtons : loggedOutButtons
}