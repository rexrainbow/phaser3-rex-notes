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
        this.skipFirst = true;  // Skip previous message
        this.receiverRef = GetRef(this.database, this.rootPath, receiverID);
        this.receiverRef.on('value', OnReceive, this);
        this.receiverRef.onDisconnect().remove();
        return this;
    },

    stopReceiving() {
        if (!this.isReceiving) {
            return this;
        }

        this.isReceiving = false;
        this.receiverRef.off('value', OnReceive, this);
        this.receiverRef.remove();
        this.receiverRef.onDisconnect().cancel();
        return this;
    }
}

var OnReceive = function (snapshot) {
    if (this.skipFirst) {
        this.skipFirst = false;
        return;
    }
    var d = snapshot.val();
    if (d == null) {
        return;
    }

    this.emit('receive', d);
}

export default methods;