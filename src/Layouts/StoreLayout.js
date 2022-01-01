import {useEffect, useState, createContext, useContext} from "react";
import {Link, useParams} from "react-router-dom";

// const BasketContext = createContext({
//     cartItems: [],
//     storeProducts:{},
//     addItemToCart:()=>{}
// })
const BasketContext = createContext(null)

export default function StoreLayout(){
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
    },[])

    useEffect(()=>{
        if(shop!==null) {
            setNumberOfItemsInCart(shop.cartItems.length)
            console.log("NEW RUN")
        }
    },[shop.cartItems])

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
                tempList.push(<StoreProduct key={productId} productId={productDetails[productId]["productId"]} name={productDetails[productId]["name"]} description={productDetails[productId]["description"]} image={productDetails[productId]["image"]} price={productDetails[productId]["price"]}/>)
            }
            setProductComponentList(tempList)
        }
    }

    return <BasketProvider>
        <div className="container-fluid">
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
                                <i style={{color:"white"}} className="fas fa-shopping-basket fs-5">
                                    <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {numberOfItemsInCart}
                                    </span>
                                </i>
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
    </BasketProvider>
}

function BasketProvider({children}){
    let params = useParams()
    let [cartItems,setCartItems] = useState([])
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

    const addItemToCart = (item)=>{
        let copyOfItems = cartItems
        cartItems.push(item)
        setCartItems(cartItems)
    }

    //const update

    useEffect(()=>{
        getStoreDetails()
    },[])

    // let value = {
    //     cartItems: cartItems,
    //     storeProducts:storeProducts,
    //     addItemToCart:addItemToCart
    // }

    let value = {
        cartItems,
        storeProducts,
        addItemToCart
    }

    return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

function StoreProduct(props){
    let shop = useContext(BasketContext)

    const addItemToBasket = ()=>{
        console.log("added item")
        shop.addItemToCart(props.productId)
    }

    return <div className="col">
        <div className="card shadow-sm">
            {props.image !=="" && <img src={`/images/${props.image}`} className="card-img-top" alt="card image"/>}
            <div className="card-body">
                <h5>{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <button onClick={addItemToBasket} type="button" className="btn btn-sm btn-dark">Add to basket</button>
                    <small className="text-muted">£{props.price}</small>
                </div>
            </div>
        </div>
    </div>
}