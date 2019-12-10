var OnLeftRoom = function () {
    var d = {
        roomID: this.roomID,
        roomName: this.roomName
    }
    this.roomID = undefined;
    this.roomName = undefined;
    this.doorState = undefined;

    this.monitorMyStateOff();
    this.userList.stopUpdate().clear();

    this.emit('leave', d);
    if (!this.leftRoomFlag) {
        this.emit('kicked', d);
    }
    this.leftRoomFlag = false;
}

export default OnLeftRoom;