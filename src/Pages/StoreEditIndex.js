import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

// TODO delete and add image options
// TODO Create actual store page (User will need to make url option in create store dialog)

export default function StoreEditIndex(){
    const params = useParams()
    let [storeDetails,setStoreDetails] = useState({
        storeId:null,
        storeName:null,
        created:null
    })
    let [listOfProducts,setListOfProducts] = useState([])
    // Use effect
    useEffect(()=>{
        const getStoreDetails = async ()=> {
            const myHeaders = new Headers();
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            const response = await fetch(`/api/stores/getStoreById.php?id=${params.storeId}`, requestOptions)
            const jsonResponse = await response.json()
            const fetchStoreDetails = await jsonResponse.result
            if(jsonResponse.messageType==="SUCCESS"){
                setStoreDetails({
                    storeId: fetchStoreDetails.storeId,
                    storeName: fetchStoreDetails.storeName,
                    created: fetchStoreDetails.created
                })
            }
        }
        getStoreDetails()
    },[params.storeId])

    useEffect(()=>{
        getProductsByStoreId()
    },[])
    // Methods
    const getProductsByStoreId = async ()=>{
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`/api/products/getProductsByStoreId.php?id=${params.storeId}`, requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            let tempList = []
            for(let x in jsonResponse.result){
                tempList.push(<ProductView key={x} productId={jsonResponse.result[x]["productId"]} name={jsonResponse.result[x]["name"]} description={jsonResponse.result[x]["description"]}
                                           price={jsonResponse.result[x]["price"]}/>)
            }
            setListOfProducts(tempList)
        }
    }
    const submitProductForm = async ()=>{
        // Get elements
        const nameInputElement = document.getElementById("productNameInput")
        const descriptionInputElement = document.getElementById("productDescriptionInput")
        const priceInputElement = document.getElementById("productPriceInput")
        // Get values
        const nameInput = nameInputElement.value
        const descriptionInput = descriptionInputElement.value
        const priceInput = priceInputElement.value
        // Send values
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "storeId": params.storeId,
            "name": nameInput,
            "description": descriptionInput,
            "image": "",
            "price": priceInput
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch("/api/products/createNewProduct.php", requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            getProductsByStoreId()
            nameInputElement.value = ""
            descriptionInputElement.value = ""
            priceInputElement.value = ""
        }
    }

    return <>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <h2>{storeDetails.storeName}</h2>
        </div>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <h3 className="d-inline">Product Manager</h3>
            <button data-bs-toggle="modal" data-bs-target="#createNewProductModal" className="btn btn-dark ms-5">Create new product</button>
        </div>
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {listOfProducts}
        </div>
        <div className="modal fade" id="createNewProductModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create new product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="productNameInput"
                                   placeholder="Name of Product"/>
                                <label htmlFor="productNameInput">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Description"
                                      id="productDescriptionInput" />
                            <label htmlFor="productDescriptionInput">Description</label>
                        </div>
                        <div className="form-floating">
                            <input type="number" min="0" className="form-control" id="productPriceInput"
                                   placeholder="Price"/>
                                <label htmlFor="productPriceInput">Pricing</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-dark" onClick={submitProductForm}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <EditProductModal/>
    </>
}

function ProductView(props){
    const loadEditModal = ()=>{
        const nameInputElement = document.getElementById("editProductNameInput")
        const descriptionInputElement = document.getElementById("editProductDescriptionInput")
        const priceInputElement = document.getElementById("editProductPriceInput")
        const editProductIdElement = document.getElementById("editProductId")

        nameInputElement.value = props.name
        descriptionInputElement.value = props.description
        priceInputElement.value = props.price
        editProductIdElement.value = props.productId
    }

    return <div className="col my-3">
        <div className="card">
            {/*<img src="" className="card-img-top" alt="..."/>*/}
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text">Price: £{props.price}</p>
                </div>
                <div className="card-body">
                    <a href="#" className="card-link">Delete</a>
                    <a onClick={loadEditModal} data-bs-toggle="modal" data-bs-target="#editProductModal" data-bs-productId={props.productId} href="#" className="card-link">Edit</a>
                    <a href="#" className="card-link">Add image</a>
                </div>
        </div>
    </div>
}

function EditProductModal(){
    let params = useParams()

    const submitForm = async ()=>{
        const nameInputElement = document.getElementById("editProductNameInput")
        const descriptionInputElement = document.getElementById("editProductDescriptionInput")
        const priceInputElement = document.getElementById("editProductPriceInput")
        const productIdElement = document.getElementById("editProductId")

        const name  = nameInputElement.value
        const description = descriptionInputElement.value
        const price = priceInputElement.value
        const productId = productIdElement.value

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "storeId": params.storeId,
            "productId": productId,
            "name": name,
            "description": description,
            "image": "",
            "price": price
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch("/api/products/updateProduct.php", requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            console.log("Edit product")

        }
    }

    return <div className="modal fade" id="editProductModal">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="modal-body">
                    <input type="hidden" id="editProductId"/>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="editProductNameInput"
                               placeholder="Name of Product"/>
                        <label htmlFor="editProductNameInput">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Description"
                                      id="editProductDescriptionInput" />
                        <label htmlFor="editProductDescriptionInput">Description</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" min="0" className="form-control" id="editProductPriceInput"
                               placeholder="Price"/>
                        <label htmlFor="editProductPriceInput">Pricing</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={submitForm}>Save changes</button>
                </div>
            </div>
        </div>
    </div>
}