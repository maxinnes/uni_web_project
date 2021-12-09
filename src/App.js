import React from "react";
import HomeIndex from "./Pages/Home/HomeIndex";
import {Route, Routes} from "react-router-dom";
import PricingIndex from "./Pages/Pricing/PricingIndex";
import AboutIndex from "./Pages/About/AboutIndex";

// TODO Im going to have to separate all the pages

class App extends React.Component{
  render() {
    return <Routes>
      <Route path="/" element={<HomeIndex/>} />
      <Route path="pricing" element={<PricingIndex/>} />
      <Route path="about" element={<AboutIndex />} />
    </Routes>
  }
}

export default App;
