var ClearRoom = function (roomID) {
    return this.getRoomRef(roomID).remove();
}

export default ClearRoom;