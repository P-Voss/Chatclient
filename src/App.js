import React, {Component} from "react";
import "./App.css";
import * as ResponseTypes from "./models/ResponseTypes";
import * as RequestTypes from "./models/RequestTypes";
import Message from "./models/Message";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Chat from "./views/Chat";
import Roomlist from "./views/Roomlist";

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: 'user',
            currentChatroom: 0,
            chatIsActive: true,
            chatrooms: [],
            messages: [],
        };
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleOpenWs = this.handleOpenWs.bind(this);
        this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
        this.handleReceiveError = this.handleReceiveError.bind(this);
        this.handleCloseWs = this.handleCloseWs.bind(this);
        this.switchRoom = this.switchRoom.bind(this);

        this.access_key = this.props.access_key;
    }

    componentDidMount() {

        this.ws = new WebSocket("ws://vmphilipp:3001");
        this.ws.addEventListener("open", this.handleOpenWs);
        this.ws.addEventListener("close", this.handleCloseWs);
        this.ws.addEventListener("message", this.handleReceiveMessage);
        this.ws.addEventListener("error", this.handleReceiveError);
    }

    handleOpenWs() {
        let message = new Message(RequestTypes.INIT, {access_key: this.access_key});
        this.ws.send(JSON.stringify(message));
    }

    handleReceiveMessage(response) {
        var message = JSON.parse(response.data);
        let {messages} = this.state;

        if (message.messageType === ResponseTypes.ACK_INIT) {
            if (message.payload.role === 'user') {
                messages.push({sender: "System", message: message.payload.message});
                this.setState({
                    ...this.state,
                    messages: messages,
                    chatIsActive: true,
                    currentChatroom: message.payload.roomId,
                });
            } else {
                this.setState({
                    ...this.state,
                    chatIsActive: true,
                    role: message.payload.role
                });
            }
        }

        if (message.messageType === ResponseTypes.DENIED) {
            messages.push({sender: "System", message: message.payload.message});
            this.setState({
                ...this.state,
                messages: messages,
                chatIsActive: false,
                currentChatroom: 9999,
            });
            this.ws.close();
        }

        if (message.messageType === ResponseTypes.ROOMLIST) {
            this.setState({...this.state, chatrooms: message.payload});
        }
        if (message.messageType === ResponseTypes.MESSAGE) {
            messages.push({sender: message.payload.sender, message: message.payload.message});
            this.setState({...this.state, messages: messages});
        }
        if (message.messageType === ResponseTypes.SWITCH_ROOM) {

        }
    }

    handleReceiveError() {

    }

    handleCloseWs() {

    }

    handleSendMessage(messageText) {
        let message = new Message(
            RequestTypes.MESSAGE,
            {currentRoomId: this.state.currentChatroom, message: messageText}
        );
        this.ws.send(JSON.stringify(message));
    }

    switchRoom(currentRoomId, nextRoomId) {
        this.setState({...this.state, currentChatroom: nextRoomId, messages: []});
        const message = {
            messageType: RequestTypes.SWITCH_ROOM,
            payload: {
                currentRoomId: currentRoomId,
                nextRoomId: nextRoomId
            }
        };
        this.ws.send(JSON.stringify(message));
    }

    render() {
        const {messages, chatrooms, currentChatroom, role, chatIsActive} = this.state;
        var chat;
        if (currentChatroom > 0) {
            chat = <Chat messages={messages} chatIsActive={chatIsActive} sendMessage={this.handleSendMessage}/>;
        }
        var roomlist;
        if (role === 'admin') {
            roomlist = <Roomlist chatrooms={chatrooms} currentChatroom={currentChatroom} onRoomChange={this.switchRoom}/>
        }
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Supportchat</h1>
                    </header>
                    {roomlist}
                    {chat}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
