import styles from '../scss/FinishAccountSetup.module.css'
import {useState} from "react";
import {Outlet} from "react-router-dom";
import Logo from "../CommonComponents/nav/Logo";
import {SubscriptionCheckoutContext} from "../Context/SubscriptionCheckoutContext";

export default function FinishAccountSetupLayout(){
    return <SubscriptionProvider>
        <div className={"container "+styles.container}>
            <main>
                <div className="py-5 text-center">
                    <Logo />
                    <h2 className="mt-3">Finish Account Creation</h2>
                </div>
                <Outlet/>
            </main>

            <footer className="my-5 pt-5 text-muted text-center text-small">
                <p className="mb-1">&copy; 2021 Mercator</p>
            </footer>
        </div>
    </SubscriptionProvider>
}

function SubscriptionProvider({children}){
    let [subscriptionChoice,setSubscriptionChoice] = useState(null)
    let value = {subscriptionChoice,setSubscriptionChoice}
    return <SubscriptionCheckoutContext.Provider value={value} >{children}</SubscriptionCheckoutContext.Provider>
}