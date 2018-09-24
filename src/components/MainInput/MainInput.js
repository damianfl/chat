import React, { Component } from "react";
import "./MainInput.css";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class MainInput extends Component {
  constructor(props) {
    super(props);
  }
  focus = e => {
    this.nameInput.focus();
  };
  render() {
    return (
      <div className = "mainInputWrapper--wrapper">
        <div className={this.props.eclass}>
          <Picker onClick={this.focus} onSelect={this.props.addEmoji} />
        </div>
        <div className="mainInputWrapper">
          <input
            ref={input => {
              this.nameInput = input;
            }}
            className="mainInput"
            onChange={this.props.updateMessage}
            value={this.props.message}
            type="text"
            placeholder="Write a message ..."
          />
          <button className="showEmojisButton" onClick={this.props.showEmoji}>
            <i class="fa fa-smile-o" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

export default MainInput;
