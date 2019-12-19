var AddChildCallback = function (snapshot, prevName) {
    var item = this.addItem(snapshot, prevName);
    this.updateItemID2Index();

    this.emit(this.eventNames.add, item);
    this.emit(this.eventNames.update, this.items);
}

var ChangeChildCallback = function (snapshot, prevName) {
    var item = this.removeItem(snapshot);
    this.updateItemID2Index();
    this.addItem(snapshot, prevName);
    this.updateItemID2Index();

    this.emit(this.eventNames.change, item);
    this.emit(this.eventNames.update, this.items);
}

var RemoveChildCallback = function (snapshot) {
    var item = this.removeItem(snapshot);
    this.updateItemID2Index();

    this.emit(this.eventNames.remove, item);
    this.emit(this.eventNames.update, this.items);
}

var GetAllChildrenCallback = function (snapshot) {
    this.clear();
    snapshot.forEach((function (childSnapshot) {
        this.addItem(childSnapshot, null, true);
    }).bind(this));
    this.updateItemID2Index();

    this.emit(this.eventNames.update, this.items);
}

export {
    AddChildCallback,
    ChangeChildCallback,
    RemoveChildCallback,
    GetAllChildrenCallback
}