import { GetFilterString } from './utils/RoomFilterMethods.js';

var SetRoomState = function (roomState) {
    if (!this.isInRoom()) {
        return Promise.resolve();
    }

    // TODO: Who can set room-state?
    var filter = GetFilterString(roomState, this.roomType);
    var d = {};
    d[`room-filters/${this.roomID}/filter`] = filter;
    d[`room-metadata/${this.roomID}/filter`] = filter;
    return this.getRootRef().update(d)
}

var OpenRoom = function () {
    return this.setRoomState('open');
}

var CloseRoom = function () {
    return this.setRoomState('closed');
}

export {
    SetRoomState,
    OpenRoom,
    CloseRoom
};