var Send = function (message) {
    var d = {
        senderID: this.senderInfo.userID,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (this.senderInfo.userName !== undefined) {
        d.senderName = this.senderInfo.userName;
    }
    if (this.receiverID !== undefined) {
        d.receiverID = this.receiverID;
    }

    return this.rootRef.add(d);
}

export default Send;