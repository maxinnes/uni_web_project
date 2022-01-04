import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";
import {Outlet, NavLink} from "react-router-dom";
import styles from '../scss/AccountDashboard.module.css';
import Logo from "../CommonComponents/nav/Logo";

export default function AccountDashboardLayout(){
    let auth = useContext(AuthContext)
    let navigate = useNavigate()

    useEffect(()=>{
        auth.updateIsLoggedIn()
            .then((result)=>{
                if(!result){
                    navigate("/")
                }
            })
        auth.getAccountAuthDetails().then((result)=>{
            if(!result.doesUserHaveSubscription){
                navigate("/finishAccountSetup")
            }
        })
    },[])

    const logoutButton = ()=>{
        auth.logout()
        navigate("/")
    }

    return <>
        <header>
            <div className="bg-dark text-white">
                <div className="container-fluid">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <NavLink to="/">
                            <Logo/>
                        </NavLink>

                        <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small pt-1">
                            <li>
                                <NavLink to="/dashboard" className="d-flex flex-column justify-content-center align-items-center">
                                    <i className={`fas fa-tachometer-alt fs-1 ${styles.navigationBarLinks}`} />
                                    {/*<NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink>*/}
                                    <p className="nav-link text-white">Dashboard</p>
                                </NavLink>
                            </li>
                            <li className="d-flex flex-column justify-content-center align-items-center">
                                <NavLink to="account" className="d-flex flex-column justify-content-center align-items-center">
                                    <i className={`fas fa-user-circle fs-1 ${styles.navigationBarLinks}`}/>
                                    {/*<NavLink to="account" className="nav-link text-white">Account Management</NavLink>*/}
                                    <p className="nav-link text-white">Account Management</p>
                                </NavLink>
                            </li>
                            <li className="d-flex flex-column justify-content-center align-items-center">
                                <NavLink to="storeManager" className="d-flex flex-column justify-content-center align-items-center">
                                    <i className={`fas fa-cash-register fs-1 ${styles.navigationBarLinks}`}/>
                                    {/*<NavLink to="storeManager" className="nav-link text-white">Store Management</NavLink>*/}
                                    <p className="nav-link text-white">Store Management</p>
                                </NavLink>
                            </li>
                        </ul>
                        <a className={`link-primary ${styles.logoutLink}`} onClick={logoutButton}>Logout</a>
                    </div>
                </div>
            </div>
        </header>

    <div className="container">
        <div className="row">
            <main className="col-md-12 col-lg-12">
                <Outlet/>
            </main>
        </div>
    </div>
    </>
}