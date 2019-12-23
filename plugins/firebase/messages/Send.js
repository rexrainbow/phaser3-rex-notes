var Send = function (message, sendToID) {
    if (sendToID === undefined) {
        sendToID = this.receiverID;
    }

    var data = {
        senderID: this.senderInfo.userID,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (this.senderInfo.userName) {
        data.senderName = this.senderInfo.userName;
    }
    if (sendToID) {
        data.receiverID = sendToID;
    }

    return this.rootRef.add(data);
}

export default Send;