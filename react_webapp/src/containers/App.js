import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
//import jwt_decode from 'jwt-decode';

import Cart from './../components/Cart';
import Login from './../components/Login';
import ProductList from './../components/ProductList';
import CheckoutPage from './../components/CheckoutPage';
import CheckoutPageFinal from './../components/CheckoutPageFinal';
import Orders from './../components/Orders';
import OrdersDetail from './../components/OrdersDetail';

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: null,
      cart: {},
      products: [],
      showMenu: true,
      auth: false,
      authData: {}
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    console.log('<App> mounted');
    // let user = localStorage.getItem("user");
    // user = user ? JSON.parse(user) : null;
    // this.setState({user: user });

    //get productlist from firebase database
    const products = await axios.get('https://dsm-test-6ee3d-default-rtdb.europe-west1.firebasedatabase.app/products.json');
    this.setState({products: products.data });
  }

  componentWillUnmount() {
    console.log('<App> unmount');
  }


  //AUTH state
  // state = {
  //   auth: false,
  //   authData: {}
  // }

  //AUTH methods
  setAuthentication = (auth, data) => {
    this.setState({ auth: auth });
    this.setState({ authData: data });
  }

  logoutUser = () => {
    this.setState({ auth: false });
    this.setState({ authData: {} });
    alert("You have been logged out")
  }

  //CART METHODS
  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    //localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id] && cart[cartItem.id].amount > 1) {
      cart[cartItem.id].amount -= cartItem.amount;
    } else if (cart[cartItem.id] && cart[cartItem.id].amount === 1) {
      delete cart[cartItem.id];
    }
    //localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    //localStorage.removeItem("cart");
    this.setState({ cart });
  };

  //CHECKOUT METHODS
  checkout = () => {
    if (!this.state.auth) {
      this.routerRef.current.history.push("/login");
      return;
    }
    this.routerRef.current.history.push("/checkout");
  };

  checkoutFinal = () => {
    if (!this.state.auth) {
      this.routerRef.current.history.push("/login");
      return;
    }
    this.routerRef.current.history.push("/checkoutFinal");
  };

  placeOrder = (info, total) => {
    //console.log("Placing Order")
    if (!this.state.auth) {
      this.routerRef.current.history.push("/login");
      return;
    }
    let address = '';
    info.forEach(element => {
      address = address.concat(element.value, ' && ');
    });
    const cart = this.state.cart;
    const amount = Object.values(cart).reduce(
      (sum, item) => sum + item.amount, 0
    );
    const data = {
      user: this.state.authData.localId,
      address: address,
      totalPrice: total,
      n: amount,
      amounts: Object.values(cart),
      products: [],
      timestamp: Date.now()
    };
    Object.values(cart).forEach(element => {
      data.products.push(element.product);
    });
    
    axios.post('https://dsm-test-6ee3d-default-rtdb.europe-west1.firebasedatabase.app/orders.json?auth='+this.state.authData.idToken, data)
      .then(response => {
        alert('Pedido realizado correctamente \n Muchas Gracias');
        this.setState({ grabado: true });
        //confirmation
        this.routerRef.current.history.push("/products");
        this.clearCart();
      }).catch(error => {
        alert('Se ha producido un error \n'+error);
        //this.setState({ error: true });
      });
  };


  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setAuthentication: this.setAuthentication,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
          checkout: this.checkout,
          checkoutFinal: this.checkoutFinal,
          placeOrder: this.placeOrder
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App mb-3">
            <nav
              className="navbar navbar-dark bg-dark navbar-expand-sm"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <b className="navbar-item h2">eShop</b>
                <label
                  role="button"
                  className="navbar-toggler"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div className={`navbar-nav justify-content-end  h5  !${this.state.showMenu ? "collapse navbar-collapse" : ""
                }`} >
                <Link to="/products" className="navbar-item mr-5">
                  Products
                </Link>
                <Link to="/orders" className="navbar-item mr-5">
                  Orders
                </Link>
                <Link to="/cart" className="navbar-item mr-5">
                  <span className="badge badge-light">
                    Cart {" "}
                    <span className="badge badge-primary mr-2 ms-2">
                      {Object.values(this.state.cart).reduce(
                        (sum, item) => sum + item.amount, 0
                      )}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </span>
                </Link>
                {!this.state.auth ? (
                  <Link to="/login" className="navbar-item mr-5">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logoutUser} className="navbar-item">
                    Logout
                  </Link>
                )}
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" render={(props) => <Login {...props} setAuthentication={this.setAuthentication} />}/>
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/checkout" component={CheckoutPage} />
              <Route exact path="/checkoutFinal" component={CheckoutPageFinal} />
              <Route exact path="/orders" render={(props) => <Orders {...props} />} />
              <Route path="/orders/:id" render={(props) => <OrdersDetail {...props} auth={this.state.auth} authIdToken={this.state.authData.idToken} />} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
