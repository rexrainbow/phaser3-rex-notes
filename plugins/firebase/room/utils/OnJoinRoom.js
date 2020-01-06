var OnJoinRoom = function (config) {
    this.roomID = config.roomID;
    this.roomName = config.roomName;
    this.roomType = config.roomType;

    this.emit('join', config);
}

export default OnJoinRoom;