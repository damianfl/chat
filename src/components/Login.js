import React, { Component } from "react";
import "./Login.css";
import firebase from "./config/config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    console.log("zaladowane");
  }

  login = evt => {
    evt.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response =>
        response.user.updateProfile({
          displayName: this.state.name
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  signup = evt => {
    evt.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response =>
        response.user.updateProfile({
          displayName: this.state.name
        })
      )
      .catch(error => {
        console.log(error);
      });
    this.addUser();
  };
  addUser = () => {
    if (this.state.name.length >= 3 && this.state.name.length <= 10) {
      firebase
        .database()
        .ref("users/" + this.state.name)
        .set({
          username: this.state.name,
          email: this.state.email
        });
    }
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  render() {
    return (
      <div className="formWrapper">
        <form className="loginForm" action="">
          <div className="item--wrapper">
            <input
              className="loginForm--item styleInput"
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              name="name"
              placeholder="Podaj swoj nick"
            />
            <i class="fa fa-user-o" aria-hidden="true" />
          </div>
          <div className="item--wrapper">
            <input
              className=" loginForm--item styleInput"
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="Podaj maila"
            />
            <i class="fa fa-envelope-o" aria-hidden="true" />
          </div>
          <div className="item--wrapper">
            <input
              className="loginForm--item styleInput"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="Podaj haslo"
            />
            <i class="fa fa-key" aria-hidden="true"></i>
          </div>

          <button
            className="loginForm--item loginButton"
            type="submit"
            onClick={this.login}
          >
            Login
          </button>

          <button className="loginForm--item loginButton" onClick={this.signup}>
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
