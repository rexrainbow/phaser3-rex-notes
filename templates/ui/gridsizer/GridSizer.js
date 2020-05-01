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
        this.initialGrid(columnCount, rowCount, columnProportions, rowProportions);

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.gridChildren.length = 0;
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

    initialGrid(columnCount, rowCount, columnProportions, rowProportions) {
        this.columnCount = columnCount;
        this.rowCount = rowCount;
        this.gridChildren = [];
        this.gridChildren.length = columnCount * rowCount;
        ArrayFill(this.gridChildren, null);
        this.columnProportions = [];
        this.columnProportions.length = columnCount;
        this.columnWidth = [];
        this.columnWidth.length = columnCount;
        this.rowProportions = [];
        this.rowProportions.length = rowCount;
        this.rowHeight = [];
        this.rowHeight.length = rowCount;

        if (typeof (columnProportions) === 'number') {
            ArrayFill(this.columnProportions, columnProportions);
        } else {
            for (var i = 0; i < columnCount; i++) {
                this.columnProportions[i] = columnProportions[i] || 0;
            }
        }
        if (typeof (rowProportions) === 'number') {
            ArrayFill(this.rowProportions, rowProportions);
        } else {
            for (var i = 0; i < rowCount; i++) {
                this.rowProportions[i] = rowProportions[i] || 0;
            }
        }

        return this;
    }

    getChildAt(columnIndex, rowIndex) {
        return this.gridChildren[(rowIndex * this.columnCount) + columnIndex];
    }
}

Object.assign(
    GridSizer.prototype,
    Methods
);

export default GridSizer;