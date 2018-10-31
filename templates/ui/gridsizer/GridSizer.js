import ContainerLite from 'rexPlugins/gameobjects/containerlite/ContainerLite.js';
import Layout from './Layout.js';

const Container = ContainerLite;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

class GridSizer extends Container {
    constructor(scene, x, y, columnCount, rowCount) {
        var config;
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            columnCount = GetValue(config, 'column', 0);
            rowCount = GetValue(config, 'row', 0);
        }
        super(scene, x, y, 2, 2);
        this.type = 'rexGridSizer';
        this.isRexSizer = true;

        this.columnCount = columnCount;
        this.rowCount = rowCount;
        this.sizerChildren = [];
        this.sizerChildren.length = columnCount * rowCount;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.sizerChildren.length = 0;
        super.destroy(fromScene);
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
            expand = false;
        }

        var padding = {};
        if (typeof (paddingConfig) === 'number') {
            padding.left = paddingConfig;
            padding.right = paddingConfig;
            padding.top = paddingConfig;
            padding.bottom = paddingConfig;
        } else {
            padding.left = GetValue(paddingConfig, 'left', 0);
            padding.right = GetValue(paddingConfig, 'right', 0);
            padding.top = GetValue(paddingConfig, 'top', 0);
            padding.bottom = GetValue(paddingConfig, 'bottom', 0);
        }

        var config = this.getSizerConfig(gameObject);
        config.proportion = 0;
        config.align = align;
        config.padding = padding;
        config.expand = expand;
        this.sizerChildren[(columnIndex * this.columnCount) + rowIndex] = gameObject;
        return this;
    }

    remove(gameObject) {
        RemoveItem(this.sizerChildren, gameObject);
        super.remove(gameObject);
        return this;
    }

    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth
    }

    get childrenHeight() {
        if (this._childrenHeight === undefined) {
            this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
    }
}
var methods = {
    layout: Layout,
}
Object.assign(
    GridSizer.prototype,
    methods
);

export default GridSizer;