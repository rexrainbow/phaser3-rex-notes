var SetColumnCount = function(count?: any) {
    if (this.table.colCount === count) {
        return this;
    }
    this.table.setColumnCount(count);
    return this;
}

export default SetColumnCount;