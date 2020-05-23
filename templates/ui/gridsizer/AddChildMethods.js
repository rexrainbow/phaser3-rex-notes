import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ALIGNMODE from '../utils/AlignConst.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;


var GetEmptyItemIndex = function (columnIndex, rowIndex, items, columnCount, rowCount) {
    if ((typeof (columnIndex) === 'number') || (typeof (rowIndex) === 'number')) {
        if (columnIndex === undefined) {
            var idx;
            for (var i = 0; i < columnCount; i++) {
                idx = (rowIndex * columnCount) + i;
                if (!items[idx]) {
                    return idx;
                }
            }
        } else if (rowIndex === undefined) {
            var idx;
            for (var i = 0; i < rowCount; i++) {
                idx = (i * columnCount) + columnIndex;
                if (!items[idx]) {
                    return idx;
                }
            }
        } else {
            var idx = (rowIndex * columnCount) + columnIndex;
            if (!items[idx]) {
                return idx;
            }
        }

    } else if (rowIndex === true) {
        var idx;
        for (var i = 0; i < columnCount; i++) {
            for (var j = 0; j < rowCount; j++) {
                idx = (j * columnCount) + i;
                if (!items[idx]) {
                    return idx;
                }
            }
        }
    } else {
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            if (!items[i]) {
                return i;
            }
        }
    }
    return null;
}
export default {
    add(gameObject, columnIndex, rowIndex, align, paddingConfig, expand, childKey) {
        this.pin(gameObject);
        if (IsPlainObject(columnIndex)) {
            var config = columnIndex;
            columnIndex = GetValue(config, 'column', undefined);
            rowIndex = GetValue(config, 'row', undefined);
            align = GetValue(config, 'align', ALIGN_CENTER);
            paddingConfig = GetValue(config, 'padding', 0);
            expand = GetValue(config, 'expand', false);
            childKey = GetValue(config, 'key', undefined);
        }

        // Get insert index
        var itemIndex = GetEmptyItemIndex(columnIndex, rowIndex, this.sizerChildren, this.columnCount, this.rowCount);
        if (itemIndex === null) {
            return this;
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
        config.align = align;
        config.padding = GetBoundsConfig(paddingConfig);
        config.expand = expand;
        this.sizerChildren[itemIndex] = gameObject;

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject)
        }
        return this;
    }
}