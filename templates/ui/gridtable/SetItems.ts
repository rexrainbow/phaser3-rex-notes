var SetItems = function(items?: any, updateTable?: any) {
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

    if (updateTable?: any) {
        table.updateTable(true);
        this.resizeController();
    }

    return this;
}

export default SetItems;