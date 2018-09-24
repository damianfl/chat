import React, { Component } from "react";
import firebase from "./config/config";
import { CSSTransitionGroup } from "react-transition-group";
import "emoji-mart/css/emoji-mart.css";
import "./Chat.css";

import MainInput from "./MainInput/MainInput";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      users: [],
      email: "",
      name: "",
      pending: true,
      eclass: "notVis", 
      ecolor: "transparent"
    };
  }
  updateMessage = e => {
    this.setState({
      message: e.target.value
    });
  };
  getUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.displayName) {
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
          messages: currentMessages !== null ? messagesArray : [],
          pending: false
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
    }, 1000);
  }

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
      const chatWindow = document.querySelector(".chat");
      chatWindow.scrollTop = chatWindow.scrollHeight;
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

  hide = () => {
    if (this.state.eclass === "vis") {
      this.setState({
        eclass: "notVis",
        ecolor: "transparent"  
      });
    }
  };
  addEmoji = e => {
    let emojiPic = String.fromCodePoint(`0x${e.unified}`);
    this.setState({
      message: this.state.message + emojiPic
    });
  };
  showEmoji = e => {
    if (this.state.eclass === "notVis") {
      this.setState({
        eclass: "vis",
        ecolor: "rgba(141, 83, 83, 0.856)"
      });
    } else {
      this.setState({
        eclass: "notVis",
        ecolor: "transparent"
      });
    }
  };
  logOut = () => {
    firebase
      .database()
      .ref("users/" + this.state.name)
      .remove();
    firebase.auth().signOut();
  };

  render() {
    if (this.state.pending) {
      return (
        <div className="loading">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw" />
        </div>
      );
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
              fontWeight: "bold",
              marginRight: "10px"
            }}
          >
            {mess.user}:
          </span>
          <span>{mess.text}</span>
        </li>
      );
    });
    const actualUsers = this.state.users.map(messages => {
      return (
        <li className="userItem" key={messages.id}>
          <strong>{messages.username}</strong>
        </li>
      );
    });
    return (
      <div
        className="wrapper"
        onClick={this.hide}
        onKeyPress={this.handleKeyPress}
      >
        <div style={{ height: "10px" }} />
        <div className="mainChat">
          <div className="chat">
            <CSSTransitionGroup
              transitionName="EnterTransition"
              transitionAppear={false}
              transitionEnter={true}
              transitionEnterTimeout={500}
              transitionLeave={true}
              transitionLeaveTimeout={500}
            >
              {actualMessages}
            </CSSTransitionGroup>
          </div>
          <div className="userList">{actualUsers}</div>

          <MainInput
            message={this.state.message}
            updateMessage={this.updateMessage}
            showEmoji={this.showEmoji}
            eclass={this.state.eclass}
            ecolor={this.state.ecolor}
            addEmoji={this.addEmoji}

          />

          <input
            className="inputSend"
            onClick={this.submitMessage}
            style={{}}
            type="submit"
            value="Send your message"
          />
          <button className="logout--button" onClick={this.logOut}>
            log out
          </button>
        </div>
      </div>
    );
  }
}
export default Chat;
