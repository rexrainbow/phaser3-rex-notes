var LeaveRoom = function () {
    if (!this.isInRoom()) {
        return Promise.resolve();
    }

    // 'user.leave' event -> 'leave' event -> then
    this.leftRoomFlag = true;
    if (this.isRemoveRoomWhenLeft) {
        // Remove room, include user list
        return this.removeRoom()
    } else {
        // Leave user list only        
        return this.userList.leave()
    }
}

export default LeaveRoom;