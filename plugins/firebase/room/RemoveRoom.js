import GetRef from '../utils/GetRef.js';

var RemoveRoom = function (roomID) {
    if (roomID === undefined) {
        roomID = this.roomID;
    }
    if (roomID === undefined) {
        return Promise.resolve();
    }

    var d = {};
    d[`room-filter/${roomID}`] = null;
    d[`room-metadata/${roomID}`] = null;
    d[`rooms/${roomID}`] = null;
    var rootRef = GetRef(this.database, this.rootPath);
    return rootRef.update(d);
}

export default RemoveRoom;