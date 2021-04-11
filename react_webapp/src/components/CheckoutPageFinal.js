import React from "react";
import withContext from "../containers/withContext";

const CheckoutPageFinal = props => {
    const { cart } = props.context;
    const cartTotal = Object.values(cart).reduce(
        (sum, item) => sum + item.amount * parseFloat(item.product.price.replace(',', '.')), 0
    );
    //console.log(cart);

    return (
        <>
            <div className="jumbotron is-primary">
                <div className="jumbotron-body container">
                    <h4 className="title">Order Summary - Shipping information</h4>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="col-6 px-5">
                    <div className="col-4 my-1 ms-4">
                        <label>Full Name </label>
                        <input
                            type="text"
                            className="addressInfo my-1 ms-4"
                            placeholder="Mr Poolman"
                            name="addressInfo"
                            // onChange={(event) => this.setState({ addressName: event.target.value })}
                        />
                    </div>
                    <div className="col-4 my-1 ms-4">
                        <label>Delivery Address </label>
                        <input
                            type="text"
                            className="addressInfo my-1 ms-4"
                            placeholder="Tajonar Street 5,  31008 Pamplona"
                            name="addressInfo"
                            // onChange={(event) => props.setState({ addressStreet: event.target.value })}
                        />
                    </div>
                    <div className="ms-3">
                        <br />
                        <h2 className="is-pulled-right">
                            <span className="badge badge-primary align-middle">Total: {" "} € {cartTotal.toFixed(2)}</span>{" "}
                            <button
                                type="button"
                                className="btn btn-secondary btn-success align-middle"
                                onClick={() => {props.context.placeOrder(document.getElementsByName('addressInfo'),cartTotal)}}
                            >
                                Place Order{" "}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                            </button>{"  "}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withContext(CheckoutPageFinal);