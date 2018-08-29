import React, { Component } from "react";
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

  login = evt => {
    evt.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        console.log(error);
      });
  };

  signup = evt => {
    evt.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  render() {
    return (
      <div>
        <form action="">
          <input
            onChange={this.handleChange}
            value={this.state.name}
            type="text"
            name="name"
            placeholder="Podaj swoje imie"
          />
          <br />
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Podaj maila"
          />
          <br />
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Podaj haslo"
          />
          <br />

          <button type="submit" onClick={this.login}>
            Login
          </button>
          <button onClick={this.signup}>Sign up</button>
        </form>
      </div>
    );
  }
}

export default Login;
