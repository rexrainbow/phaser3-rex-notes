import { GetFilterString } from './utils/RoomFilterMethods.js';

var ChangeRoomState = function (roomID, roomState) {
    if (arguments.length === 1) {
        roomState = roomID;
        roomID = undefined;
    }
    if (roomID === undefined) {
        roomID = this.roomID;
    }

    // TODO: Who can set room-state?
    var self = this;
    return this.getRoomMetadataRef(roomID).once('value')
        .then(function (snapshot) {
            var metadata = snapshot.val();
            if (metadata === null) { // Can't find room
                return Promise.reject();
            }

            var filter = GetFilterString(roomState, self.roomType);
            var d = {};
            d[`room-filters/${roomID}/filter`] = filter;
            d[`room-metadata/${roomID}/filter`] = filter;
            return self.getRootRef().update(d)
        })
}

var OpenRoom = function (roomID) {
    return this.setRoomState(roomID, 'open');
}

var CloseRoom = function (roomID) {
    return this.setRoomState(roomID, 'closed');
}

export {
    ChangeRoomState,
    OpenRoom,
    CloseRoom
};