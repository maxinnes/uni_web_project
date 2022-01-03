import {useEffect, useState, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {BasketContext} from "../Context/BasketContext";

export default function StoreIndex(){
    let shop = useContext(BasketContext)
    let [numberOfItemsInCart,setNumberOfItemsInCart] = useState(0)

    let params = useParams()
    let [productComponentList,setProductComponentList] = useState([])
    let [storeDetails,setStoreDetails] = useState({
        storeId:null,
        storeName:null,
        created:null,
        accountId:null,
        url:null
    })

    useEffect(()=>{
        getStoreDetails()
        setNumberOfItemsInCart(shop.getNumberOfItemsInCart())
    },[])

    // Functions
    const getStoreDetails = async ()=>{
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`/api/stores/getStoreByUrl.php?url=${params.storeUrl}`, requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            setStoreDetails({
                storeName:jsonResponse.result.storeDetails.storeName
            })
            const productDetails = jsonResponse.result.productDetails
            let tempList = []
            for(let productId in productDetails){
                tempList.push(<StoreProduct key={productId} updateCallback={updateCard} productId={productDetails[productId]["productId"]} name={productDetails[productId]["name"]} description={productDetails[productId]["description"]} image={productDetails[productId]["image"]} price={productDetails[productId]["price"]}/>)
            }
            setProductComponentList(tempList)
        }
    }

    const updateCard = ()=>{
        setNumberOfItemsInCart(shop.getNumberOfItemsInCart())
    }

    return <div className="container-fluid">
        <header className="row">
            <div className="col-12 navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-6">
                            <Link to="" className="navbar-brand d-flex align-items-center">
                                <strong>{storeDetails.storeName}</strong>
                            </Link>
                        </div>
                        <div className="col-6 d-flex flex-row align-items-center justify-content-end">
                            <Link to="checkout"><i style={{color:"white"}} className="fas fa-shopping-basket fs-5">
                                <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {numberOfItemsInCart}
                                </span>
                            </i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <main className="row">
            <div className="col-12 album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {productComponentList}
                    </div>
                </div>
            </div>
        </main>

        <footer className="row text-muted py-5">
            <div className="col-12">
            </div>
        </footer>
    </div>
}

function StoreProduct(props){
    let shop = useContext(BasketContext)
    let [itemCount,setItemCount] = useState(0)

    const addItemToBasket = ()=>{
        shop.addItemToCart(props.productId)
        setItemCount(shop.getItemQuantity(props.productId))
        props.updateCallback()
    }

    const removeItemFromBasket = ()=>{
        shop.removeItemFromCart(props.productId)
        setItemCount(shop.getItemQuantity(props.productId))
        props.updateCallback()
    }

    const itemInBasketButtons = <div className="btn-group" role="group">
        <button onClick={removeItemFromBasket} type="button" className="btn btn-outline-dark">-</button>
        <button type="button" className="btn btn-outline-dark">{itemCount}</button>
        <button onClick={addItemToBasket} type="button" className="btn btn-outline-dark">+</button>
    </div>

    useEffect(()=>{
        setItemCount(shop.getItemQuantity(props.productId))
    },[])

    return <div className="col">
        <div className="card shadow-sm">
            {props.image !=="" && <img src={`/images/${props.image}`} className="card-img-top" alt="card image"/>}
            <div className="card-body">
                <h5>{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    {itemCount!==0 ? itemInBasketButtons : <button onClick={addItemToBasket} type="button" className="btn btn-sm btn-dark">Add to
                        basket</button>}
                    <small className="text-muted">£{props.price}</small>
                </div>
            </div>
        </div>
    </div>
}