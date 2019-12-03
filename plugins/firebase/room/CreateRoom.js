import MergeRight from '../../utils/object/MergeRight.js';
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
    config = MergeRight(DefaultConfig, config);
    var roomID = config.roomID;
    var roomName = config.roomName;
    var join = config.join;

    var roomRef = this.getRoomRef(roomID);
    var roomFilterRef = this.getRoomFilterRef(roomID);
    var roomMetadataRef = this.getRoomMetadataRef(roomID);

    // Remove room when creater is offline
    this.isRemoveRoomWhenLeft = !config.presisted;
    if (this.isRemoveRoomWhenLeft) {
        roomRef.onDisconnect().remove();
        roomFilterRef.onDisconnect().remove();
        roomMetadataRef.onDisconnect().remove();
    }

    var filter = GetFilterString(config.doorState, config.roomType);
    // Room
    var roomData = {
        alive: true
    };
    if (join) {
        this.usersList
            .setRootPath(`${this.rootPath}/rooms/${roomID}/users`)
            .setMaxUsers(0)
            .addUser(this.userID, this.userName)
            .setMaxUsers(config.maxUsers);
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
        maxUsers: config.maxUsers,
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
        .then(function () {
            if (join) {
                self.onJoinRoom(config);
            }
            return Promise.resolve();
        })
        .catch(function (error) {
            self.isRoomCreator = false;
            return Promise.reject(error);
        });
}

var DefaultConfig = {
    roomID: '',
    roomName: '',
    roomType: '',
    maxUsers: 0,
    presisted: false,
    door: 'open',
    join: false
}

export default TryCreateRoom;