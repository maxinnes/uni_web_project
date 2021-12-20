import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {SubscriptionCheckoutContext} from "../Context/SubscriptionCheckoutContext";

export default function AccountSetupCheckoutIndex (){
    // Imports and states
    let navigate = useNavigate()
    let subscriptionCheckout = useContext(SubscriptionCheckoutContext)
    let [subscriptionDetails,setSubscriptionDetails] = useState({name:"Not selected",cost:"N/A"})
    let [addressOptions,setAddressOptions] = useState(null);
    let [listOfAddresses,setListOfAddresses] = useState([])
    let [selectedAddress,setSelectedAddress] = useState({
            addressLineOne:"",
            addressLineTwo:"",
            addressLineThree:"",
            city:"",
            county:"",
            postCode:""
        })
    let [selectedPaymentMethod,setSelectedPaymentMethod] = useState(null)
    let [errorMessage,setErrorMessage] = useState(null)

    // Functions
    const validatePostcode = ()=>{
        const postCodeElement = document.getElementById("form-postcode")
        const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
        const postcodeInput = postCodeElement.value

        if(!postcodeRegex.test(postcodeInput)){
            postCodeElement.classList.add("is-invalid")
            return false
        }else{
            postCodeElement.classList.remove("is-invalid")
            return true
        }
    }
    const submitPostcode = ()=>{
        if(validatePostcode()) {
            const selectPostcodeElement = document.getElementById("select-postcode-form")
            const postcodeElement = document.getElementById("form-postcode")
            const postcodeValue = postcodeElement.value

            // Build request
            const myHeaders = new Headers();
            myHeaders.append("x-api-key", "6VXvRDsuLPaDCxY2mmFvq1Y2JcSuPhZT4rXLDb3r");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(`https://api.addressian.co.uk/v2/autocomplete/${postcodeValue}`, requestOptions)
                .then(async response => {
                    const listOfAddresses = await response.json()
                    selectPostcodeElement.removeAttribute("disabled")
                    setListOfAddresses(listOfAddresses)
                    let addressOptionsHtml = []
                    for(let address in listOfAddresses){
                        addressOptionsHtml.push(<option key={address} value={address}>{listOfAddresses[address]["address"][0]}</option>)
                    }
                    setAddressOptions(addressOptionsHtml)
                })
                .catch(error => console.log('error', error));
        }
    }
    const selectAddress = ()=>{
        const addressSelectorElement = document.getElementById("select-postcode-form")
        const currentlySelectedAddressIndex = addressSelectorElement.value
        const currentlySelectedAddress = listOfAddresses[currentlySelectedAddressIndex]

        const updateSelectedAddress = {
            addressLineOne:currentlySelectedAddress["address"][0],
            addressLineTwo:currentlySelectedAddress["address"][1],
            addressLineThree:currentlySelectedAddress["address"][2],
            city:currentlySelectedAddress["city"],
            county:currentlySelectedAddress["county"],
            postCode:currentlySelectedAddress["postcode"]
        }
        setSelectedAddress(updateSelectedAddress)
    }
    const selectPaymentMethod = ()=>{
        const selectedElement = document.querySelector('input[name="paymentMethod"]:checked')
        if(selectedElement!=null){
            setSelectedPaymentMethod(selectedElement.value)
        }
    }
    const submitForm = ()=>{
        const addressSelector = document.getElementById("select-postcode-form")

        let raw

        if(subscriptionCheckout.subscriptionChoice==="1"){
            raw = JSON.stringify({
                "subscriptionChoice":subscriptionCheckout.subscriptionChoice
            })
        } else {
            if(addressSelector.value!=="Select address...") {
                raw = JSON.stringify({
                    "subscriptionChoice": subscriptionCheckout.subscriptionChoice,
                    "addressDetails": {
                        "addressLineOne": selectedAddress.addressLineOne,
                        "addressLineTwo": selectedAddress.addressLineTwo,
                        "addressLineThree": selectedAddress.addressLineThree,
                        "city": selectedAddress.city,
                        "county": selectedAddress.county,
                        "postcode": selectedAddress.postCode
                    }
                });
            }
        }
        if(raw!==null) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("/api/subscription/createNewSubscription.php", requestOptions)
                .then(async response => {
                    console.log(await response)
                    const jsonResponse = await response.json()
                    console.log(jsonResponse)
                    switch (jsonResponse.messageType) {
                        case "SUCCESS":
                            navigate("/dashboard")
                            break
                        case "ERROR":
                            displayErrorMessage(jsonResponse.message)
                            break
                        default:
                            displayErrorMessage("Something went wrong...")
                    }
                })
                .catch(error => console.log('error', error));
        }else{
            displayErrorMessage("Please select a address")
        }

    }
    const displayErrorMessage = (message)=>{
        const alertElement = document.getElementById("form-error-message")
        setErrorMessage(message)
        alertElement.classList.add("show")
    }

    // Effects
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
            <h4 className="mb-3">{subscriptionCheckout.subscriptionChoice==="1" ? "continue" : "Billing address"}</h4>
            {subscriptionCheckout.subscriptionChoice==="1" ? <p>test</p> : <form className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="form-postcode" className="form-label">Please enter your postcode</label>
                        <div className="input-group has-validation">
                            <input type="text" className="form-control" id="form-postcode" onChange={validatePostcode}/>
                            <button onClick={submitPostcode} type="button" className="btn btn-dark" id="submit-postcode">Submit</button>
                            <div className="invalid-feedback">
                                Postcode is not correct
                            </div>
                        </div>

                    </div>

                    <div className="col-12">
                        <label htmlFor="select-postcode-form" className="form-label">Select your address</label>
                        <select onChange={selectAddress} className="form-select" id="select-postcode-form" disabled>
                            <option selected>Select address...</option>
                            {addressOptions}
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="address1" className="form-label">Address line 1</label>
                        <input type="text" className="form-control" id="address1" value={selectedAddress.addressLineOne} disabled/>
                    </div>

                    <div className="col-12">
                        <label htmlFor="address2" className="form-label">Address line 2</label>
                        <input type="text" className="form-control" id="address2" value={selectedAddress.addressLineTwo} disabled/>
                    </div>

                    <div className="col-12">
                        <label htmlFor="address3" className="form-label">Address line 3</label>
                        <input type="text" className="form-control" id="address3" value={selectedAddress.addressLineThree} disabled/>
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" value={selectedAddress.city} disabled/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="county" className="form-label">County</label>
                        <input type="text" className="form-control" id="county" value={selectedAddress.county} disabled/>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="postcode" className="form-label">Postcode</label>
                        <input type="text" className="form-control" id="postcode" value={selectedAddress.postCode} disabled/>
                    </div>
                </div>

                <hr className="my-4"/>
                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                    <div className="form-check">
                        <input onClick={selectPaymentMethod} id="credit" value="credit" name="paymentMethod" type="radio" className="form-check-input"
                               required/>
                        <label className="form-check-label" htmlFor="credit">Credit card</label>
                    </div>
                    <div className="form-check">
                        <input onClick={selectPaymentMethod} id="debit" value="debit" name="paymentMethod" type="radio" className="form-check-input"
                               required/>
                        <label className="form-check-label" htmlFor="debit">Debit card</label>
                    </div>
                    <div className="form-check">
                        <input onClick={selectPaymentMethod} id="paypal" value="paypal" name="paymentMethod" type="radio" className="form-check-input"
                               required/>
                        <label className="form-check-label" htmlFor="paypal">PayPal</label>
                    </div>
                </div>

                {selectedPaymentMethod!=="paypal" && <div className="row gy-3">
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
                </div>}

                <hr className="my-4"/>

            </form>}
            <button onClick={submitForm} className="w-100 btn btn-dark btn-lg" type="button">Checkout</button>
            <div id="form-error-message" className="alert alert-danger fade mt-5" role="alert">{errorMessage}</div>
        </div>
    </div>
}