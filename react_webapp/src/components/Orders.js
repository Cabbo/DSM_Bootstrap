import React, { Component } from "react";
import withContext from "../containers/withContext";
import OrdersItem from './OrdersItem';
import axios from 'axios';


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            error: false
        };
    }

    componentDidMount() {
        console.log('<Orders> mounted');

        if (!this.props.context.auth) {
            this.props.history.push('/login');
        }else{
            //        axios.get('https://dsm-test-6ee3d-default-rtdb.europe-west1.firebasedatabase.app/orders.json?orderBy="$key"&equalTo="' + id + '"&auth=' + this.props.authIdToken)
            axios.get('https://dsm-test-6ee3d-default-rtdb.europe-west1.firebasedatabase.app/orders.json?orderBy="user"&equalTo="' + this.props.context.authData.localId + '"&auth=' + this.props.context.authData.idToken)
            .then(response => {
                let orders = [];
                for (let key in response.data) {
                    orders.push({
                        address: response.data[key].address,
                        n: response.data[key].n,
                        totalPrice: response.data[key].totalPrice,
                        products: response.data[key].products,
                        idb: key,
                        timestamp: response.data[key].timestamp
                    });
                }
                this.setState({ orders: orders });
            }).catch(error => {
                this.setState({ error: true });
            });
        }
    }

    componentWillUnmount() {
        console.log('<Orders> will unmount');
    }

    removeOrder = (index, idb) => {
        if (window.confirm("Do you really want to delete this order (" + index + ")?")) {
            axios.delete('https://dsm-test-6ee3d-default-rtdb.europe-west1.firebasedatabase.app/orders/' + idb + '.json?auth=' + this.props.context.authData.idToken)
                .then(response => {
                    console.log("Order deleted");
                }).catch(error => {
                    alert('Se ha producido un error \n' + error);
                    //this.setState({ error: true });
                });
            let orders = [...this.state.orders];
            orders.splice(index, 1);
            this.setState({ orders: orders });
        }
    }

    render() {
        const orders = this.state.orders;

        return (
            <>
                <div className="jumbotron is-primary">
                    <div className="jumbotron-body container">
                        <h4 className="title">Orders</h4>
                    </div>
                </div>
                <br />
                <div className="container">
                    <div className="column columns is-multiline">
                        {orders && orders.length ? (
                            orders.map((order, index) => (
                                <OrdersItem
                                    className="ms-3"
                                    authIdToken={this.props.context.authData.idToken}
                                    order={order}
                                    key={index}
                                    index={index}
                                    idb={order.idb}
                                    totalPrice={order.totalPrice}
                                    n={order.n}
                                    timestamp={order.timestamp}
                                    removeOrder={() => this.removeOrder(index, order.idb)}
                                />
                            ))
                        ) : (
                            <div className="column">
                                <span className="title has-text-grey-light">
                                    No orders found!
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default withContext(Orders);