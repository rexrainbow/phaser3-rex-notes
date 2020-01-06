import Broadcast from '../../broadcast/Broadcast.js';

var CreateBroadcast = function (config) {
    var broadcast = new Broadcast({
        eventEmitter: this.getEventEmitter(),
        eventNames: {
            receive: 'broadcast.receive'
        }
    });

    broadcast
        .setSender(this.userInfo);

    this
        .on('join', function (roomConfig) {
            broadcast
                .setRootPath(this.getRoomDataPath(roomConfig.roomID))
                .setReceiver('boradcast')
                .startReceiving()
        }, this)
        .on('leave', function () {
            broadcast
                .stopReceiving()
        }, this)

    return broadcast;
}

export default CreateBroadcast;