import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';
import GetMaxChildWidth from './GetMaxChildWidth.js';
import GetMaxChildHeight from './GetMaxChildHeight.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class FixWidthSizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, orientation, space, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            orientation = GetValue(config, 'orientation', 0);
            space = GetValue(config, 'space', config);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            orientation = GetValue(config, 'orientation', 0);
            space = GetValue(config, 'space', config);
        } else if (IsPlainObject(orientation)) {
            config = orientation;
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

        this.type = 'rexFixWidthSizer';
        this.sizerChildren = [];
        this.setOrientation(orientation);
        this.setPadding(space);
        this.setItemSpacing(GetValue(space, 'item', 0));
        this.setLineSpacing(GetValue(space, 'line', 0));
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
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    setPadding(paddingConfig) {
        this.padding = GetBoundsConfig(paddingConfig, this.padding);
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