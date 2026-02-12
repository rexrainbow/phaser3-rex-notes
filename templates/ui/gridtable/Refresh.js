var Refresh = function () {
    var table = this.childrenMap.child;
    table.updateTable(true);
    this.resizeController();
    return this;
}

export default Refresh;