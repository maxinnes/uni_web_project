import React from "react";
import * as bootstrap from 'bootstrap';

class CreateAccountModal extends React.Component{

    submitButton = <button onClick={()=>this.validateAndSubmitForm()} type="submit" className="btn btn-dark">Submit</button>

    modalAccountCreatedPage = [<h2 className="">Account Created</h2>,
    <p className="">Please check your email.</p>]

    modalCreateAccountForm = <form noValidate className="needs-validation">
        <div className="form-floating mt-3">
            <input onChange={(event)=>{this.nameValidation(event.target)}} required className="form-control" type="text" id="registerFirstNameInput" placeholder="First Name"/>
            <div className="invalid-feedback" />
            <label htmlFor="registerFirstNameInput">First Name</label>
        </div>
        <div className="form-floating mt-3">
            <input onChange={(event)=>{this.nameValidation(event.target)}} required className="form-control" type="text" id="registerLastNameInput" placeholder="Last Name"/>
            <div className="invalid-feedback" />
            <label htmlFor="RegisterLastNameInput">Last Name</label>
        </div>
        <div className="form-floating mt-3">
            <input onChange={(event)=>{this.emailValidation(event.target)}} required className="form-control" type="email" id="registerEmailInput" placeholder="name@example.com"/>
            <div className="invalid-feedback"/>
            <label htmlFor="registerEmailInput">Email Address</label>
        </div>
        <div className="form-floating mt-3">
            <input onChange={(event)=>{this.passwordValidation(event.target)}} required className="form-control" type="password" id="registerPasswordInput" placeholder="Password"/>
            <div className="invalid-feedback"/>
            <label htmlFor="registerPasswordInput">Password</label>
        </div>
        <div className="form-floating my-3">
            <input onChange={(event)=>{this.passwordVerifyValidation(event.target)}} required className="form-control" type="password" id="registerVerifyPasswordInput" placeholder="Verify Password"/>
            <div className="invalid-feedback"/>
            <label htmlFor="registerVerifyPasswordInput">Verify Password</label>
        </div>
    </form>

    constructor(props) {
        super(props);
        this.state = {
            toastMessage:"Sample text",
            modalBody: this.modalCreateAccountForm,
            submitButton: this.submitButton
        }
    }
    nameValidation(element){
        const nameInputElement = element
        const name = nameInputElement.value
        if(name.length===0) {
            nameInputElement.classList.add("is-invalid")
            nameInputElement.nextSibling.innerText = "First Name must be longer than 0"
            return false
        }else if(!/^[a-zA-Z]+$/gm.test(name)){
            nameInputElement.classList.add("is-invalid")
            nameInputElement.nextSibling.innerText = "Invalid name syntax"
            return false
        }else{
            nameInputElement.classList.remove("is-invalid")
            return true
        }
    }
    emailValidation(element){
        const emailInputElement = element
        const email = emailInputElement.value
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(email.length===0){
            emailInputElement.classList.add("is-invalid")
            emailInputElement.nextSibling.innerText = "Email must be longer than 0"
            return false
        }else if(!emailRegex.test(email)){
            emailInputElement.classList.add("is-invalid")
            emailInputElement.nextSibling.innerText = "Invalid email syntax"
            return false
        }else {
            emailInputElement.classList.remove("is-invalid")
            return true
        }
    }
    passwordValidation(element){
        //document.getElementById("registerVerifyPasswordInput").value = ""
        const passwordInputElement = element
        const password = passwordInputElement.value

        if(password.length < 5){
            passwordInputElement.classList.add("is-invalid")
            passwordInputElement.nextSibling.innerText = "Password must be longer then 5 characters."
            return false
        }else{
            passwordInputElement.classList.remove("is-invalid")
            return true
        }
    }
    passwordVerifyValidation(element){
        const password = document.getElementById("registerPasswordInput").value
        const passwordVerifyElement = element
        const passwordVerify = passwordVerifyElement.value
        if(password!==passwordVerify){
            passwordVerifyElement.classList.add("is-invalid")
            passwordVerifyElement.nextSibling.innerText = "Passwords do not match."
            return false
        }else{
            passwordVerifyElement.classList.remove("is-invalid")
            return true
        }
    }
    displayErrorToast = (message)=>{
        const errorToast = document.getElementById("registerToastError")
        const toast = new bootstrap.Toast(errorToast)
        this.setState({toastMessage:message})
        toast.show()
    }
    validateAndSubmitForm = ()=>{
        // Get form elements
        const firstNameElement = document.getElementById("registerFirstNameInput")
        const lastNameElement = document.getElementById("registerLastNameInput")
        const emailElement = document.getElementById("registerEmailInput")
        const passwordElement = document.getElementById("registerPasswordInput")
        const verifyPasswordElement = document.getElementById("registerVerifyPasswordInput")
        // Check form before submit
        if(!this.nameValidation(firstNameElement) || !this.nameValidation(lastNameElement)){
            this.displayErrorToast("Error with first or last name field")
        }else if(!this.emailValidation(emailElement)){
            this.displayErrorToast("Error with email field")
        } else if(!this.passwordValidation(passwordElement)){
            this.displayErrorToast("Password is invalid")
        } else if(!this.passwordVerifyValidation(verifyPasswordElement)){
            this.displayErrorToast("Passwords do not match")
        } else {
            // Build api request
            const firstName = firstNameElement.value
            const lastName = lastNameElement.value
            const email = emailElement.value
            const password = passwordElement.value

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password":password
            });
            const requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'};
            fetch("http://localhost/api/accounts/createAccount.php", requestOptions)
                .then(async serverResponse =>{
                    const jsonResponse = await serverResponse.json()
                    switch (jsonResponse.messageType){
                        case "SUCCESS":
                            this.setState({modalBody:this.modalAccountCreatedPage})
                            this.displaySubmitButton(false)
                            break
                        case "ERROR":
                            this.displayErrorToast(jsonResponse.message)
                            break
                        default:
                            this.displayErrorToast("Something went wrong")
                    }
                })
                .catch(error => console.log('error', error));
        }
    }
    displaySubmitButton(option){
        if(option){
            this.setState({submitButton:this.submitButton})
        } else{
            this.setState({submitButton:null})
        }
    }
    render() {
        return <div className="modal fade" id="createAccountModal" tabIndex="-1" aria-labelledby="createAccountModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel">Create Account</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        {this.state.modalBody}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {this.state.submitButton}
                    </div>
                </div>
            </div>
            <div className="toast-container position-absolute bottom-0 end-0 mb-5 me-5">
                <div id="registerToastError" className="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">{this.state.toastMessage}</div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CreateAccountModal;