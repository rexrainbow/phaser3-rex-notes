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

        var self = this;
        return this.receiverRef.once('value')
            .then(function (snapshot) {
                snapshot.forEach(OnReceive.bind(self));
                self.receiverRef.limitToFirst(1).on('child_added', OnReceive, self);
            });  // Promise
    },

    stopReceiving() {
        if (!this.isReceiving) {
            return this;
        }

        this.isReceiving = false;
        this.receiverRef.off('child_added', OnReceive, this);
        return Promise.resolve(); // Promise
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