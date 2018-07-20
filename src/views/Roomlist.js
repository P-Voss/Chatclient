import React, {Component, Fragment} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

const styles = ({

});


class Roomlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatRoom: this.props.currentChatroom
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event, value) {
        let currentRoomId = this.state.chatRoom;
        this.setState({...this.state, chatRoom: value});
        this.props.onChangeRoom(currentRoomId, value);
    }
    render() {

        const {chatrooms} = this.props;
        return (
            <Fragment>
                <Typography variant="subheading">
                    In folgenden Räumen brauchen User Hilfe:
                </Typography>
                <Tabs value={this.state.chatRoom} onChange={this.handleChange}>
                    <Tab value="0" label="Leitfaden Support" />
                    {chatrooms.map((room, key) => {
                        return <Tab value={room._roomId} color="primary" key={key} label={room._roomName}/>
                    })}
                </Tabs>
            </Fragment>);
    }
}

export default withStyles(styles)(Roomlist);