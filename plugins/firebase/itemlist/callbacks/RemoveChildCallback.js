var RemoveChildCallback = function (params) {
    var item = this.removeItem(snapshot);
    this.updateItemID2Index();

    this.emit(this.eventNames.remove, item);
    this.emit(this.eventNames.update, this.items);
}

export default RemoveChildCallback;