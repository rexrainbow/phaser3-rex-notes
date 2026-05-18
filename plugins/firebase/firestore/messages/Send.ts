var Send = function(message?: any) {
    var d = {
        senderID: this.userID,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (this.userName !== undefined) {
        d.senderName = this.userName;
    }
    if (this.receiverID !== undefined) {
        d.receiverID = this.receiverID;
    }

    return this.rootRef.add(d);
}

export default Send;