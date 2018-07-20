import React, {Component} from 'react';

import ChatApp from '../views/ChatApp';
import {Container} from 'flux/utils'
import ChatStore from '../data/ChatStore'
import ChatActions from '../data/ChatActions'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import "../App.css";

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

class ChatContainer extends Component {

    static getStores() {
        return [
            ChatStore
        ];
    }

    static calculateState() {
        return {
            chat: ChatStore.getState(),

            connect: ChatActions.connectWS,
            sendMessage: ChatActions.sendMessage,
            changeRoom: ChatActions.changeRoom,
        };
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Supportchat</h1>
                    </header>
                    <ChatApp {...this.state} {...this.props} />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Container.create(ChatContainer);