var JoinRandomRoom = function (config) {
    if (this.lockAction) {
        return this;
    }

    this.lockAction = true;
    var retry = GetValue(config, 'retry', 10);

    
}

export default JoinRandomRoom;
