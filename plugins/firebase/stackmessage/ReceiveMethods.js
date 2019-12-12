import GetRef from '../utils/GetRef.js';

var methods = {
    startReceiving(receiverID) {
        if (receiverID === undefined) {
            receiverID = this.senderInfo.userID;
        }
        if (this.isReceiving && (this.receiverRef.key === receiverID)) {
            return this;
        }

        this.stopReceiving();

        this.isReceiving = true;
        this.receiverRef = GetRef(this.database, this.rootPath, receiverID);
        this.receiverRef.on('child_added', OnReceive, this);
        return this;
    },

    stopReceiving() {
        if (!this.isReceiving) {
            return this;
        }

        this.isReceiving = false;
        this.receiverRef.off('child_added', OnReceive, this);
        return this;
    }
}

var OnReceive = function (snapshot) {
    var d = snapshot.val();
    if (d == null) {
        return;
    }

    this.emit('receive', d);

    // Remove this child
    snapshot.ref.remove();
}

export default methods;