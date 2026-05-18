import ShowCell from './updatetable/ShowCell';

var UpdateVisibleCell = function(cellIdx?: any) {
    var cell = this.table.getCell(cellIdx, false);
    if (!cell || !cell.container) {
        return this;
    }

    ShowCell.call(this, cell);

    return this;
}

export default UpdateVisibleCell;