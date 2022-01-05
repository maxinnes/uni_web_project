import {SubscriptionCheckoutContext} from "../Context/SubscriptionCheckoutContext";
import {useContext, useState, useEffect} from "react";
import {NavLink} from "react-router-dom";

export default function ChoosePlanIndex(){
    let subscriptionCheckout = useContext(SubscriptionCheckoutContext)
    let [disabledButton,setDisabledButton] = useState("disabled")

    useEffect(()=>{
        let selectPlan
        switch(subscriptionCheckout.subscriptionChoice){
            case "1":
                selectPlan = document.getElementById("tierOneCard")
                break
            case "2":
                selectPlan = document.getElementById("tierTwoCard")
                break
            case "3":
                selectPlan = document.getElementById("tierThreeCard")
                break
        }
        if(subscriptionCheckout.subscriptionChoice!=null) {
            selectPlan.classList.add("border-dark")
            selectPlan.firstElementChild.classList.add("text-white")
            selectPlan.firstElementChild.classList.add("bg-dark")
            selectPlan.lastElementChild.lastElementChild.classList.add("btn-dark")
            selectPlan.lastElementChild.lastElementChild.classList.remove("btn-outline-dark")
            selectPlan.lastElementChild.lastElementChild.innerText = "Selected"
        }
    },[])

    useEffect(()=>{
        if(subscriptionCheckout.subscriptionChoice!=null){
            setDisabledButton("")
        }
    },[subscriptionCheckout.subscriptionChoice])

    const updateSubscriptionChoice = (element)=>{
        // Update old elements
        let oldUserChoiceElement
        switch(subscriptionCheckout.subscriptionChoice){
            case "1":
                oldUserChoiceElement = document.getElementById("tierOneCard")
                break
            case "2":
                oldUserChoiceElement = document.getElementById("tierTwoCard")
                break
            case "3":
                oldUserChoiceElement = document.getElementById("tierThreeCard")
                break
            default:
                console.log("None chosen")
        }
        if(subscriptionCheckout.subscriptionChoice!=null) {
            oldUserChoiceElement.lastElementChild.lastElementChild.classList.remove("btn-dark")
            oldUserChoiceElement.lastElementChild.lastElementChild.classList.add("btn-outline-dark")
            oldUserChoiceElement.lastElementChild.lastElementChild.innerText = "Select"
            oldUserChoiceElement.classList.remove("border-dark")
            oldUserChoiceElement.firstElementChild.classList.remove("text-white")
            oldUserChoiceElement.firstElementChild.classList.remove("bg-dark")
        }
        // Update new elements
        element.classList.add("btn-dark")
        element.classList.remove("btn-outline-dark")
        element.innerText = "Selected"
        const userChoice = element.value
        subscriptionCheckout.setSubscriptionChoice(userChoice)
        let newUserChoiceElement
        switch(userChoice){
            case "1":
                newUserChoiceElement = document.getElementById("tierOneCard")
                break
            case "2":
                newUserChoiceElement = document.getElementById("tierTwoCard")
                break
            case "3":
                newUserChoiceElement = document.getElementById("tierThreeCard")
                break
            default:
                console.log("Error")
        }
        if(newUserChoiceElement!=null) {
            newUserChoiceElement.classList.add("border-dark")
            newUserChoiceElement.firstElementChild.classList.add("text-white")
            newUserChoiceElement.firstElementChild.classList.add("bg-dark")
        }
    }

    return <div className="row g-5">
        <div className="col-md col-lg"/>
        <div className="col-md-10 col-lg-10">
            <h4 className="mb-3">Choose a plan</h4>

            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div className="col">
                    <div id="tierOneCard" className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Tier One</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">Free</h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>1 Store</li>
                                <li>10 Products</li>
                                <li>1GB Storage</li>
                                <li>15% Of Transactions</li>
                            </ul>
                            <button value="1" onClick={(event)=>{updateSubscriptionChoice(event.target)}} type="button" className="w-100 btn btn-lg btn-outline-dark">Select</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div id="tierTwoCard" className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Tier Two</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">£5<small
                                className="text-muted fw-light">/mo</small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>3 Stores</li>
                                <li>30 Products</li>
                                <li>10GB Storage</li>
                                <li>15% Of Transactions</li>
                            </ul>
                            <button value="2" onClick={(event)=>{updateSubscriptionChoice(event.target)}} type="button" className="w-100 btn btn-lg btn-outline-dark">Select</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div id="tierThreeCard" className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Tier Three</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">£25<small
                                className="text-muted fw-light">/mo</small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Unlimited Stores</li>
                                <li>Unlimited Products</li>
                                <li>1TB Storage</li>
                                <li>5% Of Transactions</li>
                            </ul>
                            <button value="3" onClick={(event)=>{updateSubscriptionChoice(event.target)}} type="button" className="w-100 btn btn-lg btn-outline-dark">Select</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                {/*<NavLink className="w-auto" to="continue"><button className="btn btn-dark">Continue</button></NavLink>*/}
                {/*<NavLink className="w-auto" to="continue">{disabledButton}</NavLink>*/}
                <NavLink to="continue" className={"w-auto btn btn-dark "+disabledButton} role="button">Continue</NavLink>
            </div>
        </div>
        <div className="col-md col-lg"/>
    </div>
}