import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {SubscriptionCheckoutContext} from "../Context/SubscriptionCheckoutContext";

export default function AccountSetupCheckoutIndex (){
    let navigate = useNavigate()
    let subscriptionCheckout = useContext(SubscriptionCheckoutContext)
    let [subscriptionDetails,setSubscriptionDetails] = useState({name:"Not selected",cost:"N/A"})

    useEffect(()=>{
        if(subscriptionCheckout.subscriptionChoice==null){
            navigate("/finishAccountSetup")
        }
    },[])

    useEffect(()=>{
        switch(subscriptionCheckout.subscriptionChoice){
            case "1":
                setSubscriptionDetails({name:"Tier One",cost:"Free"})
                break
            case "2":
                setSubscriptionDetails({name:"Tier Two",cost:"£5/MO"})
                break
            case "3":
                setSubscriptionDetails({name:"Tier Three",cost:"£25/MO"})
                break
            default:
                console.log("Error")
        }
    },[subscriptionCheckout.subscriptionChoice])

    return <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                Your subscription choice
            </h4>
            <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between">
                    <span>{subscriptionDetails.name}</span>
                    <strong>{subscriptionDetails.cost}</strong>
                </li>
            </ul>
        </div>
        <div className="col-md-7 col-lg-8">
            <NavLink to="/finishAccountSetup"><button className="btn btn-dark" type="button">Go back</button></NavLink>
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="">
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" />
                            <div className="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="address2" className="form-label">Address 2 <span
                            className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="country" className="form-label">Country</label>
                        <select className="form-select" id="country" required="">
                            <option value="">Choose...</option>
                            <option>United States</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid country.
                        </div>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <select className="form-select" id="state" required="">
                            <option value="">Choose...</option>
                            <option>California</option>
                        </select>
                        <div className="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                            <div className="invalid-feedback">
                                Zip code required.
                            </div>
                    </div>
                </div>

                <hr className="my-4"/>
                    <h4 className="mb-3">Payment</h4>

                    <div className="my-3">
                        <div className="form-check">
                            <input id="credit" name="paymentMethod" type="radio" className="form-check-input"
                                   checked="" required=""/>
                                <label className="form-check-label" htmlFor="credit">Credit card</label>
                        </div>
                        <div className="form-check">
                            <input id="debit" name="paymentMethod" type="radio" className="form-check-input"
                                   required=""/>
                                <label className="form-check-label" htmlFor="debit">Debit card</label>
                        </div>
                        <div className="form-check">
                            <input id="paypal" name="paymentMethod" type="radio" className="form-check-input"
                                   required=""/>
                                <label className="form-check-label" htmlFor="paypal">PayPal</label>
                        </div>
                    </div>

                    <div className="row gy-3">
                        <div className="col-md-6">
                            <label htmlFor="cc-name" className="form-label">Name on card</label>
                            <input type="text" className="form-control" id="cc-name" placeholder="" required=""/>
                                <small className="text-muted">Full name as displayed on card</small>
                                <div className="invalid-feedback">
                                    Name on card is required
                                </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="cc-number" className="form-label">Credit card number</label>
                            <input type="text" className="form-control" id="cc-number" placeholder="" required=""/>
                                <div className="invalid-feedback">
                                    Credit card number is required
                                </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                            <input type="text" className="form-control" id="cc-expiration" placeholder=""
                                   required=""/>
                                <div className="invalid-feedback">
                                    Expiration date required
                                </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="cc-cvv" className="form-label">CVV</label>
                            <input type="text" className="form-control" id="cc-cvv" placeholder="" required=""/>
                                <div className="invalid-feedback">
                                    Security code required
                                </div>
                        </div>
                    </div>

                    <hr className="my-4"/>

                    <button className="w-100 btn btn-primary btn-lg" type="submit">Checkout</button>
            </form>
        </div>
    </div>
}