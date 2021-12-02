import React from "react";
import {Routes,Route} from "react-router-dom";
import HomePageNavigation from "./Components/HomePageNavigation";
import HomePageContents from "./Components/HomePageContents";
import PricingPageContents from "./Components/PricingPageContents";
import AboutPageContents from "./Components/AboutPageContents";
import LoginModal from "./Components/LoginModal";
import CreateAccountModal from "./Components/CreateAccountModal";
//import ToastManager from "./Components/ToastManager";

class HomeIndex extends React.Component{
    render() {
        return [
            <HomePageNavigation/>,
            <Routes>
                <Route path="/" element={<HomePageContents />} />
                <Route path="pricing" element={<PricingPageContents/>} />
                <Route path="about" element={<AboutPageContents/>} />
            </Routes>,
            <LoginModal/>,
            <CreateAccountModal/>
        ]
    }
}

export default HomeIndex;