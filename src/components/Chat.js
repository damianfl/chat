import React, { Component } from 'react';
// import logo from './../img/logo.svg';
import './Chat.css';
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyB3J3PCX0nWnVCY13Qwr-YJOo3P_0v571g",
  authDomain: "new-chat-8af61.firebaseapp.com",
  databaseURL: "https://new-chat-8af61.firebaseio.com",
  projectId: "new-chat-8af61",
  storageBucket: "new-chat-8af61.appspot.com",
  messagingSenderId: "555048126314"
};
firebase.initializeApp(config);

class Chat extends Component {
  constructor(props) {
    super(props)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      message: '',
      messages: [],
      pending: true
    }
  }

  componentDidMount() {
    firebase.database().ref('/messages/').on('value', (snapshot) => {
      const currentMessages = snapshot.val();

      const messagesArray = [];
      for (var key in currentMessages) {
        const obj = currentMessages[key];
        obj.id = key;
        messagesArray.push(obj)
      }

      this.setState({
        messages: currentMessages !== null ? messagesArray : [],
        pending: false
      })

    })


  }

  updateMessage(evt) {
    // console.log('update :' + evt.target.value)
    this.setState({
      message: evt.target.value
    })
  }
  submitMessage(evt) {
    evt.preventDefault();
    // console.log('submitMessage: ' + this.state.message);
    if (this.state.message === '') {
      return null;
    }
    const newMessage = {
      text: this.state.message
    }

    this.setState({
      message: ''
    });

    firebase.database()
      .ref('messages/')
      .push(newMessage)


  }

  // var list = Object.assign([], this.state.messages)
  // list.push(nextMessage)
  // this.setState({
  //   messages: list
  // })


  handleKeyPress(evt) {
    if (evt.key === 'Enter' && this.state.message !== '') {
      this.submitMessage(evt)
      var relative = document.getElementById("chattiee");
      relative.scrollTop = relative.scrollHeight;

    }

  }
  // var Input = React.createClass({
  //   render: function () {
  //     return <input type="text" onKeyPress={this._handleKeyPress} />;
  //   },
  //   _handleKeyPress: function(e) {
  //     if (e.key === 'Enter') {
  //       console.log('do validate');
  //     }
  //   }
  // });
  render() {

    if (this.state.pending) {
      return <p> Loading... </p>
    }


    const actualMessage = this.state.messages.map(mess => {
      return (
        <li key={mess.id}>{mess.text}</li>
      )
    })
    return (
      <div onKeyPress={this.handleKeyPress}>
        <div  style={{ width: '500px', height: '500px', overflowY: 'scroll' }}>
          {/*  */}
          <ul className='chattiee'>
            {actualMessage}
          </ul>
        </div>
        <input onChange={this.updateMessage} value={this.state.message} style={{ width: '800px', height: '50px', marginBottom: '50px', fontSize: '20px', padding: '10px' }} type="text" placeholder="Wprowadź wiadomość" />
        <br />
        <input onClick={this.submitMessage} style={{}} type="submit" value="Wyślij wiadomość" />
      </div >

    );
  }
} export default Chat;