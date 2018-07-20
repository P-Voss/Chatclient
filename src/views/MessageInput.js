import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = ({
    messageInput: {
        width: 800
    }, sendButton: {
        marginLeft: 25
    }
});

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChangeMessage(event) {
        this.setState({...this.state, message: event.target.value});
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.sendMessage();
        }
    }

    sendMessage() {
        this.props.handleSendMessage(this.state.message);
        this.setState({...this.state, message: ''});
    }

    render() {
        const {classes, isDisabled} = this.props;
        return (
            <div>
                <TextField onChange={(event) => this.handleChangeMessage(event)}
                           onKeyPress={(event) => this.handleKeyPress(event)}
                           className={classes.messageInput}
                           label="Nachricht"
                           value={this.state.message}
                           autoFocus={true}
                           disabled={isDisabled}/>
                <Button
                    className={classes.sendButton}
                    variant="raised"
                    onClick={() => this.sendMessage()}
                    disabled={isDisabled}
                >
                    Senden!
                </Button>
            </div>);
    }
}

export default withStyles(styles)(MessageInput);