var OnLeftRoom = function () {
    this.userList.stopUpdate().clear();

    // Clear room info later
    var self = this;
    setTimeout(function () {
        self.roomID = undefined;
        self.roomName = undefined;
        self.doorState = undefined;
        self.leftRoomFlag = false;
    }, 0);
}
export default OnLeftRoom;