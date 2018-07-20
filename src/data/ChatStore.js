//import Immutable from "immutable";
import {ReduceStore} from "flux/utils";
import ChatActionTypes from "./ChatActionTypes";
import Dispatcher from "./Dispatcher";
import ResponseTypes from "../models/ResponseTypes";

class ChatStore extends ReduceStore {

    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            role: "user", currentChatroom: 0, chatIsActive: false, chatrooms: [], messages: [],
        };
    }

    reduce(state, action) {
        let {messages} = state;

        switch (action.type) {

            case ChatActionTypes.SEND_MESSAGE:
                return state;

            case ChatActionTypes.SWITCH_ROOM:
                state = {...state, currentChatroom: action.value, messages: [], chatIsActive: true};
                return state;

            case ChatActionTypes.RECEIVE_MESSAGE:
                return state;

            case ChatActionTypes.DISCONNECT_WS:
                messages.push({sender: "System", message: "Der Chat ist offline."});
                return state;

            case ResponseTypes.ACK_INIT:
                if (action.message.payload.role === "user") {
                    let {messages} = state;
                    messages.push({sender: "System", message: action.message.payload.message});
                    state = {...state, messages: messages, currentChatroom: action.message.payload.roomId, chatIsActive: true};
                } else {
                    state = {...state, role: action.message.payload.role};
                }

                return state;

            case ResponseTypes.DENIED:
                messages.push({sender: action.sender, message: action.message});
                state = {...state, messages: messages, chatIsActive: false, currentChatroom: 9999};

                return state;

            case ResponseTypes.ROOMLIST:
                state = {...state, chatrooms: action.message.payload};

                return state;

            case ResponseTypes.MESSAGE:
                messages.push({sender: action.sender, message: action.message});
                state = {...state, messages: messages};

                return state;

            default:
                return state;
        }
    }
}

export default new ChatStore();