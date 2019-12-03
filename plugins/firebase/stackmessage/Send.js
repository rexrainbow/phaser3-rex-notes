import GetRef from '../utils/GetRef.js';

var Send = function (sendToID, message) {
    if ((!this.sendToRef) || (this.sendToRef.key !== sendToID)) {
        this.sendToRef = GetRef(this.database, this.rootPath, sendToID);
    }

    // Clear message
    if (message === undefined) {
        return this.sendToRef.remove(); // Promise
    }

    var d = {
        message: message,
        senderID: this.senderInfo.userID,
        senderName: this.senderInfo.userName,
    };
    return this.sendToRef.push(d); // Promise
}

export default Send;