import {useEffect, useState} from "react";
import {useParams, Outlet} from "react-router-dom";
import {BasketContext} from "../Context/BasketContext";

export default function StoreLayout(){
    return <BasketProvider>
        <Outlet/>
    </BasketProvider>
}

function BasketProvider({children}){
    let params = useParams()
    let [cartItems,setCartItems] = useState({})
    let [storeProducts,setStoreProducts] = useState({})

    // Functions
    const getStoreDetails= async ()=>{
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`/api/stores/getStoreByUrl.php?url=${params.storeUrl}`, requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            let productDetails = jsonResponse.result.productDetails
            let newValue = {}
            for(let x in productDetails){
                let productId = productDetails[x]["productId"]
                newValue[productId] = productDetails[x]
            }
            setStoreProducts(newValue)
        }
    }

    const getNumberOfItemsInCart = ()=>{
        let numberOfItems = 0
        for(const prop in cartItems){
            numberOfItems += cartItems[prop].quantity
        }
        return numberOfItems
    }

    const getItemQuantity = (item)=>{
        if(cartItems.hasOwnProperty(item)){
            return cartItems[item].quantity
        }else{
            return 0
        }
    }

    const removeItemFromCart = (item)=>{
        let copyOfCartItems = cartItems
        if(copyOfCartItems[item].quantity===1){
            delete copyOfCartItems[item]
        }else{
            copyOfCartItems[item].quantity -= 1
        }
        setCartItems(copyOfCartItems)
    }

    const addItemToCart = (item)=>{
        let copyOfCartItems = cartItems
        if(copyOfCartItems.hasOwnProperty(item)){
            copyOfCartItems[item].quantity +=1
        }else{
            copyOfCartItems[item] = {quantity:1}
        }
        setCartItems(copyOfCartItems)
    }

    //const update
    useEffect(()=>{
        getStoreDetails()
    },[])

    let value = {
        cartItems,
        storeProducts,
        addItemToCart,
        removeItemFromCart,
        getNumberOfItemsInCart,
        getItemQuantity
    }

    return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}