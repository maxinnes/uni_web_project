export default function AccountButtons(){
    // Define buttons
    // const loggedOutButtons = [
    //     <button type="button" className="btn btn-outline-dark me-3" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>,
    //     <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createAccountModal">Sign up</button>
    // ]
    // const loggedInButtons = [
    //     <NavLink to="/logout">
    //         <button type="button" className="btn btn-outline-dark me-3">Logout</button>
    //     </NavLink>,
    //     <NavLink to="/account">
    //         <button type="button" className="btn btn-dark">Account</button>
    //     </NavLink>
    // ]
    // // Define state
    // const [displayButtons,setDisplayButtons] = useState(loggedOutButtons)
    // // Get authentication context

    return <>
        <button type="button" className="btn btn-outline-dark me-3" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createAccountModal">Sign up</button>
    </>
}