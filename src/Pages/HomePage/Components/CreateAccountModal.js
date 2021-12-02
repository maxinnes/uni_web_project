import React from "react";

class CreateAccountModal extends React.Component{
    constructor(props) {
        super(props);
        this.errorList = {
            "firstNameError":false,
            "lastNameError":false,
            "emailNameError":false,
            "passwordNameError":false,
            "verifyPasswordNameError":false
        }
    }
    nameValidation(event){
        const nameInputElement = event.target
        const name = nameInputElement.value
        if(name.length===0) {
            nameInputElement.classList.add("is-invalid")
            nameInputElement.nextSibling.innerText = "First Name must be longer than 0"
        }else if(!/^[a-zA-Z]+$/gm.test(name)){
            nameInputElement.classList.add("is-invalid")
            nameInputElement.nextSibling.innerText = "Invalid name syntax"
        }else{
            nameInputElement.classList.remove("is-invalid")
        }
    }
    emailValidation(event){
        const emailInputElement = event.target
        const email = emailInputElement.value
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(email.length===0){
            emailInputElement.classList.add("is-invalid")
            emailInputElement.nextSibling.innerText = "Email must be longer than 0"
        }else if(!emailRegex.test(email)){
            emailInputElement.classList.add("is-invalid")
            emailInputElement.nextSibling.innerText = "Invalid email syntax"
        }else {
            emailInputElement.classList.remove("is-invalid")
        }
    }
    passwordValidation(event){
        document.getElementById("registerVerifyPasswordInput").value = ""
        const passwordInputElement = event.target
        const password = passwordInputElement.value

        if(password.length < 5){
            passwordInputElement.classList.add("is-invalid")
            passwordInputElement.nextSibling.innerText = "Password must be longer then 5 characters."
        }else{
            passwordInputElement.classList.remove("is-invalid")
        }
    }
    passwordVerifyValidation(event){
        const password = document.getElementById("registerPasswordInput").value
        const passwordVerifyElement = event.target
        const passwordVerify = passwordVerifyElement.value
        if(password!==passwordVerify){
            passwordVerifyElement.classList.add("is-invalid")
            passwordVerifyElement.nextSibling.innerText = "Passwords do not match."
        }else{
            passwordVerifyElement.classList.remove("is-invalid")
        }
    }
    validateAndSubmitForm(){
        const firstName = document.getElementById("registerFirstName").value
        const lastName = document.getElementById("registerLastName").value
        const email = document.getElementById("registerEmailName").value
        const password = document.getElementById("registerPassword").value
        const verifyPassword = document.getElementById("registerPassword").value
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
                        <form noValidate className="needs-validation">
                            <div className="form-floating mt-3">
                                <input onChange={(event)=>{this.nameValidation(event)}} required className="form-control" type="text" id="registerFirstNameInput" placeholder="First Name"/>
                                <div className="invalid-feedback" />
                                <label htmlFor="registerFirstNameInput">First Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input onChange={(event)=>{this.nameValidation(event)}} required className="form-control" type="text" id="registerLastNameInput" placeholder="Last Name"/>
                                <div className="invalid-feedback" />
                                <label htmlFor="RegisterLastNameInput">Last Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input onChange={(event)=>{this.emailValidation(event)}} required className="form-control" type="email" id="registerEmailInput" placeholder="name@example.com"/>
                                <div className="invalid-feedback"/>
                                <label htmlFor="registerEmailInput">Email Address</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input onChange={(event)=>{this.passwordValidation(event)}} required className="form-control" type="password" id="registerPasswordInput" placeholder="Password"/>
                                <div className="invalid-feedback"/>
                                <label htmlFor="registerPasswordInput">Password</label>
                            </div>
                            <div className="form-floating my-3">
                                <input onChange={(event)=>{this.passwordVerifyValidation(event)}} required className="form-control" type="password" id="registerVerifyPasswordInput" placeholder="Verify Password"/>
                                <div className="invalid-feedback"/>
                                <label htmlFor="registerVerifyPasswordInput">Verify Password</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CreateAccountModal;