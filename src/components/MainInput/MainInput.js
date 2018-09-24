import React, { Component } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "./MainInput.css";

class MainInput extends Component {
  constructor(props) {
    super(props);
  }
  focus = e => {
    this.nameInput.focus();
  };
  render() {
    return (
      <div className="mainInputWrapper--wrapper">
        <div className={this.props.eclass}>
          <Picker
            style={{ width: "350px" }}
            onClick={this.focus}
            onSelect={this.props.addEmoji}
          />
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
          <button
            style={{ backgroundColor: this.props.ecolor }}
            className="showEmojisButton"
            onClick={this.props.showEmoji}
          >
            <i class="fa fa-smile-o" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

export default MainInput;
