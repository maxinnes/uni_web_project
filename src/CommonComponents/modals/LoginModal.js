import React from "react";
import * as bootstrap from "bootstrap";

class LoginModal extends React.Component{

    loginForm = <form>
        <div className="form-floating mt-3">
            <input onChange={event=>this.emailValidation(event.target)} className="form-control" type="email" id="loginEmailInput" placeholder="name@example.com"/>
            <div className="invalid-feedback" />
            <label htmlFor="emailInput">Email Address</label>
        </div>
        <div className="form-floating mt-3">
            <input onChange={event=>this.passwordValidation(event.target)} className="form-control" type="password" id="loginPasswordInput" placeholder="Password"/>
            <div className="invalid-feedback" />
            <label htmlFor="passwordInput">Password</label>
        </div>
    </form>

    constructor(props) {
        super(props);
        this.state = {
            toastMessage: "Sample message",
            modalBody: this.loginForm
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
        const passwordInputElement = element
        const password = passwordInputElement.value

        if(password.length === 0){
            passwordInputElement.classList.add("is-invalid")
            passwordInputElement.nextSibling.innerText = "Password cannot be empty"
            return false
        }else{
            passwordInputElement.classList.remove("is-invalid")
            return true
        }
    }
    displayErrorToast = (message)=>{
        const errorToast = document.getElementById("loginToastError")
        const toast = new bootstrap.Toast(errorToast)
        this.setState({toastMessage:message})
        toast.show()
    }
    submitAndValidateLoginForm(){
        // Get form elements
        const emailElement = document.getElementById("loginEmailInput")
        const passwordElement = document.getElementById("loginPasswordInput")
        // Check form before submit
        if(!this.emailValidation(emailElement)){
            this.displayErrorToast("Error with email")
        } else if(!this.passwordValidation(passwordElement)){
            this.displayErrorToast("Error with password")
        } else{
            // build request
            const email = emailElement.value
            const password = passwordElement.value

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "email": email,
                "password": password
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode:'cors'
            };

            fetch("/api/accounts/login.php", requestOptions)
                .then(async response => {
                    const jsonResponse = await response.json()
                    switch(jsonResponse.messageType){
                        case "SUCCESS":
                            //this.setState({modalBody:<h2>Logged in</h2>})
                            window.location.assign("/account")
                            break
                        case "ERROR":
                            this.displayErrorToast(jsonResponse.message)
                            break
                        default:
                            this.displayErrorToast("Something went wrong.")
                    }
                })
                .catch(error => console.log('error', error));
        }
    }
    render() {
        return (
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Login</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            {this.state.modalBody}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={()=>{this.submitAndValidateLoginForm()}} type="button" className="btn btn-dark">Submit</button>
                        </div>
                    </div>
                </div>
                <div className="toast-container position-absolute bottom-0 end-0 mb-5 me-5">
                    <div id="loginToastError" className="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">{this.state.toastMessage}</div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginModal;