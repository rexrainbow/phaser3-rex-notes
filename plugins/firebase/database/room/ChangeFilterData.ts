var ChangeFilterData = function(roomID?: any, filterData?: any) {
    if (arguments.length === 1) {
        filterData = roomID;
        roomID = undefined;
    }
    if (roomID === undefined) {
        roomID = this.roomID;
    }

    var self = this;
    return this.hasRoom(roomID)
        .then(function(hasRoom?: any) {
            if (!hasRoom) {
                return Promise.resolve();
            }
            return self.getRoomFilterRef(roomID).child('data').update(filterData)
        })
}

export default ChangeFilterData;