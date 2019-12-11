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
    var self = this;
    return this.sendToRef.push(d)
        .then(function () {
            self.emit('send', d);
            return Promise.resolve();
        })
        .catch(function (error) {
            self.emit('send-fail', d);
            return Promise.reject(error);
        }); // Promise
}

export default Send;