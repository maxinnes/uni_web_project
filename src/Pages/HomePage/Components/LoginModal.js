import React from "react";

class LoginModal extends React.Component{
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
                            <form>
                                <div className="form-floating mt-3">
                                    <input className="form-control" type="email" id="loginEmailInput" placeholder="name@example.com"/>
                                    <label htmlFor="emailInput">Email Address</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <input className="form-control" type="password" id="loginPasswordInput" placeholder="Password"/>
                                    <label htmlFor="passwordInput">Password</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginModal;