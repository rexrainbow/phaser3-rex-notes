import Mesh from '../../mesh/sprite/Sprite.js';
import Methods from './methods/Methods.js';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

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