// Routing components
import {Outlet} from "react-router-dom";
// Import components
import HomePageNavigation from "../CommonComponents/nav/HomePageNavigation";
import LoginModal from "../CommonComponents/modals/LoginModal";
import CreateAccountModal from "../CommonComponents/modals/CreateAccountModal";

function WelcomePages(){
    return <div className="container mt-4">
        <HomePageNavigation />
        <Outlet />
        <CreateAccountModal />
        <LoginModal />
    </div>
}

export default WelcomePages