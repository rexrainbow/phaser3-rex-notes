var JoinRoom = function () {
    var self = this;
    return this.userList.join()
        .then(function () {
            self.emit('join');
            return Promise.resolve();
        })
}

export default JoinRoom;