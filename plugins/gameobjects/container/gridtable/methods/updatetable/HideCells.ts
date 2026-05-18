var HideCells = function() {
    var preList = this.preVisibleCells;
    var curList = this.visibleCells;
    var self = this;
    preList.forEach(function(cell?: any) {
        if (!curList.has(cell)) {
            self.hideCell(cell);
        }
    });
}

export default HideCells;