import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetOrientationMode from '../utils/GetOrientationMode.js';
import GetMaxChildWidth from './GetMaxChildWidth.js';
import GetMaxChildHeight from './GetMaxChildHeight.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class FixWidthSizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, config) {
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
        }

        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexFixWidthSizer';
        this.sizerChildren = [];
        this.setOrientation(GetValue(config, 'orientation', 0));
        this.setItemSpacing(GetValue(config, 'space.item', 0));
        this.setLineSpacing(GetValue(config, 'space.line', 0));
        this.setAlign(GetValue(config, 'align', 0));
        this.setRTL(GetValue(config, 'rtl', false));

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

    setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
    }

    setItemSpacing(space) {
        this.space.item = space;
        return this;
    }

    setLineSpacing(space) {
        this.space.line = space;
        return this;
    }

    setAlign(align) {
        if (typeof (align) === 'string') {
            align = ALIGN[align];
        }
        this.align = align;
        return this;
    }

    setRTL(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.rtl = enabled;
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

const ALIGN = {
    left: 0, top: 0,
    right: 1, bottom: 1,
    center: 2,
    justify: 3,
    'justify-left': 3, 'justify-top': 3,
    'justify-right': 4, 'justify-bottom': 4,
    'justify-center': 5
}

Object.assign(
    FixWidthSizer.prototype,
    Methods
);

export default FixWidthSizer;