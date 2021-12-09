import React from "react";
import HomePageNavigation from "../../CommonComponents/HomePageNavigation";
import LoginModal from "../../CommonComponents/modals/LoginModal";
import CreateAccountModal from "../../CommonComponents/modals/CreateAccountModal";

class HomeIndex extends React.Component{

    homeContents = <div className="row mt-5">
        <div className="col-md-1"/>
        <div className="col-md-5 bg-secondary p-5">
            <h1 className="main-page-heading">Make shopping simpler</h1>
            <p className="lead">Mercator is a modern and minimalist online store creator, designed to be used by anyone. Get
                started with 1 free store and 10 products.</p>
            <button type="button" className="btn btn-dark">Get Started</button>
        </div>
        <div className="col-md-5 main-page-hero-image"/>
        <div className="col-md-1"/>
    </div>

    render() {
        return [
            <HomePageNavigation/>,
            this.homeContents,
            <LoginModal/>,
            <CreateAccountModal/>
        ]
    }
}

export default HomeIndex;