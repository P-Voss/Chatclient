import React, {Component, Fragment} from "react";
import { withStyles } from '@material-ui/core/styles';

import Messageline from './Messageline';
import MessageInput from './MessageInput';

const styles = ({
    messageWindow: {
        height: "80%",
        width: 1200,
        textAlign: 'left',
        overflowY: 'auto',
    }
});


class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleSendMessage(value) {
        if (value.trim() !== '') {
            this.props.sendMessage(value, this.props.chat.currentChatroom);
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    render() {
        const {messages, chatIsActive} = this.props.chat;
        const {classes} = this.props;

        let isDisabled = !chatIsActive;
        return (
            <Fragment>
                <div className={classes.messageWindow}>
                    {messages.map((message, key) => <Messageline key={key} {...message}/> )}
                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <MessageInput isDisabled={isDisabled} handleSendMessage={this.handleSendMessage} />
            </Fragment>);
    }
}

export default withStyles(styles)(Chat);