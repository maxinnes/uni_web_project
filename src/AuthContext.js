import {createContext} from "react";
// TODO This needs to be redone
// https://reactrouter.com/docs/en/v6/examples/auth
export const AuthContext = createContext({
    isLoggedIn:false,
    setIsLoggedIn: ()=>{}
})