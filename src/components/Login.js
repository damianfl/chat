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
    firebase
      .database()
      .ref("users/" + this.state.name)
      .set({
        username: this.state.name,
        email: this.state.email
      });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  render() {
    const styleButton = {
      width: "100%",
      height: "40px",
      borderRadius: "5px",
      border: "0",
      marginBottom: "5px",
      fontWeight: "bold",
      backgroundColor: "#FA5185",
      color: "white"
    };
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <form
          style={{
            padding: "50px",
            border: "2px solid #FA5185",
            borderRadius: "7px"
          }}
          action=""
        >
          <h1 className="head">Log in:</h1>
          <input
            className="styleInput"
            onChange={this.handleChange}
            value={this.state.name}
            type="text"
            name="name"
            placeholder="Podaj swoje imie"
          />
          <br />
          <input
            className="styleInput"
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Podaj maila"
          />
          <br />
          <input
            className="styleInput"
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Podaj haslo"
          />
          <br />
          <div style={{ width: "100%", marginTop: "25px" }}>
            <button style={styleButton} type="submit" onClick={this.login}>
              Login
            </button>
            <br />
            <button style={styleButton} onClick={this.signup}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
