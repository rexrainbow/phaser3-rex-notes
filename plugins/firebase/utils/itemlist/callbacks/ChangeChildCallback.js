var ChangeChildCallback = function (snapshot, prevName) {
    var item = this.removeItem(snapshot);
    this.updateItemID2Index();
    this.addItem(snapshot, prevName);
    this.updateItemID2Index();

    this.emit(this.eventNames.change, item);
    this.emit(this.eventNames.update, this.items);
}

export default ChangeChildCallback;