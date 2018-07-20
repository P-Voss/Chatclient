import ChatActionTypes from "./ChatActionTypes";
import Dispatcher from "./Dispatcher";
import Message from "../models/Message";

import ResponseTypes from "../models/ResponseTypes";
import * as RequestTypes from "../models/RequestTypes";


import Socket from '../Socket';

const ChatActions = {
    connectWS(access_key) {
        Socket.initSocket(access_key);
    },
    initUser(access_key) {
        let message = new Message(RequestTypes.INIT, {access_key: access_key});
        Socket.send(JSON.stringify(message));
    },
    closeWS() {
        Dispatcher.dispatch({
            type: ChatActionTypes.DISCONNECT_WS,
        });
    },
    receiveMessage(messageString) {
        let messageData = JSON.parse(messageString.data);

        let message = new Message(messageData.messageType, messageData.payload);
        let payload = {};
        switch (messageData.messageType) {
            case ResponseTypes.ACK_INIT:
                payload = {
                    type: ResponseTypes.ACK_INIT,
                    message: message
                };
                break;
            case ResponseTypes.MESSAGE:
                payload = {
                    type: ResponseTypes.MESSAGE,
                    message: message.payload.message,
                    sender: message.payload.sender
                };
                break;
            case ResponseTypes.ROOMLIST:
                payload = {
                    type: ResponseTypes.ROOMLIST,
                    message: message
                };
                break;
            case ResponseTypes.DENIED:
                payload = {
                    type: ResponseTypes.DENIED,
                    sender: "System",
                    message: message.payload.message
                };
                Socket.close();
                break;
            default:
                break;
        }
        Dispatcher.dispatch(payload);
    },
    receiveError() {
        Dispatcher.dispatch({
            type: ChatActionTypes.RECEIVE_ERROR,

        });
    },
    sendMessage(text, currentChatroom) {
        let message = new Message(
            RequestTypes.MESSAGE,
            {currentRoomId: currentChatroom, message: text}
        );
        Socket.send(JSON.stringify(message));
        Dispatcher.dispatch({
            type: ChatActionTypes.SEND_MESSAGE, text
        });
    },
    changeRoom(currentRoomId, value) {
        let message = new Message(
            RequestTypes.SWITCH_ROOM,
            {currentRoomId: currentRoomId,nextRoomId: value}
        );
        Socket.send(JSON.stringify(message));
        Dispatcher.dispatch({
            type: ChatActionTypes.SWITCH_ROOM, currentRoomId: currentRoomId, value: value
        });
    },
};

export default ChatActions;