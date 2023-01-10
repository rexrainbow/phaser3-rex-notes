import BaseSizer from '../basesizer/BaseSizer.js';

class ExpandGridSizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, columnCount, rowCount, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            columnCount = GetValue(config, 'column', (config.col || 0));
            rowCount = GetValue(config, 'row', 0);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            columnCount = GetValue(config, 'column', (config.col || 0));
            rowCount = GetValue(config, 'row', 0);
        } else if (IsPlainObject(columnCount)) {
            config = columnCount;
            columnCount = GetValue(config, 'column', (config.col || 0));
            rowCount = GetValue(config, 'row', 0);
        }
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexExpandGridSizer';

        this.resetGrid(columnCount, rowCount);

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        super.destroy(fromScene);

        // More free resources
        this.columnWidth = undefined;
        this.rowHeight = undefined;
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
    ExpandGridSizer.prototype,
    Methods
);

export default ExpandGridSizer;