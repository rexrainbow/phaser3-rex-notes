var OnJoinRoom = function (config) {
    this.roomID = config.roomID;
    this.roomName = config.roomName;
    this.roomType = config.roomType;

    this.userList.startUpdate();

    var d = {
        roomID: this.roomID,
        roomName: this.roomName
    }
    this.emit('join', d);
}

export default OnJoinRoom;