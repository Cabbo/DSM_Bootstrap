import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class OrdersItem extends React.Component {
 

    componentDidMount() {
        //console.log('<OrdersItem> mounted');
    }
    componentWillUnmount() {
        //console.log('<OrdersItem> will unmount');
    }

    render() {
        let productnames = '';
        this.props.order.products.forEach((element, i) => {
            if (i > 0) { productnames = productnames.concat(', '); }
            productnames = productnames.concat(element.name);
        });
        // for (let i = 0; i < this.props.order.amounts.length; i++) {
        //     if (i > 0) { productnames = productnames.concat(', '); }
        //     productnames = productnames.concat(this.props.order.amounts[i].product.name);
        // }
        const date = new Date(this.props.timestamp);

        return (
            <div className=" column is-half">
                <div className="box">
                    <div className="media">
                        <div className="media-left align-self-center mr-3 ps-4">
                            <figure className="image  ms-3 ps-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                            </figure>
                        </div>
                        <div className="media-body align-self-center">
                            <b style={{ textTransform: "capitalize" }}>
                                {this.props.index}. -{" "}
                                Order ID {this.props.idb}{" "}
                                <span className="badge badge-primary">€ {this.props.totalPrice}</span>{" "}
                                <small className="badge badge-info">{` ${this.props.n} products`}</small>
                            </b>
                            <div>{"Date: "+date.toDateString()+" Time: "+ date.toTimeString()}</div>
                            <div><span style={{ fontWeight: "bold" }}>Products: </span> {productnames}</div>
                            <div><Link to={'/orders/' + this.props.idb}>See Details</Link></div>
                        </div>
                        <div
                            className="media-right align-self-center"
                            onClick={this.props.removeOrder}
                        >
                            <button type="button" className="btn btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}
// OrdersItem.propTypes = {
//     removeOrder: PropTypes.func
// }
export default OrdersItem;