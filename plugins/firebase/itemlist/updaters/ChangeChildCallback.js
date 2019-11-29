var ChangeChildCallback = function (snapshot, prevName) {
    var item = this.removeItem(snapshot);
    this.updateItemID2Index();
    this.addItem(snapshot, prevName);
    this.updateItemID2Index();

    this.emit('change', item);
    this.emit('update', this.items);
}

export default ChangeChildCallback;