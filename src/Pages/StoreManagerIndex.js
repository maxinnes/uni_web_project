import styles from '../scss/AccountDashboard.module.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as bootstrap from "bootstrap";

export default function StoreManagerIndex(){
    let [listOfStores,setListOfStores] = useState([]);
    let [errorMessage,setErrorMessage] = useState("")

    // functions
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
        const storeUrlInputElement = document.getElementById("storeUrlInput")
        if(validateStoreName(storeNameInputElement)){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "storeName": storeNameInputElement.value,
                "url":storeUrlInputElement.value
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
                updateStoreList()
            }else{
                displayErrorMessage(jsonResponse.message)
            }
        }else{
            displayErrorMessage("Please check for errors")
        }
    }
    const editStore = async ()=>{
        // Get elements
        const storeIdEditElement = document.getElementById("editStoreId")
        const storeNameEditElement = document.getElementById("editStoreName")
        const storeUrlEditElement = document.getElementById("editStoreUrl")

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "storeId": storeIdEditElement.value,
            "storeName": storeNameEditElement.value,
            "url": storeUrlEditElement.value
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch("/api/stores/editStoreById.php", requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            updateStoreList()
        }
    }
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
                newListOfStoreElements.push(<StoreListing key={x} updateStoreCallback={updateStoreList} storeId={jsonResponse.result[x]["storeId"]} storeName={jsonResponse.result[x]["storeName"]} storeUrl={jsonResponse.result[x]["url"]}/>)
            }
            setListOfStores(newListOfStoreElements)
        }
    }

    useEffect(()=>{
        updateStoreList()
    },[])

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
                        <h5 className="modal-title">Create new store</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input onChange={(event)=>{validateStoreName(event.target)}} type="text" className="form-control" id="storeNameInput" placeholder="Store name"/>
                            <div className="invalid-feedback" />
                            <label htmlFor="storeNameInput">New store name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" id="storeUrlInput" className="form-control" placeholder="store url"/>
                            <div className="invalid-feedback"/>
                            <label htmlFor="storeUrlInput">Store Url</label>
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
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="editStoreModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit store</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <input type="hidden" id="editStoreId"/>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="editStoreName" placeholder="Store name"/>
                            <label htmlFor="editStoreName">Store Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="editStoreUrl" placeholder="Store url"/>
                            <label htmlFor="editStoreUrl">Store Url</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={editStore} type="button" className="btn btn-dark" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function StoreListing(props){

    const deleteStore = async ()=>{
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`/api/stores/deleteStoreById.php?id=${props.storeId}`, requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            props.updateStoreCallback()
        }
    }

    const editStore = ()=>{
        document.getElementById("editStoreId").value = props.storeId
        document.getElementById("editStoreName").value = props.storeName
        document.getElementById("editStoreUrl").value = props.storeUrl
    }

    return <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
        <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
                <Link to={`${props.storeId}`} className={`${styles.storeDisplayName}`}><h5>{props.storeName}</h5></Link>
                <p className="fw-light">https://maxinn.es/store/{props.storeUrl}</p>
            </div>
            <div>
                <button onClick={editStore} data-bs-toggle="modal" data-bs-target="#editStoreModal" type="button" className="btn btn-outline-dark me-2">Edit</button>
                <button onClick={deleteStore} className="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
}