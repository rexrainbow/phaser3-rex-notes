var Send = function (message) {
    if ((!this.sendToRef) || (this.sendToRef.key !== this.receiverID)) {
        this.sendToRef = this.database.ref(this.rootPath).child(this.receiverID);
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
    return this.sendToRef.set(d);
}

export default Send;