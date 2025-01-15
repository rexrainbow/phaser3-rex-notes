import Mesh from '../../mesh/sprite/Sprite.js';
import InitFaces from './methods/InitFaces.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Image extends Mesh {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexQuadImage';
        this.isNinePointMode = GetValue(config, 'ninePointMode', false);
        this.fourPointsModeRTL = GetValue(config, 'rtl', false);

        InitFaces(this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);
    }
}

export default Image;