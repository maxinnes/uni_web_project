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

    // orderDetails:
    // createdDate: "2022-01-03 23:10:17"
    // customerEmail: "max@maxinnes.co"
    // orderId: 4
    // purchasedProducts: Array(4)
        // 0: {name: 'My First Product', quantity: 1, total: 10}
        // 1: {name: 'Second product', quantity: 6, total: 270}
        // 2: {name: 'Third product', quantity: 3, total: 216}
        // 3: {name: 'Fourth Product ', quantity: 2, total: 552}
    // status: "In Progress"
    // storeName: "store name"
    // totalPrice: 1048

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
        <p>Order total: {orderDetails.totalPrice}</p>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3>Products purchased</h3>
        </div>
        {purchasedProducts}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3>Order address</h3>
        </div>
    </>
}