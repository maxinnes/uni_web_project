import {useEffect, useState} from "react";

function AccountIndex(){
    let [accountDetails,setAccountDetails] = useState({
        firstName:null,
        lastName:null,
        email:null
    })
    let [addressDetails,setAddressDetails] = useState({
        addressLineOne:null,
        addressLineTwo:null,
        addressLineThree:null,
        city:null,
        county:null,
        postcode:null
    })
    let [subscriptionDetails,setSubscriptionDetails] = useState({
        name:null,
        price:null,
        stores:null,
        products:null,
        storage:null,
        transactions:null
    })

    useEffect(()=>{
        const getApiRequest = async ()=>{
            const myHeaders = new Headers();
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            const response = await fetch("/api/accounts/getAccount.php", requestOptions)
            const jsonResponse = await response.json()
            console.log("---------")
            console.log(jsonResponse)
            if(jsonResponse.messageType==="SUCCESS"){
                const jsonAccountDetails = jsonResponse.result.accountDetails
                const jsonAddressDetails = jsonResponse.result.addressDetails
                const jsonSubscriptionDetails = jsonResponse.result.subscriptionDetails

                console.log(jsonAccountDetails)
                console.log(jsonAddressDetails)
                console.log(jsonSubscriptionDetails)

                setAccountDetails({
                    firstName: jsonAccountDetails.firstName,
                    lastName: jsonAccountDetails.lastName,
                    email: jsonAccountDetails.email
                })
                setAddressDetails({
                    addressLineOne: jsonAddressDetails.addressLineOne,
                    addressLineTwo: jsonAddressDetails.addressLineTwo,
                    addressLineThree: jsonAddressDetails.addressLineThree,
                    city: jsonAddressDetails.city,
                    county: jsonAddressDetails.county,
                    postcode: jsonAddressDetails.postcode
                })
                let updateSubscriptionDetails = {
                    name:null,
                    price:jsonSubscriptionDetails.price,
                    stores:null,
                    products:null,
                    storage:null,
                    transactions:null
                }
                switch(jsonSubscriptionDetails.subscriptionChoice){
                    case "1":
                        updateSubscriptionDetails.name = "Tier One"
                        updateSubscriptionDetails.stores = "1"
                        updateSubscriptionDetails.products = "10"
                        updateSubscriptionDetails.storage = "1GB"
                        updateSubscriptionDetails.transactions = "15%"
                        break
                    case "2":
                        updateSubscriptionDetails.name = "Tier Two"
                        updateSubscriptionDetails.stores = "3"
                        updateSubscriptionDetails.products = "30"
                        updateSubscriptionDetails.storage = "10GB"
                        updateSubscriptionDetails.transactions = "15%"
                        break
                    case "3":
                        updateSubscriptionDetails.name = "Tier Three"
                        updateSubscriptionDetails.stores = "Unlimited"
                        updateSubscriptionDetails.products = "Unlimited"
                        updateSubscriptionDetails.storage = "1TB"
                        updateSubscriptionDetails.transactions = "5%"
                        break
                }
                setSubscriptionDetails(updateSubscriptionDetails)
            }
        }
        getApiRequest()
    },[])

    return <>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <h2>Account Management</h2>
        </div>
        <div className="row">
            <div className="col-12 mb-5">
                <h3>Account details</h3>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="firstNameBox" className="form-label mt-2">First Name</label>
                        <input value={accountDetails.firstName} id="firstNameBox" placeholder="First Name" className="form-control" type="text" readOnly/>
                        <label htmlFor="lastNameBox" className="form-label mt-2">Last Name</label>
                        <input value={accountDetails.lastName} id="lastNameBox" placeholder="Last Name" className="form-control" type="text" readOnly/>
                        <label htmlFor="emailBox" className="form-label mt-2">Email address</label>
                        <input value={accountDetails.email} id="emailBox" placeholder="Email" className="form-control" type="text" readOnly/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="addressLineOneBox" className="form-label mt-2">Address Line One</label>
                        <input value={addressDetails.addressLineOne} id="addressLineOneBox" placeholder="Empty" className="form-control" type="text" readOnly/>
                        <label htmlFor="addressLineTwoBox" className="form-label mt-2">Address Line Two</label>
                        <input value={addressDetails.addressLineTwo} id="addressLineTwoBox" placeholder="Empty" className="form-control" type="text" readOnly/>
                        <label htmlFor="addressLineThreeBox" className="form-label mt-2">Address Line Three</label>
                        <input value={addressDetails.addressLineThree} id="addressLineThreeBox" placeholder="Empty" className="form-control" type="text" readOnly/>
                        <label htmlFor="cityBox" className="form-label mt-2">City</label>
                        <input value={addressDetails.city} id="cityBox" placeholder="Empty" className="form-control" type="text" readOnly/>
                        <label htmlFor="countyBox" className="form-label mt-2">County</label>
                        <input value={addressDetails.county} id="countyBox" placeholder="Empty" className="form-control" type="text" readOnly/>
                        <label htmlFor="postcodeBox" className="form-label mt-2">Postcode</label>
                        <input value={addressDetails.postcode} id="postcodeBox" placeholder="Empty" className="form-control" type="text" readOnly/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <h3>Subscription Info</h3>
                <div id="tierOneCard" className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{subscriptionDetails.name}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">£{subscriptionDetails.price}<small
                            className="text-muted fw-light">/mo</small></h1>
                        <ul className="list-unstyled mt-3 mb-4">
                            <li>{subscriptionDetails.stores} Store</li>
                            <li>{subscriptionDetails.products} Products</li>
                            <li>{subscriptionDetails.storage} Storage</li>
                            <li>{subscriptionDetails.transactions} Of Transactions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AccountIndex