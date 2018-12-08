var SetItems = function (items) {
    if (items === undefined) {
        this.items.length = 0;
    } else {
        this.items = items;
    }

    var table = this.childrenMap.table;
    table.setCellsCount(this.items.length);
    table.updateTable(true);

    // Controller
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;
    if (scroller) {
        scroller.setBounds(table.bottomTableOY, table.topTableOY).setValue(table.topTableOY);
        // Scroller also reflects to slider
    } else if (slider) {
        slider.setValue(0);
    } else {
        table.setTableOY(0);
    }
    if (slider) {
        slider.setEnable(table.tableHeight > table.instHeight);
    }
    return this;
}

export default SetItems;