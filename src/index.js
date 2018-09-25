import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import Login from "./components/Login";
import Chat from "./components/Chat";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./components/config/config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
      }
    });
  };
  componentDidMount() {
    this.authListener();
  }

  render() {
    return <div>{this.state.user ? <Chat /> : <Login />}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
