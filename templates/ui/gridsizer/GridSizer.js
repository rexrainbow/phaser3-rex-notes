import BaseSizer from '../basesizer/BaseSizer.js';
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
        this.resetGrid(
            columnCount, rowCount,
            columnProportions, rowProportions,
            GetValue(config, 'space', undefined)
        );

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