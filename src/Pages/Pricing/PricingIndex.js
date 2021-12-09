import React from "react";
import HomePageNavigation from "../../CommonComponents/HomePageNavigation";
import LoginModal from "../../CommonComponents/modals/LoginModal";
import CreateAccountModal from "../../CommonComponents/modals/CreateAccountModal";

function PricingIndex(){
    return [<HomePageNavigation/>,
        <div className="row mt-4">
        <div className="col-md-1"/>
        <div className="col-md">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tier One</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Free</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">One Store</li>
                        <li className="list-group-item">Ten Products</li>
                        <li className="list-group-item">1GB Storage</li>
                        <li className="list-group-item">15% Of Transactions</li>
                    </ul>
                    <a href="#" className="mt-3 btn btn-dark">Buy</a>
                </div>
            </div>
        </div>
        <div className="col-md">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tier Two</h5>
                    <h6 className="card-subtitle mb-2 text-muted">£5 /M</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Three Stores</li>
                        <li className="list-group-item">Thirty Products</li>
                        <li className="list-group-item">10GB Storage</li>
                        <li className="list-group-item">15% Of Transactions</li>
                    </ul>
                    <a href="#" className="mt-3 btn btn-dark">Buy</a>
                </div>
            </div>
        </div>
        <div className="col-md">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tier Three</h5>
                    <h6 className="card-subtitle mb-2 text-muted">£25 /M</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Unlimited Stores</li>
                        <li className="list-group-item">Unlimited Products</li>
                        <li className="list-group-item">1TB Storage</li>
                        <li className="list-group-item">5% Of Transactions</li>
                    </ul>
                    <a href="#" className="mt-3 btn btn-dark">Buy</a>
                </div>
            </div>
        </div>
        <div className="col-md-1"/>
    </div>,
    <LoginModal/>,
    <CreateAccountModal/>]
}

export default PricingIndex