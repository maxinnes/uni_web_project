import {Link, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
// import {SubscriptionCheckoutContext} from "../Context/SubscriptionCheckoutContext";
import {BasketContext} from "../Context/BasketContext";
import Logo from "../CommonComponents/nav/Logo";
import styles from "../scss/StoreLayout.module.css"

export default function StoreCheckoutIndex(){
    // Imports and states
    let navigate = useNavigate()
    let params = useParams()
    let shop = useContext(BasketContext)
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
    let [cartItemsListComponents,setCartItemsListComponents] = useState([])
    let [cartTotalPrice,setCartTotalPrice] = useState(0)
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
    const validateEmailAddress = (element)=>{
        const emailInputElement = element
        const emailValue = emailInputElement.value
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(emailValue.length===0){
            emailInputElement.classList.add("is-invalid")
            emailInputElement.nextElementSibling.innerText = "Email is empty"
            return false
        }else if(!emailRegex.test(emailValue)){
            emailInputElement.classList.add("is-invalid")
            emailInputElement.nextElementSibling.innerText = "Email is invalid"
            return false
        }else{
            emailInputElement.classList.remove("is-invalid")
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
    const submitForm = async ()=>{
        const customerEmailElement = document.getElementById("customerEmailInput")
        const addressLineOneElement = document.getElementById("address1")
        const addressLineTwoElement = document.getElementById("address2")
        const addressLineThreeElement = document.getElementById("address3")
        const cityElement = document.getElementById("city")
        const countyElement = document.getElementById("county")
        const postcodeElement = document.getElementById("postcode")

        const addressSelector = document.getElementById("select-postcode-form")
        if(validateEmailAddress(customerEmailElement) && addressSelector.value!=="Select address..."){

        }
        const storeUrl = params.storeUrl;
        const customerEmailAddress = customerEmailElement.value
        const purchasedProducts = []
        for(let x in shop.cartItems){
            const newPurchasedProduct = {
                productId:x,
                quantity:shop.cartItems[x].quantity
            }
            purchasedProducts.push(newPurchasedProduct)
        }
        const addressDetails = {
            addressLineOne:addressLineOneElement.value,
            addressLineTwo:addressLineTwoElement.value,
            addressLineThree:addressLineThreeElement.value,
            city:cityElement.value,
            county:countyElement.value,
            postcode:postcodeElement.value
        }
        const submitData = {
            storeUrl:storeUrl,
            email:customerEmailAddress,
            purchasedProducts:purchasedProducts,
            addressDetails:addressDetails
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(submitData);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch("/api/orders/createNewOrder.php", requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            console.log(jsonResponse)
        }
    }
    const displayErrorMessage = (message)=>{
        const alertElement = document.getElementById("form-error-message")
        setErrorMessage(message)
        alertElement.classList.add("show")
    }

    // Store components
    const CartItemComponent = (props)=>{
        return <li className="list-group-item d-flex justify-content-between">
            <span>{props.productName} - {props.productQuantity}</span>
            <strong>£{props.productTotalPrice}</strong>
        </li>
    }

    // Effects
    useEffect(()=>{
        if(shop.getNumberOfItemsInCart()===0){
            navigate(`/store/${params.storeUrl}`)
        }else{
            let newListOfCartItemComponents = []
            let newTotalPrice = 0
            for(let x in shop.cartItems){
                let productDetails = shop.storeProducts[x]
                let productQuantity = shop.getItemQuantity(x)
                let productTotalPrice = productDetails.price * productQuantity
                newTotalPrice += productTotalPrice
                newListOfCartItemComponents.push(<CartItemComponent key={x} productName={productDetails.name} productQuantity={productQuantity} productTotalPrice={productTotalPrice} />)
            }
            setCartItemsListComponents(newListOfCartItemComponents)
            setCartTotalPrice(newTotalPrice)
        }
    },[])

    return <div className={"container "+styles.container}>
        <main>
            <div className="py-5 text-center">
                <Logo />
                <h2 className="mt-3">Checkout</h2>
            </div>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-dark">Basket</span>
                        <span className="badge bg-dark rounded-pill">{shop.getNumberOfItemsInCart()}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {cartItemsListComponents}
                        <li className="list-group-item d-flex justify-content-between">
                            <strong>Total:</strong>
                            <strong>£{cartTotalPrice}</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-md-7 col-lg-8">
                    <Link to={`/store/${params.storeUrl}`}><button className="btn btn-dark" type="button">Go back</button></Link>
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label" htmlFor="customerEmailInput">Email</label>
                                <input onChange={(event)=>{validateEmailAddress(event.target)}} className="form-control" type="email" id="customerEmailInput"/>
                                <div className="invalid-feedback"/>
                            </div>
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
                    </form>
                    <button onClick={submitForm} className="w-100 btn btn-dark btn-lg" type="button">Checkout</button>
                    <div id="form-error-message" className="alert alert-danger fade mt-5" role="alert">{errorMessage}</div>
                </div>
            </div>
        </main>
        <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">&copy; 2021 Mercator</p>
        </footer>
    </div>
}