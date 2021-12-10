import React from "react";
import HomeIndex from "./Pages/HomeIndex";
import {Route, Routes} from "react-router-dom";
import PricingIndex from "./Pages/PricingIndex";
import AboutIndex from "./Pages/AboutIndex";
import WelcomePages from "./Layouts/WelcomePages";

function App(){
  return <Routes>
    <Route exact path="/" element={<WelcomePages/>}>
      <Route index element={<HomeIndex/>} />
      <Route path="/pricing" element={<PricingIndex/>} />
      <Route path="/about" element={<AboutIndex/>} />
    </Route>
  </Routes>
}

export default App;