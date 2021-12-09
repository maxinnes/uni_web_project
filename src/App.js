import React from "react";
import HomeIndex from "./Pages/Home/HomeIndex";
import {Route, Routes} from "react-router-dom";

// TODO Im going to have to separate all the pages

class App extends React.Component{
  render() {
    return <Routes>
      <Route path="/" element={<HomeIndex/>} />
      {/*<Route path="/pricing" element={<HomeIndex pageBody={"pricing"}/>} />*/}
      {/*<Route path="/about" element={<HomeIndex pageBody={"about"}/>} />*/}
    </Routes>
  }
}

export default App;
