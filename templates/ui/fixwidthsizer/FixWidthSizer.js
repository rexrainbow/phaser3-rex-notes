import BaseSizer from '../basesizer/BaseSizer.js';
import ParsePaddingConfig from '../utils/ParsePaddingConfig.js'
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import Layout from './Layout.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';
import GetMaxChildWidth from './GetMaxChildWidth.js';
import GetMaxChildHeight from './GetMaxChildHeight.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

class FixWidthSizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, orientation, space) {
        var config;
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(orientation)) {
            config = orientation;
        } else if (IsPlainObject(space)) {
            config = space;
        }

        if (config !== undefined) {
            orientation = GetValue(config, 'orientation', 0);
            space = GetValue(config, 'space', config);
        }
        if (orientation === undefined) {
            orientation = 0;
        }
        if (space === undefined) {
            space = 0;
        }
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexSizer';
        this.sizerChildren = [];
        this.backgroundChildren = [];
        this.setOrientation(orientation);
        this.setPadding(space);
        this.setItemSpacing(GetValue(space, 'item', 0));
        this.setLineSpacing(GetValue(space, 'line', 0));
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.sizerChildren.length = 0;
        super.destroy(fromScene);
    }

    setOrientation(orientation) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    setPadding(paddingConfig) {
        this.padding = ParsePaddingConfig(paddingConfig);
        return this;
    }

    setItemSpacing(space) {
        this.itemSpacing = space;
        return this;
    }

    setLineSpacing(space) {
        this.lineSpacing = space;
        return this;
    }

    add(gameObject, paddingConfig) {
        super.add(gameObject);

        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.align = ALIGN_CENTER;
        config.padding = ParsePaddingConfig(paddingConfig);
        this.sizerChildren.push(gameObject);
        return this;
    }

    insert(index, gameObject, paddingConfig, expand) {
        this.add(gameObject, paddingConfig, expand);
        this.moveTo(gameObject, index);
        return this;
    }

    addBackground(gameObject, paddingConfig) {
        super.add(gameObject);
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.align = ALIGN_CENTER;
        config.padding = ParsePaddingConfig(paddingConfig);
        this.backgroundChildren.push(gameObject);
        return this;
    }

    remove(gameObject) {
        var config = this.getSizerConfig(gameObject);
        config.parent = undefined;
        RemoveItem(this.sizerChildren, gameObject);
        super.remove(gameObject);
        return this;
    }

    get maxChildWidth() {
        if (this._maxChildWidth === undefined) {
            this._maxChildWidth = GetMaxChildWidth.call(this);
        }
        return this._maxChildWidth;
    }

    get maxChildHeight() {
        if (this._maxChildHeight === undefined) {
            this._maxChildHeight = GetMaxChildHeight.call(this);
        }
        return this._maxChildHeight;
    }
}

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    layout: Layout,
}
Object.assign(
    FixWidthSizer.prototype,
    methods
);

export default FixWidthSizer;