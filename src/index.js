import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './components/Chat';
import registerServiceWorker from './registerServiceWorker';
// import * as firebase from 'firebase'

// var config = {
//     apiKey: "AIzaSyB3J3PCX0nWnVCY13Qwr-YJOo3P_0v571g",
//     authDomain: "new-chat-8af61.firebaseapp.com",
//     databaseURL: "https://new-chat-8af61.firebaseio.com",
//     projectId: "new-chat-8af61",
//     storageBucket: "new-chat-8af61.appspot.com",
//     messagingSenderId: "555048126314"
// };
// firebase.initializeApp(config);



class App extends React.Component {
    render() {
        return (
            <div>
                <Chat />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
