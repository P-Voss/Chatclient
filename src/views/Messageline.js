import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
    messageLine: {
        display: 'inline-block',
        margin: '.1em 0',
        lineHeight: 1.5
    },
    sender: {
        fontWeight: 'bold',
        display: 'inline-block',
        width: 150,
        float: 'left',
    },
    message: {
        wordWrap: 'break-word',
        float: 'right',
        width: 1050,
        textAlign: 'left',
    },
    clear: {
        clear: 'both',
    }
});

const Messageline = ({sender = '', message = '', classes}) => {
    return (
        <p className={classes.messageLine}>
            <span className={classes.sender}>
                {sender}
            </span>
            <span className={classes.message}>
                {message}
            </span>
            <span className={classes.clear}></span>
        </p>
    );
};

export default withStyles(styles)(Messageline);