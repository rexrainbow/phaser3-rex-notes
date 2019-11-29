var RemoveChildCallback = function (params) {
    var item = this.removeItem(snapshot);
    this.updateItemID2Index();

    this.emit('remove', item);
    this.emit('update', this.items);
}

export default RemoveChildCallback;