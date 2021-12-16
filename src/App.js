import {Route, Routes} from "react-router-dom";
import HomeIndex from "./Pages/HomeIndex";
import PricingIndex from "./Pages/PricingIndex";
import AboutIndex from "./Pages/AboutIndex";
import VerificationIndex from "./Pages/VerificationIndex";
import WelcomePages from "./Layouts/WelcomePages";
import {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import AccountDashboardLayout from "./Layouts/AccountDashboardLayout";

export default function App(){
  return <AuthProvider>
    <Routes>
      <Route exact path="/" element={<WelcomePages/>}>
        <Route index element={<HomeIndex/>} />
        <Route path="pricing" element={<PricingIndex/>} />
        <Route path="about" element={<AboutIndex/>}/>
        <Route path="verify/:verificationCode" element={<VerificationIndex/>}/>
      </Route>
      <Route path="account" element={<AccountDashboardLayout/>}/>
    </Routes>
  </AuthProvider>
}

function AuthProvider({children}){
  // Define login state
  let [isLoggedIn,setIsLoggedIn] = useState(false)
  // Manual update isLoggedIn
  const updateIsLoggedIn = ()=>{
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("/api/accounts/isLoggedIn.php", requestOptions)
        .then(async response => {
          const jsonResponse = await response.json()
          switch(jsonResponse.messageType){
            case "SUCCESS":
              setIsLoggedIn(true)
              break
            case "ERROR":
              setIsLoggedIn(false)
              break
            default:
              setIsLoggedIn(false)
          }
        })
        .catch(error => console.log('error', error));
  }
  // Define effect
  useEffect(updateIsLoggedIn,[])
  // Define methods
  const login = async (email,password)=>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "email": email,
      "password": password
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let didUserLogIn
    await fetch("/api/accounts/login.php", requestOptions)
        .then(async response => {
          const jsonResponse = await response.json()
          console.log(jsonResponse)
          switch(jsonResponse.messageType){
            case "SUCCESS":
              setIsLoggedIn(true)
              didUserLogIn = true
              break
            case "ERROR":
              setIsLoggedIn(false)
              didUserLogIn = false
              break
            default:
              setIsLoggedIn(false)
              didUserLogIn = false
          }
        })
        .catch(error => console.log('error', error));
    return didUserLogIn
  }
  const logout = ()=>{
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("/api/accounts/logout.php", requestOptions)
        .then(async response => {
          const jsonResponse = await response.json()
          switch(jsonResponse.messageType){
            case "SUCCESS":
              setIsLoggedIn(false)
              return false
            default:
              return isLoggedIn
          }
        })
        .catch(error => console.log('error', error));
  }
  // Define context value
  let value = {isLoggedIn,login,logout,updateIsLoggedIn}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}