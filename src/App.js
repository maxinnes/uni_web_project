// import {useContext, useState} from "react";
import {Route, Routes} from "react-router-dom";
import HomeIndex from "./Pages/HomeIndex";
import PricingIndex from "./Pages/PricingIndex";
import AboutIndex from "./Pages/AboutIndex";
import VerificationIndex from "./Pages/VerificationIndex";
import WelcomePages from "./Layouts/WelcomePages";
import AccountIndex from "./Pages/AccountIndex";

export default function App(){
  return <Routes>
    <Route exact path="/" element={<WelcomePages/>}>
      <Route index element={<HomeIndex/>} />
      <Route path="pricing" element={<PricingIndex/>} />
      <Route path="about" element={<AboutIndex/>} />
      <Route path="verify/:verificationCode" element={<VerificationIndex/>}/>
      <Route path="account" element={<AccountIndex />}/>
    </Route>
  </Routes>
}