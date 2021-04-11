import React from 'react';
import axios from 'axios';

class OrdersDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                address:""
            },
            date: new Date(),
            productnames: "",
            addressStr: "",
            error: false
        };
    }
    componentDidMount() {
        console.log('<OrderDetail> mounted');
        const id = this.props.match.params.id;
        axios.get('https://dsm-test-6ee3d-default-rtdb.europe-west1.firebasedatabase.app/orders.json?orderBy="$key"&equalTo="' + id + '"&auth=' + this.props.authIdToken)
            .then(response => {
                const order = Object.values(response.data)[0];
                //console.log( order);
                this.setState({ order: order });

                let productnames = '';
                const date = new Date(order.timestamp);
                for (let i = 0; i < order.amounts.length; i++) {
                    if (i > 0) { productnames = productnames.concat(', '); }
                    productnames = productnames.concat(order.amounts[i].product.name);
                }
                this.setState({ date: date, productnames: productnames });
            }).catch(error => {
                alert(error);
                this.setState({ error: true });
            });
    }


    render() {
        //let dateText =this.state.date;
        let addressStr = this.state.addressStr;
        const addressArr=this.state.order.address.split("&&");
        for (let i = 0; i < addressArr.length; i++) {
            if (i > 0) { addressStr = addressStr.concat(', '); }
            addressStr = addressStr.concat(addressArr[i]);
        }


        return (
            <>
                <div className="jumbotron is-primary">
                    <div className="jumbotron-body container">
                        <h4 className="title">Order Detail</h4>
                    </div>
                </div>
                <br />
                <div className="container">
                    <div className="column">
                        <div className="media">
                            <div className="media-left  mr-3 ps-4">
                                <figure className="image  ms-5 ps-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                </figure>
                            </div>
                            <div className="media-body align-self-center">
                                <b style={{ textTransform: "capitalize" }}>
                                    Order ID {this.state.order.idb}{" "}
                                    <span className="badge badge-primary">€ {this.state.order.totalPrice}</span>{" "}
                                    <small className="badge badge-info">{` ${this.state.order.n} products`}</small>
                                </b>
                                <div>{"Date: " + this.state.date.toDateString() + " Time: " + this.state.date.toTimeString()}</div>
                                {/* <div><span style={{ fontWeight: "bold" }}>Products: </span> {this.state.productnames}</div> */}
                                <div><span style={{ fontWeight: "bold" }}>Delivery Address: </span> {addressStr}</div>
                                <br />
                                <div>
                                    <h5>Products on this order:</h5>
                                    {this.state.order.amounts && this.state.order.amounts.length ? (
                                        this.state.order.amounts.map((productAm, index) => (
                                            <div key={index} className=" column is-half">
                                                <div className="box">
                                                    <div className="media">
                                                        <div className="media-left">
                                                            <figure className="image is-64x64">
                                                                <img
                                                                    src={productAm.product.image}
                                                                    alt={productAm.product.name}
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </figure>
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <b style={{ textTransform: "capitalize" }}>
                                                                {productAm.product.name}{" "}
                                                                <span className="tag is-primary">€{productAm.product.price}</span>{" "}
                                                                <small className="badge badge-info">{` ${productAm.amount} products`}</small>
                                                            </b>
                                                            <div>{productAm.product.shortDesc}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="column">
                                            <span className="title has-text-grey-light">
                                                No products on your order found!
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default OrdersDetail;