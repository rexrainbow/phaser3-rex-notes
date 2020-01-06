import Broadcast from '../../broadcast/Broadcast.js';

var CreateBroadcast = function (config) {
    var broadcast = new Broadcast({
        eventEmitter: this.getEventEmitter(),
        eventNames: {
            receive: 'broadcast.receive'
        },

        root: this.rootPath,
        receiverID: 'boradcast',
        senderID: this.userInfo
    });

    this
        .on('join', broadcast.startReceiving, broadcast)
        .on('leave', broadcast.stopReceiving, broadcast)

    return broadcast;
}

export default CreateBroadcast;