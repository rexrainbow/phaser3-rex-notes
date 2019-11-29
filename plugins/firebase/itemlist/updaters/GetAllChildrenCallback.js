var ReceiveAllCallback = function (snapshot) {
    this.clear();
    snapshot.forEach(function (childSnapshot) {
        this.addItem(childSnapshot, null, true);
    }, this);
    this.updateItemID2Index();

    this.emit('update', this.items);
}

export default ReceiveAllCallback;