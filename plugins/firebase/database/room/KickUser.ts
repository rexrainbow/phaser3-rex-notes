var KickUser = function(userID?: any) {
    if (!this.userList.contains(userID)) {
        return Promise.resolve();
    } else if (userID === this.userID) {
        return this.leaveRoom();
    } else {
        // TODO: Who can kick user?
        return this.userList.leave(userID);
    }
}

export default KickUser;