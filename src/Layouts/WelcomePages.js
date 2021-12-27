// Routing components
import {Outlet} from "react-router-dom";
// Styling
import '../scss/WelcomePages.module.css';
// Import components
import HomePageNavigation from "../CommonComponents/nav/HomePageNavigation";
import LoginModal from "../CommonComponents/modals/LoginModal";
import CreateAccountModal from "../CommonComponents/modals/CreateAccountModal";

function WelcomePages(){
    return <div className="container mt-4">
        <HomePageNavigation />
        <Outlet />
        <footer className="row mt-5">
            <p className="text-center text-muted">© 2021 Mercator</p>
        </footer>
        <CreateAccountModal />
        <LoginModal />
    </div>
}

export default WelcomePages