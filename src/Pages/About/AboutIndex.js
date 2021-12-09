import React from "react";
import HomePageNavigation from "../../CommonComponents/nav/HomePageNavigation";

function AboutIndex(){
    return [<HomePageNavigation />,
        <div className="row mt-4">
        <div className="col-md-3"/>
        <div className="col-md-6">
            <h1>About page</h1>
            <p>Mercator is a modern and minimalist online store creator, designed to be used by anyone. Get started with 1 free store and 10 products.</p>
        </div>
        <div className="col-md-3"/>
    </div>]
}

export default AboutIndex