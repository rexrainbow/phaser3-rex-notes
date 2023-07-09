import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetTotalColumnProportions from './GetTotalColumnProportions.js';
import GetTotalRowProportions from './GetTotalRowProportions.js';

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
            columnCount = GetValue(config, 'column', (config.col || 0));
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', 0);
            rowProportions = GetValue(config, 'rowProportions', 0);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            columnCount = GetValue(config, 'column', (config.col || 0));
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', 0);
            rowProportions = GetValue(config, 'rowProportions', 0);
        } else if (IsPlainObject(columnCount)) {
            config = columnCount;
            columnCount = GetValue(config, 'column', (config.col || 0));
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
        this.sizerChildren = [];
        this.addChildrenMap('items', this.sizerChildren);
        this.setCreateCellContainerCallback(GetValue(config, 'createCellContainerCallback'));

        this.setIndentLeft(
            GetValue(config, 'space.indentLeftOdd', 0),
            GetValue(config, 'space.indentLeftEven', 0)
        );
        this.setIndentTop(
            GetValue(config, 'space.indentTopOdd', 0),
            GetValue(config, 'space.indentTopEven', 0)
        );

        this.resetGrid(
            columnCount, rowCount,
            columnProportions, rowProportions,
            GetValue(config, 'space', undefined)
        );

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        // More free resources
        this.columnProportions = undefined;
        this.rowProportions = undefined;
        this.columnWidth = undefined;
        this.rowHeight = undefined;
        this.createCellContainerCallback = undefined;
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
        if (this._totalColumnProportions === undefined) {
            this._totalColumnProportions = GetTotalColumnProportions.call(this);
        }
        return this._totalColumnProportions;
    }

    get totalRowProportions() {
        if (this._totalRowProportions === undefined) {
            this._totalRowProportions = GetTotalRowProportions.call(this);
        }
        return this._totalRowProportions;
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

    getColumnWidth(columnIndex) {
        var colProportion = this.columnProportions[columnIndex];
        var colWidth = (colProportion === 0) ? this.columnWidth[columnIndex] : (colProportion * this.proportionWidthLength);
        return colWidth;
    }

    getRowHeight(rowIndex) {
        var rowProportion = this.rowProportions[rowIndex];
        var rowHeight = (rowProportion === 0) ? this.rowHeight[rowIndex] : (rowProportion * this.proportionHeightLength);
        return rowHeight;
    }

    setCreateCellContainerCallback(callback) {
        this.createCellContainerCallback = callback;
        return this;
    }
}

Object.assign(
    GridSizer.prototype,
    Methods
);

export default GridSizer;