var IsCellVisible = function (cellIdx) {
    var cell = this.table.getCell(cellIdx, false);
    return cell && this.visibleCells.has(cell);
}

export default IsCellVisible;