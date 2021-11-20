import React from "react";

class AccountButtons extends React.Component{
    render() {
        return [<button type="button" className="btn btn-outline-dark me-3">Login</button>,
            <button type="button" className="btn btn-dark">Sign up</button>]
    }
}

export default AccountButtons;