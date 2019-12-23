var Send = function (message, sendToID) {
    if (sendToID === undefined) {
        sendToID = this.receiverID;
    }

    var d = {
        senderID: this.senderInfo.userID,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (this.senderInfo.userName !== undefined) {
        d.senderName = this.senderInfo.userName;
    }
    if (sendToID !== undefined) {
        d.receiverID = sendToID;
    }

    return this.rootRef.add(d);
}

export default Send;