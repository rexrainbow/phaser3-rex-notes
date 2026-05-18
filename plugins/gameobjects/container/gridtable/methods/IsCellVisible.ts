var IsCellVisible = function(cellIdx?: any) {
    var cell = this.table.getCell(cellIdx, false);
    return cell && this.visibleCells.has(cell);
}

export default IsCellVisible;