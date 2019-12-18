var AddChildCallback = function (snapshot, prevName) {
    var item = this.addItem(snapshot, prevName);
    this.updateItemID2Index();

    this.emit(this.eventNames.add, item);
    this.emit(this.eventNames.update, this.items);
}

export default AddChildCallback;