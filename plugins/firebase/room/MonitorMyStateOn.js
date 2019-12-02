var MonitorMyStateOn = function () {
    var self = this;

    // Monitor user left/kicked
    var userRef = this.userList.getUserRef(this.userID).child('ID');
    this.monitorRefPaths.push(userRef.toString());
    userRef.on('value', function (snapshot) {
        var ID = snapshot.val();
        if (ID != null) {
            return;
        }
        self.onLeftRoom();
    });

    // Monitor filter (door state)
}

export default MonitorMyStateOn;