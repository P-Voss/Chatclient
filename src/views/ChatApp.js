import React, {Component} from "react";

import Chat from "./Chat";
import Roomlist from "./Roomlist";


class ChatApp extends Component {
    componentDidMount() {
        this.props.connect(this.props.access_key);
    }
    render () {
        var roomlist;
        if (this.props.chat.role === 'admin') {
            roomlist = <Roomlist {...this.props.chat} onChangeRoom={this.props.changeRoom}/>
        }
        var chat;
        if (this.props.chat.currentChatroom > 0) {
            chat = <Chat {...this.props}/>;
        }
        return (
            <React.Fragment>
                {roomlist}
                {chat}
            </React.Fragment>
        );
    }
}


export default ChatApp;