var SetItems = function (items, updateTable) {
    if (items === undefined) {
        this.items = [];
    } else {
        this.items = items;
    }

    if (updateTable === undefined) {
        updateTable = true;
    }

    var table = this.childrenMap.child;
    table.setCellsCount(this.items.length);

    if (updateTable) {
        this.refresh();
    }

    return this;
}

export default SetItems;