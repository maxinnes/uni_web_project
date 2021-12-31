import Logo from "./Logo";
import HomeNavigation from "./HomeNavigation";
import AccountButtons from "./AccountButtons";

//
//
//

function HomePageNavigation(){
    return <div className="row">
            <div className="col-lg-3">
                <Logo/>
            </div>
            <div className="col-lg-6 my-3 my-lg-0 d-flex flex-row justify-content-center align-items-center">
                <HomeNavigation/>
            </div>
            <div className="col-lg-3 d-flex flex-row justify-content-center align-items-center flex-nowrap">
                <AccountButtons/>
            </div>
        </div>
}

export default HomePageNavigation;