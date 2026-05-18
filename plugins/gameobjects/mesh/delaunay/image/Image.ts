import Mesh from '../../mesh/sprite/Sprite';
import Methods from './methods/Methods';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class ShatterImage extends Mesh {
    resetImage: any;
    setTriangleCount: any;
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
        this.type = 'rexDelaunayImage';
        this.resetImage();

        this.setTriangleCount(GetValue(config, 'triangleCount', 8));

    }
}

Object.assign(
    ShatterImage.prototype,
    Methods,
)

export default ShatterImage;