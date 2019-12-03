var LeaveRoom = function () {
    if (!this.isInRoom()) {
        return Promise.resolve();
    }

    this.leftRoomFlag = true;
    if (this.isRemoveRoomWhenLeft) {
        // Remove room, include user list
        return this.removeRoom();
    } else {
        // Leave user list only -> MonitorMyState -> OnLeftRoom
        return this.usersList.leave();
    }
}

export default LeaveRoom;