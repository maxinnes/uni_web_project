import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function DashboardOrderIndex(){
    let params = useParams()
    let [orderDetails,setOrderDetails] = useState({
        createdDate:"",
        customerEmail:"",
        status:"",
        storeName:"",
        totalPrice: 0
    })
    let [purchasedProducts,setPurchasedProducts] = useState([])
    let [purchaseAddress,setPurchaseAddress] = useState({
        addressLineOne:"",
        addressLineTwo:"",
        addressLineThree:"",
        city:"",
        county:"",
        postcode:""
    })

    let PurchasedProduct = (props)=>{
        return <>
            <p>{props.name} x {props.quantity} = £{props.total}</p>
        </>
    }

    useEffect(()=>{
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`/api/orders/getOrderById.php?id=${params.orderId}`, requestOptions)
            .then(async response => {
                const jsonResponse = await response.json()
                if(jsonResponse.messageType==="SUCCESS"){
                    const orderDetailsResponse = jsonResponse.result.orderDetails
                    setOrderDetails({
                        createdDate:orderDetailsResponse.createdDate,
                        customerEmail:orderDetailsResponse.customerEmail,
                        status:orderDetailsResponse.status,
                        storeName:orderDetailsResponse.storeName,
                        totalPrice: orderDetailsResponse.totalPrice
                    })
                    const orderAddressDetails = jsonResponse.result.orderAddressDetails
                    setPurchaseAddress({
                        addressLineOne: orderAddressDetails.addressLineOne,
                        addressLineTwo: orderAddressDetails.addressLineTwo,
                        addressLineThree: orderAddressDetails.addressLineThree,
                        city: orderAddressDetails.city,
                        county: orderAddressDetails.county,
                        postcode: orderAddressDetails.postcode,
                    })
                    let tempList = []
                    for(let x in orderDetailsResponse.purchasedProducts){
                        let tempPurchaseProduct = orderDetailsResponse.purchasedProducts[x]
                        tempList.push(<PurchasedProduct key={x} name={tempPurchaseProduct.name} quantity={tempPurchaseProduct.quantity} total={tempPurchaseProduct.total} />)
                    }
                    setPurchasedProducts(tempList)
                }
            })
    },[])

    return <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>Order: {params.orderId}</h2>
        </div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3>Order details</h3>
        </div>
        <p>Order date: {orderDetails.createdDate}</p>
        <p>Customer email: {orderDetails.customerEmail}</p>
        <p>Order status: {orderDetails.status}</p>
        <p>From Store: {orderDetails.storeName}</p>
        <p>Order total: £{orderDetails.totalPrice}</p>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3>Products purchased</h3>
        </div>
        {purchasedProducts}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3>Order address</h3>
        </div>
        <p>Address Line One: {purchaseAddress.addressLineOne}</p>
        <p>Address Line Two: {purchaseAddress.addressLineTwo}</p>
        <p>Address Line Three: {purchaseAddress.addressLineThree}</p>
        <p>City: {purchaseAddress.city}</p>
        <p>County: {purchaseAddress.county}</p>
        <p>Postcode: {purchaseAddress.postcode}</p>
    </>
}