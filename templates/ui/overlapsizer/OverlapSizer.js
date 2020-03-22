import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import Clear from '../../../plugins/utils/object/Clear.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class OverlapSizer extends BaseSizer {
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

        this.type = 'rexOverlapSizer';
        this.sizerChildren = {};
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        Clear(this.sizerChildren);
        super.destroy(fromScene);
    }
}

Object.assign(
    OverlapSizer.prototype,
    Methods
);

export default OverlapSizer;