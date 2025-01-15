import Mesh from '../../mesh/sprite/Sprite.js';
import Methods from './methods/Methods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DefaultRingRadiusList = [1 / 27, 3 / 27, 9 / 27];

class ShatterImage extends Mesh {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexShatterImage';
        this.resetImage();

        this.shatterCenter = { x: null, y: null };

        this.setRingRadiusList(GetValue(config, 'ringRadiusList', DefaultRingRadiusList));
        this.setSamplesPerRing(GetValue(config, 'samplesPerRing', 12));
        this.setVariation(GetValue(config, 'variation', 0.25));
    }
}

Object.assign(
    ShatterImage.prototype,
    Methods,
)

export default ShatterImage;