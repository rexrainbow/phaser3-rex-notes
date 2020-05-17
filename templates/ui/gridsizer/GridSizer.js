import BaseSizer from '../basesizer/BaseSizer.js';
import ArrayFill from '../../../plugins/utils/array/Fill.js';
import Methods from './Methods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class GridSizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportions, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            columnCount = GetValue(config, 'column', 0);
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', 0);
            rowProportions = GetValue(config, 'rowProportions', 0);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            columnCount = GetValue(config, 'column', 0);
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', 0);
            rowProportions = GetValue(config, 'rowProportions', 0);
        } else if (IsPlainObject(columnCount)) {
            config = columnCount;
            columnCount = GetValue(config, 'column', 0);
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', 0);
            rowProportions = GetValue(config, 'rowProportions', 0);
        } else if (IsPlainObject(columnProportions)) {
            config = columnProportions;
            columnProportions = GetValue(config, 'columnProportions', 0);
            rowProportions = GetValue(config, 'rowProportions', 0);
        }
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexGridSizer';
        this.setupGrid(columnCount, rowCount, columnProportions, rowProportions, config);

        this.addChildrenMap('items', this.sizerChildren);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.sizerChildren.length = 0;
        super.destroy(fromScene);
    }

    setColumnProportion(columnIndex, proportion) {
        if (columnIndex >= this.columnProportions.length) {
            return this;
        }
        this.columnProportions[columnIndex] = proportion;
        return this;
    }

    setRowProportion(rowIndex, proportion) {
        if (rowIndex >= this.rowProportions.length) {
            return this;
        }
        this.rowProportions[rowIndex] = proportion;
        return this;
    }

    get totalColumnProportions() {
        var result = 0,
            proportion;
        for (var i = 0; i < this.columnCount; i++) {
            proportion = this.columnProportions[i];
            if (proportion > 0) {
                result += proportion;
            }
        }
        return result;
    }

    get totalRowProportions() {
        var result = 0,
            proportion;
        for (var i = 0; i < this.rowCount; i++) {
            proportion = this.rowProportions[i];
            if (proportion > 0) {
                result += proportion;
            }
        }
        return result;
    }

    setupGrid(columnCount, rowCount, columnProportions, rowProportions, config) {
        if (columnProportions === undefined) {
            columnProportions = 0;
        }
        if (rowProportions === undefined) {
            rowProportions = 0;
        }

        this.columnCount = columnCount;
        this.rowCount = rowCount;

        // children
        this.sizerChildren = [];
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
        this.space.column = [];
        this.space.column.length = columnCount - 1;
        var columnSpace = GetValue(config, 'space.column', 0);
        if (typeof (columnSpace) === 'number') {
            ArrayFill(this.space.column, columnSpace);
        } else {
            for (var i = 0, cnt = this.space.column.length; i < cnt; i++) {
                this.space.column[i] = columnSpace[i] || 0;
            }
        }
        this.space.row = [];
        this.space.row.length = rowCount - 1;
        var rowSpace = GetValue(config, 'space.row', 0);
        if (typeof (rowSpace) === 'number') {
            ArrayFill(this.space.row, rowSpace);
        } else {
            for (var i = 0, cnt = this.space.row.length; i < cnt; i++) {
                this.space.row[i] = rowSpace[i] || 0;
            }
        }

        return this;
    }

    getChildAt(columnIndex, rowIndex) {
        return this.sizerChildren[(rowIndex * this.columnCount) + columnIndex];
    }

    childToGridIndex(child, out) {
        if (!child) {
            return null;
        }

        var index = this.sizerChildren.indexOf(child);
        if (index === -1) {
            return null;
        }

        if (out === undefined) {
            out = {};
        }
        out.x = index % this.columnCount;
        out.y = Math.floor(index / this.columnCount);
        return out;
    }
}

Object.assign(
    GridSizer.prototype,
    Methods
);

export default GridSizer;