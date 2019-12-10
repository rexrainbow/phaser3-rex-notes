import { GetRoomType } from "./RoomFilterMethods.js";

var TryJoinRoom = function (config) {
    var leftThenJoin = GetValue(config, 'leftThenJoin', true);

    var self = this;
    if (leftThenJoin) {
        return this.leaveRoom()
            .then(function () {
                return JoinRoom.call(self, config);
            })
    } else {
        return JoinRoom.call(self, config);
    }
}

var JoinRoom = function (config) {
    var self = this;
    return IsRoomOpened.call(self, config)
        .then(function (metadata) {
            return self.userList
                .setRootPath(this.getUserListPath(config.roomID))
                .setMaxUsers(metadata.maxUsers)
                .join();
        })
        .then(function () {
            self.onJoinRoom(config);
            return Promise.resolve();
        })
        .catch(function () {
            self.emit('join-fail', config);
            return Promise.reject();
        })
}

var IsRoomOpened = function (config) {
    var self = this;
    return this.getRoomMetadataRef(config.roomID).once('value')
        .then(function (snapshot) {
            var metadata = snapshot.val();
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
