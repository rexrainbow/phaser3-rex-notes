import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ALIGNMODE from '../utils/AlignConst.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

class GridSizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportions) {
        var config;
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            columnCount = GetValue(config, 'column', 0);
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', undefined);
            rowProportions = GetValue(config, 'rowProportions', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            columnCount = GetValue(config, 'column', 0);
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', undefined);
            rowProportions = GetValue(config, 'rowProportions', undefined);
        } else if (IsPlainObject(columnCount)) {
            config = columnCount;
            columnCount = GetValue(config, 'column', 0);
            rowCount = GetValue(config, 'row', 0);
            columnProportions = GetValue(config, 'columnProportions', undefined);
            rowProportions = GetValue(config, 'rowProportions', undefined);
        } else if (IsPlainObject(columnProportions)) {
            config = columnProportions;
            columnProportions = GetValue(config, 'columnProportions', undefined);
            rowProportions = GetValue(config, 'rowProportions', undefined);
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

    add(gameObject, columnIndex, rowIndex, align, paddingConfig, expand) {
        super.add(gameObject);
        if (IsPlainObject(columnIndex)) {
            var config = columnIndex;
            columnIndex = GetValue(config, 'column', 0);
            rowIndex = GetValue(config, 'row', 0);
            align = GetValue(config, 'align', ALIGN_CENTER);
            paddingConfig = GetValue(config, 'padding', 0);
            expand = GetValue(config, 'expand', false);
        }
        if (typeof (align) === 'string') {
            align = ALIGNMODE[align];
        }
        if (align === undefined) {
            align = ALIGN_CENTER;
        }
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }
        if (expand === undefined) {
            expand = true;
        }

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.align = align;
        config.padding = GetBoundsConfig(paddingConfig);
        config.expand = expand;
        this.gridChildren[(rowIndex * this.columnCount) + columnIndex] = gameObject;
        return this;
    }

    remove(gameObject) {
        var config = this.getSizerConfig(gameObject);
        if (config.parent !== this) {
            return this;
        }
        config.parent = undefined;
        RemoveItem(this.gridChildren, gameObject);

        if (this.backgroundChildren !== undefined) {
            RemoveItem(this.backgroundChildren, gameObject);
        }
        super.remove(gameObject);
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
        this.columnProportions = [];
        this.columnProportions.length = columnCount;
        this.columnWidth = [];
        this.columnWidth.length = columnCount;
        this.rowProportions = [];
        this.rowProportions.length = rowCount;
        this.rowHeight = [];
        this.rowHeight.length = rowCount;

        if (columnProportions) {
            var columnProportionsIsNumber = (typeof (columnProportions) === 'number');
            for (var i = 0; i < columnCount; i++) {
                if (columnProportionsIsNumber) {
                    this.setColumnProportion(i, columnProportions);
                } else {
                    var columnProportion = columnProportions[i];
                    if (columnProportion > 0) {
                        this.setColumnProportion(i, columnProportion);
                    }
                }
            }
        }
        if (rowProportions) {
            var rowProportionsIsNumber = (typeof (rowProportions) === 'number');
            for (var i = 0; i < rowCount; i++) {
                if (rowProportionsIsNumber) {
                    this.setRowProportion(i, rowProportions);
                } else {
                    var rowProportion = rowProportions[i];
                    if (rowProportion > 0) {
                        this.setRowProportion(i, rowProportion);
                    }
                }
            }
        }

        return this;
    }
}

Object.assign(
    GridSizer.prototype,
    Methods
);

export default GridSizer;