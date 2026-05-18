import Broadcast from '../../broadcast/Broadcast';
import GetValue from '../../../../utils/object/GetValue';

var CreateBroadcast = function(config?: any) {
    var broadcastConfig = GetValue(config, 'broadcast', true);
    if (!broadcastConfig) {
        return null;
    }

    var broadcast = new Broadcast({
        eventEmitter: this.getEventEmitter(),
        eventNames: {
            receive: 'broadcast.receive'
        },

        receiverID: 'boradcast',
        senderID: this.userInfo,
        history: GetValue(broadcastConfig, 'history', false)
    });

    this
        .on('room.join', function(roomConfig?: any) {
            broadcast
                .setRootPath(this.getRoomDataPath(roomConfig.roomID))
                .startReceiving()
        }, this)
        .on('room.leave', function() {
            broadcast.stopReceiving()
        }, this)
        .on('userlist.changename', function(userID?: any, userName?: any) {
            broadcast.changeUserName(userID, userName);
        }, this)

    return broadcast;
}

export default CreateBroadcast;