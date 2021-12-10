// Routing components
import {Outlet} from "react-router-dom";
// Import components
import HomePageNavigation from "../CommonComponents/nav/HomePageNavigation";
import LoginModal from "../CommonComponents/modals/LoginModal";
import CreateAccountModal from "../CommonComponents/modals/CreateAccountModal";

function WelcomePages(){
    return <>
        <HomePageNavigation />
        <Outlet />
        <CreateAccountModal />
        <LoginModal />
    </>
}

export default WelcomePages