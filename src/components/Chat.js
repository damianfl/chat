import React, { Component } from "react";
import "./Chat.css";
import firebase from "./config/config";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      users: [],
      // pending: true,
      email: "",
      name: ""
    };
  }
  logOut = () => {
    firebase
      .database()
      .ref("users/" + this.state.name)
      .remove();

    firebase.auth().signOut();
  };
  getUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.displayName) {
        console.log(user.displayName);
        this.setState({
          email: user.email,
          name: user.displayName || "Annonymous"
        });
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
          messages: currentMessages !== null ? messagesArray : []
          // pending: false
        });
      });

    firebase
      .database()
      .ref("/users/")
      .on("value", snapshot => {
        const currentUsers = snapshot.val();
        const usersArray = [];
        for (var key in currentUsers) {
          const obj = currentUsers[key];
          obj.id = key;
          usersArray.push(obj);
        }
        this.setState({
          users: currentUsers !== null ? usersArray : []
        });
      });

    setTimeout(() => {
      this.getUser();
    }, 500);
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
      user: this.state.name
    };

    this.setState({
      message: ""
    });
    setTimeout(function() {
      const that = document.querySelector(".chat");
      that.scrollTop = that.scrollHeight;
    }, 1);

    firebase
      .database()
      .ref("messages/")
      .push(newMessage);
  };

  handleKeyPress = evt => {
    if (evt.key === "Enter" && this.state.message !== "") {
      this.submitMessage(evt);
      setTimeout(function() {
        const that = document.querySelector(".chat");
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
        <li
          className="listItem"
          style={{ marginBottom: "5px", listStyle: "none" }}
          key={mess.id}
        >
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {mess.user}:
          </span>{" "}
          <span>{mess.text}</span>
        </li>
      );
    });
    const actualUsers = this.state.users.map(mess => {
      return (
        <li
          className="userItem"
          style={{ marginBottom: "5px", color: "#fa5185" }}
          key={mess.id}
        >
          <strong>{mess.username}</strong>
        </li>
      );
    });
    return (
      <div className="wrapper" onKeyPress={this.handleKeyPress}>
        <div style={{ height: "10px" }} />
        <div className="mainChat">
          <div className="chat">{actualMessages}</div>
          <div className="userList">{actualUsers}</div>
          <input
            className="mainInput"
            onChange={this.updateMessage}
            value={this.state.message}
            type="text"
            placeholder="Wprowadź wiadomość"
          />
          <input
            className="inputSend"
            onClick={this.submitMessage}
            style={{}}
            type="submit"
            value="Wyślij wiadomość"
          />
          <div className="signOut">
            <button className="out" onClick={this.logOut}>
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Chat;
