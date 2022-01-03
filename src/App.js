// Imports
import {useEffect, useState} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
// Context
import {AuthContext} from "./Context/AuthContext";
// Layouts
import WelcomePages from "./Layouts/WelcomePages";
import AccountDashboardLayout from "./Layouts/AccountDashboardLayout";
import FinishAccountSetupLayout from "./Layouts/FinishAccountSetupLayout";
import StoreLayout from "./Layouts/StoreLayout";
// Pages
import HomeIndex from "./Pages/HomeIndex";
import PricingIndex from "./Pages/PricingIndex";
import AboutIndex from "./Pages/AboutIndex";
import VerificationIndex from "./Pages/VerificationIndex";
import DashboardIndex from "./Pages/DashboardIndex";
import AccountIndex from "./Pages/AccountIndex";
import ChoosePlanIndex from "./Pages/ChoosePlanIndex";
import AccountSetupCheckoutIndex from "./Pages/AccountSetupCheckoutIndex";
import StoreManagerIndex from "./Pages/StoreManagerIndex";
import StoreEditIndex from "./Pages/StoreEditIndex";
import StoreIndex from "./Pages/StoreIndex";
import StoreCheckoutIndex from "./Pages/StoreCheckoutIndex";

export default function App(){
  return <AuthProvider>
    <Routes>
      <Route exact path="/" element={<WelcomePages/>}>
        <Route index element={<HomeIndex/>} />
        <Route path="pricing" element={<PricingIndex/>} />
        <Route path="about" element={<AboutIndex/>}/>
        <Route path="verify/:verificationCode" element={<VerificationIndex/>}/>
        <Route path="*" element={
          <Navigate to="/" />
        }/>
      </Route>
      <Route path="dashboard" element={<AccountDashboardLayout/>}>
        <Route index element={<DashboardIndex/>}/>
        <Route path="account" element={<AccountIndex/>}/>
        <Route path="storeManager" element={<StoreManagerIndex/>} />
        <Route path="storeManager/:storeId" element={<StoreEditIndex/>} />
      </Route>
      <Route path="finishAccountSetup" element={<FinishAccountSetupLayout/>}>
        <Route index element={<ChoosePlanIndex/>}/>
        <Route path="continue" element={<AccountSetupCheckoutIndex/>} />
      </Route>
      <Route path="store" element={<StoreLayout/>}>
        <Route path=":storeUrl" element={<StoreIndex/>} />
        <Route path=":storeUrl/checkout" element={<StoreCheckoutIndex/>}/>
      </Route>
    </Routes>
  </AuthProvider>
}

function AuthProvider({children}){
  // Define login state
  let [isLoggedIn,setIsLoggedIn] = useState(false)
  // Manual update isLoggedIn
  const updateIsLoggedIn = ()=>{
    async function getStatus() {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const response = await fetch("/api/accounts/isLoggedIn.php", requestOptions)
      const jsonResponse = await response.json()
      if(jsonResponse.messageType==="SUCCESS"){
        setIsLoggedIn(true)
        return true
      }else{
        setIsLoggedIn(false)
        return false
      }
    }
    return getStatus()
  }
  // Get auth details
  const getAccountAuthDetails = async ()=>{
    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetch("/api/accounts/getAccountAuthDetails.php", requestOptions)
    const jsonResponse = await response.json()
    if(jsonResponse.messageType==="SUCCESS"){
      return jsonResponse.result;
    }else{
      return jsonResponse.result;
    }
  }
  // Define effect
  useEffect(()=>{
    updateIsLoggedIn()
  },[])
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
  let value = {isLoggedIn,login,logout,updateIsLoggedIn,getAccountAuthDetails}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}