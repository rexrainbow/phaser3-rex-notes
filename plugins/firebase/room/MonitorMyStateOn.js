var MonitorMyStateOn = function () {
    var self = this;

    // Monitor user left/kicked
    var userRef = this.userList.getUserRef(this.userID).child('userID');
    this.monitorRefPaths.push(userRef.toString());
    userRef.on('value', function (snapshot) {
        var userID = snapshot.val();
        if (userID != null) {
            return;
        }
        self.onLeftRoom();
    });

    // Monitor filter (door state)
}

export default MonitorMyStateOn;