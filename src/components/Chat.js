import React, { Component } from "react";
import "./Chat.css";
import firebase from "./config/config";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      pending: true,
      email: "hehehe",
      name: ""
    };
  }

  logOut = () => {
    firebase.auth().signOut();
  };

  getUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ email: user.email });
        console.log(user.email);
      }
    });
  };

  componentDidMount() {
    firebase
      .database()
      .ref("/messages/")
      .on("value", snapshot => {
        const currentMessages = snapshot.val();
        const messagesArray = [];
        for (var key in currentMessages) {
          const obj = currentMessages[key];
          obj.id = key;
          messagesArray.push(obj);
        }
        this.setState({
          messages: currentMessages !== null ? messagesArray : [],
          pending: false
        });
      });
    this.getUser();
  }
  updateMessage = evt => {
    this.setState({
      message: evt.target.value
    });
  };
  submitMessage = evt => {
    evt.preventDefault();

    if (this.state.message === "") {
      return null;
    }
    const newMessage = {
      text: this.state.message,
      user: this.state.email
    };

    this.setState({
      message: ""
    });

    firebase
      .database()
      .ref("messages/")
      .push(newMessage);
  };

  handleKeyPress = evt => {
    if (evt.key === "Enter" && this.state.message !== "") {
      this.submitMessage(evt);
      setTimeout(function() {
        const that = document.querySelector(".chxx");
        that.scrollTop = that.scrollHeight;
      }, 1);
    }
  };
  render() {
    if (this.state.pending) {
      return <p> Loading... </p>;
    }

    const actualMessages = this.state.messages.map(mess => {
      return (
        <li key={mess.id}>
          <strong>{mess.user}</strong> {mess.text}
        </li>
      );
    });
    return (
      <div onKeyPress={this.handleKeyPress}>
        <div
          className="chxx"
          style={{ width: "100%", height: "500px", overflowY: "scroll" }}
        >
          {/*  */}
          {actualMessages}
        </div>
        <input
          onChange={this.updateMessage}
          value={this.state.message}
          style={{
            width: "100%",
            height: "50px",
            marginBottom: "50px",
            fontSize: "20px",
            padding: "10px"
          }}
          type="text"
          placeholder="Wprowadź wiadomość"
        />
        <br />
        <input
          onClick={this.submitMessage}
          style={{}}
          type="submit"
          value="Wyślij wiadomość"
        />
        <div
          style={{
            width: "300px",
            height: "200px",
            backgroundColor: "yellowgreen",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          <p>{this.state.email}</p>
        </div>
        <button
          onClick={this.logOut}
          style={{ width: "100px", height: "100px" }}
        >
          Wyloguj
        </button>
      </div>
    );
  }
}
export default Chat;
