import ArrayFill from '../../../plugins/utils/array/Fill.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ResetGrid = function (
    columnCount, rowCount,
    columnProportions, rowProportions,
    space
) {
    if (columnCount === undefined) { columnCount = 0; }
    if (rowCount === undefined) { rowCount = 0; }
    if (columnProportions === undefined) { columnProportions = 0; }
    if (rowProportions === undefined) { rowProportions = 0; }

    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.gridCount = columnCount * rowCount;

    // children
    this.removeAll();
    this.sizerChildren.length = columnCount * rowCount;
    ArrayFill(this.sizerChildren, null);

    // proportions
    this.columnProportions = [];
    this.columnProportions.length = columnCount;
    if (typeof (columnProportions) === 'number') {
        ArrayFill(this.columnProportions, columnProportions);
    } else {
        for (var i = 0; i < columnCount; i++) {
            this.columnProportions[i] = columnProportions[i] || 0;
        }
    }
    this.rowProportions = [];
    this.rowProportions.length = rowCount;
    if (typeof (rowProportions) === 'number') {
        ArrayFill(this.rowProportions, rowProportions);
    } else {
        for (var i = 0; i < rowCount; i++) {
            this.rowProportions[i] = rowProportions[i] || 0;
        }
    }

    // width & height
    this.columnWidth = [];
    this.columnWidth.length = columnCount;
    this.rowHeight = [];
    this.rowHeight.length = rowCount;

    // space
    this.setColumnSpace(GetValue(space, 'column', 0));
    this.setRowSpace(GetValue(space, 'row', 0));

    var scene = this.scene;
    var createCellContainerCallback = this.createCellContainerCallback;
    if (createCellContainerCallback) {
        for (var y = 0, ycnt = this.rowCount; y < ycnt; y++) {
            for (var x = 0, xcnt = this.columnCount; x < xcnt; x++) {
                var addConfig = { column: x, row: y };
                var child = createCellContainerCallback(scene, x, y, addConfig);
                if (child) {
                    this.add(child, addConfig);
                }
            }
        }
    }

    return this;
}

export default ResetGrid;