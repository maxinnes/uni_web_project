import React from "react";

class CreateAccountModal extends React.Component{
    // firstNameInputValidation(){
    //     let firstName = document.getElementById("registerFirstNameInput").value;
    //     if(firstName.length===0){
    //         this.setState(prevState =>{
    //             let firstName = Object.assign({}, prevState.firstNameInput);
    //             firstName.classNames.indexOf("is-invalid") === -1 ? firstName.classNames.push("is-invalid") : console.log("Class already applied")
    //             firstName.invalidFeedback = "First name cannot be empty"
    //             return { firstName };
    //         })
    //     } else{
    //         this.setState(prevState =>{
    //             let firstName = Object.assign({}, prevState.firstNameInput);
    //             firstName.classNames.indexOf("is-invalid") > -1 ? firstName.classNames.splice(firstName.classNames.indexOf("is-invalid"),1) : console.log("Class already applied")
    //             firstName.invalidFeedback = ""
    //             return { firstName };
    //         })
    //     }
    // }

    // submitFormDetails(){
    //     // Get form details
    //     let firstName = document.getElementById("registerFirstNameInput").value;
    //     let lastName = document.getElementById("registerLastNameInput").value;
    //     let email = document.getElementById("registerEmailInput").value;
    //     let password = document.getElementById("registerPasswordInput").value;
    //     let verifyPassword = document.getElementById("registerVerifyPasswordInput").value;
    //
    //     //if(password!==verifyPassword){
    //         //throw new Error()
    //     //}
    //
    //     // Create request
    //     let myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //
    //     let raw = JSON.stringify({
    //         "firstName": firstName,
    //         "lastName": lastName,
    //         "email": email,
    //         "password": password
    //     });
    //
    //     let requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };
    //
    //     fetch("http://localhost/api/accounts/createAccount.php", requestOptions)
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    // }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         firstNameInput:{
    //             classNames: ["form-control"],
    //             invalidFeedback: ""
    //         }
    //     }
    // }
    
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
                                <input required className="form-control" type="text" id="registerFirstNameInput" placeholder="First Name"/>
                                <div className="invalid-feedback" />
                                <label htmlFor="registerFirstNameInput">First Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input required className="form-control" type="text" id="registerLastNameInput" placeholder="Last Name"/>
                                <label htmlFor="RegisterLastNameInput">Last Name</label>
                                <div className="invalid-feedback">
                                    Last Name Required.
                                </div>
                            </div>
                            <div className="form-floating mt-3">
                                <input required className="form-control" type="email" id="registerEmailInput" placeholder="name@example.com"/>
                                <label htmlFor="registerEmailInput">Email Address</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input required className="form-control" type="password" id="registerPasswordInput" placeholder="Password"/>
                                <label htmlFor="registerPasswordInput">Password</label>
                            </div>
                            <div className="form-floating my-3">
                                <input required className="form-control" type="password" id="registerVerifyPasswordInput" placeholder="Verify Password"/>
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