import MergeRight from '../../utils/object/MergeRight.js';
import { GetFilterString } from './utils/RoomFilterMethods.js';
import OnJoinRoom from './utils/OnJoinRoom.js';

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
    var doorState = config.door;
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

    var d = {};

    // Room-filter
    var roomFilterData = {
        filter: filter,
        name: roomName
    };
    d[`room-filters/${roomID}`] = roomFilterData;

    // Room-metadata
    var roomMetadata = {
        name: roomName,
        filter: filter,
        maxUsers: config.maxUsers,
        moderators: {}
    };
    roomMetadata.moderators[this.userID] = this.userName;
    d[`room-metadata/${roomID}`] = roomMetadata;


    var self = this;
    return new Promise(function (resolve, reject) {
        if (join) {
            var promise = self.userList
                .setRootPath(self.getUserListPath(roomID))
                .setMaxUsers(0) // Don't test max user count
                .join(); // Promise
            self.userList
                .setMaxUsers(config.maxUsers);
            return promise.then(resolve, reject);
        } else {
            return resolve();
        }
    })
        .then(function () {
            return self.getRootRef().update(d)
        })
        .then(function () {
            self.isRoomCreator = true;
            if (join) {
                OnJoinRoom.call(self, config);
            }
            return Promise.resolve(config);
        })
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