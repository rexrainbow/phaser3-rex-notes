import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Sizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, orientation, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            orientation = GetValue(config, 'orientation', 0);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            orientation = GetValue(config, 'orientation', 0);
        } else if (IsPlainObject(orientation)) {
            config = orientation;
            orientation = GetValue(config, 'orientation', 0);
        }

        if (orientation === undefined) {
            orientation = 0;
        }
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexSizer';
        this.sizerChildren = [];
        this.setOrientation(orientation);
        this.space = GetBoundsConfig(GetValue(config, 'space', 0));
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

    get childrenProportion() {
        if (this._childrenProportion === undefined) {
            this._childrenProportion = this.getChildrenProportion();
        }
        return this._childrenProportion;
    }

    get innerLeft() {
        return this.left + this.space.left;
    }

    get innerRight() {
        return this.right - this.space.right;
    }

    get innerTop() {
        return this.top + this.space.top;
    }

    get innerBottom() {
        return this.bottom - this.space.bottom;
    }

    get innerWidth() {
        return this.width - this.space.left - this.space.right;
    }

    get innerHeight() {
        return this.height - this.space.top - this.space.bottom;
    }
}

Object.assign(
    Sizer.prototype,
    Methods
);

export default Sizer;