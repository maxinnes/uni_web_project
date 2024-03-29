import styles from '../scss/WelcomePages.module.css';
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext";
import {Link} from "react-router-dom";

function HomeIndex() {
    let auth = useContext(AuthContext)

    return <>
    <div className="row mt-5 shadow-lg">
        <div className="col-md-6  p-5">
            <h1>Make shopping simpler</h1>
            <p className="lead">Mercator is a modern and minimalist online store creator, designed to be used by anyone.
                Get
                started with 1 free store and 10 products.</p>
            {auth.isLoggedIn ? <Link to="dashboard"><button className="btn btn-dark">Dashboard</button></Link> : <button data-bs-toggle="modal" data-bs-target="#createAccountModal" type="button"
                     className="btn btn-dark">Get Started</button>}
        </div>
        <div className={`col-md-6 ${styles["main-page-hero-image"]}`}/>
    </div>
    <div className="row my-5 text-center">
        <h1 className="display-4 fw-bold">Full dashboard</h1>
        <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">All plans come with a full dashboard to manage and complete orders.</p>
        </div>
        <div className="overflow-hidden" style={{maxHeight: "30vh"}}>
            <div className="container px-5">
                <img src="/hero_image.png" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image"
                     width="700" height="500" loading="lazy"/>
            </div>
        </div>
    </div>
    </>
}

export default HomeIndex;