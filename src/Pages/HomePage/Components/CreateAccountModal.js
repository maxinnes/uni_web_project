import React from "react";

class CreateAccountModal extends React.Component{
    submitFormDetails(){
        // Get form details
        let firstName = document.getElementById("registerFirstNameInput").value;
        let lastName = document.getElementById("registerLastNameInput").value;
        let email = document.getElementById("registerEmailInput").value;
        let password = document.getElementById("registerPasswordInput").value;
        let verifyPassword = document.getElementById("registerVerifyPasswordInput").value;

        // Create request
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "firstName": "Sam",
            "lastName": "Timothy",
            "email": "tim.123.sam2@email.com",
            "password": "12345"
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost/api/accounts/createAccount.php", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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
                                <input required className="form-control" type="text" id="registerFirstNameInput" placeholder="First Name"/>
                                <div className="invalid-feedback">
                                    First Name Required.
                                </div>
                                <label htmlFor="registerFirstNameInput">First Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input required className="form-control" type="text" id="RegisterLastNameInput" placeholder="Last Name"/>
                                <label htmlFor="RegisterLastNameInput">Last Name</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input required className="form-control" type="email" id="registerEmailInput" placeholder="name@example.com"/>
                                <label htmlFor="registerEmailInput">Email Address</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input required className="form-control" type="password" id="registerPasswordInput" placeholder="Password"/>
                                <label htmlFor="registerPasswordInput">Password</label>
                            </div>
                            <div className="form-floating mt-3">
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