import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";
import {Outlet, NavLink} from "react-router-dom";
import '../scss/AccountDashboard.module.css';

export default function AccountDashboardLayout(){
    let auth = useContext(AuthContext)
    let navigate = useNavigate()

    const logoutButton = ()=>{
        auth.logout()
        navigate("/")
    }

    return <>
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">MERCATOR</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" onClick={logoutButton}>Logout</a>
                </div>
            </div>
    </header>

    <div className="container-fluid">
        <div className="row">
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to="" activeClassName="active" className="nav-link">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="account" activeClassName="active" className="nav-link">
                                Account Management
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Store Manager
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Outlet/>
            </main>
        </div>
    </div>
    </>
}