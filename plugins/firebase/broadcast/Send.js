var Send = function (message, sendToID) {
    if (sendToID === undefined) {
        sendToID = this.receiverID;
    }
    if ((!this.sendToRef) || (this.sendToRef.key !== sendToID)) {
        this.sendToRef = this.database.ref(this.rootPath).child(sendToID);
    }

    // Clear message
    if (message === undefined) {
        return this.sendToRef.remove(); // Promise
    }

    var d = {
        message: message,
        senderID: this.senderInfo.userID,
        senderName: this.senderInfo.userName,
        stamp: this.stamp,
    };
    if (this.senderInfo.userName !== undefined) {
        d.senderName = this.senderInfo.userName;
    }
    this.skipFirst = false;
    this.stamp = !this.stamp;
    var self = this;
    return this.sendToRef.set(d)
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