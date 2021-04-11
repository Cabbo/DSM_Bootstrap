import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../containers/withContext";
import axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authSent: false
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  loginHandler = () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    };
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBa9_ju-BrOa4sTTYRv7v9N9ECgPIxeFHY', authData)
      .then(response => {
        this.props.setAuthentication(true, response.data);
        this.setState({ authSent: true });
      })
      .catch(err => {
        console.log(this.props.context);
        this.props.context.setAuthentication(false, {});
        alert('Auth Error, please try again');
        console.log(err);
      });
  }

  render() {
    let redirect = null;
    if (this.state.authSent) {
      redirect = (<Redirect to="/products" />)
    }

    return (
      <>
        {redirect}
        <div className="jumbotron is-primary">
          <div className="jumbotron-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="col-xs-12 col-md-6 px-5">
            <div className="row form-group">
              <label>Email</label>{" "}
              <input
                type="text"
                className="form-control"
                placeholder="example@mail.com"
                value={this.state.email}
                onChange={(event) => this.setState({ email: event.target.value })}
              />
            </div>
            <div className="row form-group">
              <label>Password</label>{" "}
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password} 
                onChange={(event) => this.setState({ password: event.target.value })}
              />
            </div>
            <div className="row">
              <button
                className="btn btn-success"
                onClick={this.loginHandler}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withContext(Login);