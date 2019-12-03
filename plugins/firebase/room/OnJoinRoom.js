var OnJoinRoom = function (config) {
    this.roomID = config.roomID;
    this.roomName = config.roomName;
    this.roomType = config.roomType;
    
    this.monitorMyStateOn();
    this.usersList.startUpdate();
}

export default OnJoinRoom;