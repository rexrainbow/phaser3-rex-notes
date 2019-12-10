import MergeRight from '../../utils/object/MergeRight.js';
import { GetFilterString } from './RoomFilterMethods.js';

var TryCreateRoom = function (config) {
    if (config === undefined) {
        config = {};
    }
    if (config.roomID == null) {
        config.roomID = this.getRoomRef().push().key;
    }

    var self = this;
    return RegisterRoom.call(self, config.roomID)
        .then(function () { // Create room
            return CreateRoom.call(self, config);
        });
}

var RegisterRoom = function (roomID) {
    return this.getRoomAliveRef(roomID)
        .transaction(function (value) {
            if (value === null) {  // Room is not existed, register success
                return true;
            }
            else {  // Room is existed, register fail
                return;    // Abort the transaction
            }
        });
}

var CreateRoom = function (config) {
    config = MergeRight(DefaultConfig, config);
    var roomID = config.roomID;
    var roomName = config.roomName;
    var roomType = config.roomType;
    var doorState = config.doorState;
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

    var filter = GetFilterString(doorState, roomType);
    // Room
    var roomData = {
        alive: true
    };
    if (join) {
        this.userList
            .setRootPath(this.getUserListPath(roomID))
            .setMaxUsers(0) // Don't test max user count
            .join(); // Promise
        this.userList
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
    roomMetadata.moderators[this.userInfo.userID] = this.userInfo.userName;

    var d = {};
    d[`rooms/${roomID}`] = roomData;
    d[`room-filter/${roomID}`] = roomFilterData;
    d[`room-metadata/${roomID}`] = roomMetadata;

    this.isRoomCreator = true;
    var self = this;
    return this.getRootRef().update(d)
        .then(function () {
            self.roomID = roomID;
            self.roomName = roomName;
            self.roomType = roomType;
            self.emit('create', self);
            if (join) {
                self.onJoinRoom(config);
            }
            return Promise.resolve();
        })
        .catch(function (error) {
            self.isRoomCreator = false;
            self.emit('create-fail', self);
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
    join: true
}

export default TryCreateRoom;