import ChatActions from './data/ChatActions';
import Config from './config/config';


const socket = Config.serverConfig.ssl
    ? new WebSocket(`wss://${Config.serverConfig.host}:${Config.serverConfig.port}`)
    : new WebSocket(`ws://${Config.serverConfig.host}:${Config.serverConfig.port}`);

class Socket {

    static initSocket(access_key) {
        socket.addEventListener('open', () => {
            ChatActions.initUser(access_key);
        });
        socket.addEventListener('close', ChatActions.closeWS);
        socket.addEventListener('message', ChatActions.receiveMessage);
        socket.addEventListener('error', ChatActions.receiveError);
    }

    static send(data) {
        socket.send(data);
    }

    static close() {
        socket.close();
    }
}

export default Socket;