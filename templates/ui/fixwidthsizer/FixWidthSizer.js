import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';
import GetMaxChildWidth from './GetMaxChildWidth.js';
import GetMaxChildHeight from './GetMaxChildHeight.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

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

        this.type = 'rexFixWidthSizer';
        this.sizerChildren = [];
        this.setOrientation(orientation);
        this.setPadding(space);
        this.setItemSpacing(GetValue(space, 'item', 0));
        this.setLineSpacing(GetValue(space, 'line', 0));

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

Object.assign(
    FixWidthSizer.prototype,
    Methods
);

export default FixWidthSizer;