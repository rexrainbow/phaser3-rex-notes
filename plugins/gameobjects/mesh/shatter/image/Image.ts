import Mesh from '../../mesh/sprite/Sprite';
import Methods from './methods/Methods';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const DefaultRingRadiusList = [1 / 27, 3 / 27, 9 / 27];

class ShatterImage extends Mesh {
    resetImage: any;
    setRingRadiusList: any;
    setSamplesPerRing: any;
    setVariation: any;
    shatterCenter: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, key?: any, frame?: any, config?: any) {
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