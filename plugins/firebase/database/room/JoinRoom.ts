import { GetRoomType } from './utils/RoomFilterMethods';
import GetValue from '../../../utils/object/GetValue';
import OnJoinRoom from './utils/OnJoinRoom';

var TryJoinRoom = function(config?: any) {
    var leftThenJoin = GetValue(config, 'leftThenJoin', true);

    var self = this;
    if (leftThenJoin?: any) {
        return this.leaveRoom()
            .then(function() {
                return JoinRoom.call(self, config);
            })
    } else {
        return JoinRoom.call(self, config);
    }
}

var JoinRoom = function(config?: any) {
    var roomID = GetValue(config, 'roomID', undefined);
    if (roomID === undefined) {
        return Promise.reject();
    }

    this.isRemoveRoomWhenLeft = false;
    var self = this;
    return IsRoomOpened.call(self, config)
        .then(function(metadata?: any) {
            return self.userList
                .setRootPath(self.getUserListPath(config.roomID))
                .setMaxUsers(metadata.maxUsers)
                .join();
        })
        .then(function() {
            OnJoinRoom.call(self, config);
            return Promise.resolve(config);
        })
}

var IsRoomOpened = function(config?: any) {
    var self = this;
    return this.getRoomDataRef(config.roomID).once('value')
        .then(function(snapshot?: any) {
            var metadata = snapshot.val();
            if (metadata === null) { // Can't find room
                return Promise.reject();
            }

            config.roomName = metadata.name;
            config.roomType = GetRoomType(metadata.filter);
            if (!self.isRoomOpened(metadata)) {
                return Promise.reject();
            } else {
                return Promise.resolve(metadata);
            }
        });
}

export default TryJoinRoom;