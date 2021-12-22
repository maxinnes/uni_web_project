import styles from '../scss/AccountDashboard.module.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as bootstrap from "bootstrap";

export default function StoreManagerIndex(){
    let [listOfStores,setListOfStores] = useState([]);
    let [errorMessage,setErrorMessage] = useState("")

    const displayErrorMessage = (message)=>{
        const toastErrorModalElement = document.getElementById("errorToast")
        const toastErrorModal = new bootstrap.Toast(toastErrorModalElement)
        setErrorMessage(message)
        toastErrorModal.show()
    }

    const validateStoreName = (element)=>{
        const storeNameInputElement = element
        const storeNameInputValue = storeNameInputElement.value
        if(storeNameInputValue.length===0){
            storeNameInputElement.classList.add("is-invalid")
            return false
        }else{
            storeNameInputElement.classList.remove("is-invalid")
            return true
        }
    }

    const submitNewStore = async ()=>{
        const storeNameInputElement = document.getElementById("storeNameInput")
        if(validateStoreName(storeNameInputElement)){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "storeName": storeNameInputElement.value
            })
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
            const response = await fetch("/api/stores/createNewStore.php", requestOptions)
            const jsonResponse = await response.json()
            if(jsonResponse.messageType==="SUCCESS"){
                setListOfStores([])
            }else{
                displayErrorMessage(jsonResponse.message)
            }
        }else{
            displayErrorMessage("Please check for errors")
        }
    }

    useEffect(()=>{
        const updateStoreList = async ()=> {
            const myHeaders = new Headers();
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            const response = await fetch("/api/stores/getUserStores.php", requestOptions)
            const jsonResponse = await response.json()
            if(jsonResponse.messageType==="SUCCESS"){
                let newListOfStoreElements = []
                for(let x in jsonResponse.result){
                    newListOfStoreElements.push(<StoreListing key={x} storeId={jsonResponse.result[x]["storeId"]} storeName={jsonResponse.result[x]["storeName"]}/>)
                }
                if(newListOfStoreElements.length!==listOfStores.length){
                    setListOfStores(newListOfStoreElements)
                }
            }
        }
        updateStoreList()
    },[listOfStores])

    return <>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <h2>Store Management</h2>
        </div>
        <div className="row">
            <div className="col-6">
                <div className="list-group">
                    {listOfStores.length===0 ? <h3>You dont currently have any stores</h3> : listOfStores}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <button className={`btn btn-dark mt-5 ${styles["create-new-store-btn"]}`} data-bs-toggle="modal" data-bs-target="#createNewStoreModal">Create new store</button>
            </div>
        </div>

        <div className="modal fade" id="createNewStoreModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create new store</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input onChange={(event)=>{validateStoreName(event.target)}} type="text" className="form-control" id="storeNameInput" placeholder="Store name"/>
                            <div className="invalid-feedback" />
                            <label htmlFor="storeNameInput">New store name</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button data-bs-dismiss="modal" type="button" className="btn btn-dark" onClick={submitNewStore}>Save changes</button>
                    </div>
                </div>
            </div>
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="errorToast" className="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive"
                     aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {errorMessage}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                aria-label="Close"/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function StoreListing(props){
    return <Link to={`${props.storeId}`} className="list-group-item list-group-item-action d-flex gap-3 py-3">
        <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
                <h5 className="mb-0">{props.storeName}</h5>
                {/*<p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>*/}
            </div>
        </div>
    </Link>
}