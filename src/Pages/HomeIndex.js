import styles from '../scss/WelcomePages.module.css';

function HomeIndex() {
    return <div className="row mt-5">
        <div className="col-md-1"/>
        <div className="col-md-5 bg-secondary p-5">
            <h1>Make shopping simpler</h1>
            <p className="lead">Mercator is a modern and minimalist online store creator, designed to be used by anyone.
                Get
                started with 1 free store and 10 products.</p>
            <button data-bs-toggle="modal" data-bs-target="#createAccountModal" type="button" className="btn btn-dark">Get Started</button>
        </div>
        <div className={`col-md-5 ${styles["main-page-hero-image"]}`}/>
        <div className="col-md-1"/>
    </div>
}

export default HomeIndex;