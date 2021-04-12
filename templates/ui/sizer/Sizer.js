import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetChildrenProportion from './GetChildrenProportion.js';
import GetOrientationMode from '../utils/GetOrientationMode.js';

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
        this.setItemSpacing(GetValue(config, 'space.item', 0));

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

    get childrenProportion() {
        if (this._childrenProportion === undefined) {
            this._childrenProportion = GetChildrenProportion.call(this);
        }
        return this._childrenProportion;
    }
}

Object.assign(
    Sizer.prototype,
    Methods
);

export default Sizer;