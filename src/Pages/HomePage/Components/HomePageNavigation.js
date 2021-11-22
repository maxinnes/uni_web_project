import React from "react";
import Logo from "./Logo";
import HomeNavigation from "./HomeNavigation";
import AccountButtons from "./AccountButtons";

class HomePageNavigation extends React.Component{
    render() {
        return <div className="row">
            {/*<div className="col-md-3 d-flex flex-row justify-content-center align-items-center">*/}
            <div className="col-md-3">
                <Logo/>
            </div>
            <div className="col-md-6 d-flex flex-row justify-content-center align-items-center">
                <HomeNavigation/>
            </div>
            <div className="col-md-3 d-flex flex-row justify-content-center align-items-center flex-nowrap">
                <AccountButtons/>
            </div>
        </div>
    }
}

export default HomePageNavigation;