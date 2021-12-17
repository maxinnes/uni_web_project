import styles from '../scss/FinishAccountSetup.module.css'
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Logo from "../CommonComponents/nav/Logo";
import {SubscriptionCheckoutContext} from "../Context/SubscriptionCheckoutContext";

export default function FinishAccountSetupLayout(){

    useEffect(()=>{
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.querySelectorAll('.needs-validation')
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    },[])

    return <SubscriptionProvider>
        <div className={"container "+styles.container}>
            <main>
                <div className="py-5 text-center">
                    {/*<img className="d-block mx-auto mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>*/}
                    <Logo />
                    <h2 className="mt-3">Finish Account Creation</h2>
                </div>
                <Outlet/>
            </main>

            <footer className="my-5 pt-5 text-muted text-center text-small">
                <p className="mb-1">&copy; 2017–2021 Company Name</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        </div>
    </SubscriptionProvider>
}

function SubscriptionProvider({children}){
    let [subscriptionChoice,setSubscriptionChoice] = useState("1")
    let value = {subscriptionChoice,setSubscriptionChoice}
    return <SubscriptionCheckoutContext.Provider value={value} >{children}</SubscriptionCheckoutContext.Provider>
}