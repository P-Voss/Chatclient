export default class Message {
    constructor(messageType, payload, messageId) {
        this.messageType = messageType;
        this.payload = payload;
        this.messageId = messageId;
    }

    getType() {
        return this.messageType;
    }
    getPayload() {
        return this.payload;
    }
    getId() {
        return this.messageId;
    }
}