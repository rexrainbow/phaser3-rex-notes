var AddChildCallback = function (snapshot, prevName) {
    var item = this.addItem(snapshot, prevName);
    this.updateItemID2Index();

    this.emit('add', item);
    this.emit('update', this.items);
}

export default AddChildCallback;