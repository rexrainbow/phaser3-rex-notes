import Const from './Const.js';
import GetValue from '../../utils/object/GetValue.js';
import GetFilterString from './GetFilterString.js';

var TryCreateRoom = function (config) {
    if (config === undefined) {
        config = {};
    }
    if (config.roomID == null) {
        config.roomID = this.getRoomRef().push().key;
    }

    var self = this;
    return TestRoomAlive.call(self, config.roomID)
        .then(function () { // Create room
            return CreateRoom.call(self, config);
        });
}

var TestRoomAlive = function (roomID) {
    return this.getRoomAliveRef(roomID)
        .transaction(function (value) { // Test if room is existed
            if (value === null) {
                return true;
            }
            else {
                return;    // Abort the transaction
            }
        });
}

var CreateRoom = function (config) {
    var roomID = config.roomID;
    var roomName = GetValue(config, 'roomName', '');
    var roomType = GetValue(config, 'roomType', '');
    var maxUsers = GetValue(config, 'maxUsers', 0);
    var isPersistedRoom = GetValue(config, 'presisted', false);
    var doorState = GetValue(config, 'door', 'open'); // 0(close), 1(open)
    var join = GetValue(config, 'join', true);

    var roomRef = this.getRoomRef(roomID);
    var roomFilterRef = this.getRoomFilterRef(roomID);
    var roomMetadataRef = this.getRoomMetadataRef(roomID);

    // Remove room when creater is offline
    this.isRemoveRoomWhenLeft = !isPersistedRoom;
    if (this.isRemoveRoomWhenLeft) {
        roomRef.onDisconnect().remove();
        roomFilterRef.onDisconnect().remove();
        roomMetadataRef.onDisconnect().remove();
    }

    var filter = GetFilterString(doorState, roomType);
    // Room
    var roomData = {
        alive: true
    };
    if (join) {    // TODO:  ??
        this.usersList
            .setRootPath(`${this.rootPath}/rooms/${roomID}/users`)
            .setMaxUsers(maxUsers)
            .addUser(this.userID, this.userName, true);
    }
    // Room-filter
    var roomFilterData = {
        filter: filter,
        name: roomName
    };
    // Room-metadata
    var roomMetadata = {
        name: roomName,
        filter: filter,
        maxUsers: maxUsers,
        moderators: {}
    };
    roomMetadata.moderators[this.userID] = this.userName;

    var d = {};
    d[`rooms/${roomID}`] = roomData;
    d[`room-filter/${roomID}`] = roomFilterData;
    d[`room-metadata/${roomID}`] = roomMetadata;

    this.isRoomCreator = true;
    var self = this;
    return this.getRootRef().update(d)
        .catch(function (error) {
            self.isRoomCreator = false;
            return Promise.reject(error);
        });
}

export default TryCreateRoom;