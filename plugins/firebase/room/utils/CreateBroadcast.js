import Broadcast from '../../broadcast/Broadcast.js';
import GetValue from '../../../utils/object/GetValue.js';

var CreateBroadcast = function (config) {
    var broadcast = new Broadcast({
        eventEmitter: this.getEventEmitter(),
        eventNames: {
            receive: 'broadcast.receive'
        },

        receiverID: 'boradcast',
        senderID: this.userInfo,
        history: GetValue(config, 'boradcast.history', false)
    });

    this
        .on('join', function (roomConfig) {
            broadcast
                .setRootPath(this.getRoomDataPath(roomConfig.roomID))
                .startReceiving()
        }, this)
        .on('leave', function () {
            broadcast.stopReceiving()
        }, this)
        .on('userlist.changename', function (userID, userName) {
            broadcast.changeUserName(userID, userName);
        }, this)

    return broadcast;
}

export default CreateBroadcast;