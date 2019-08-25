import Canvas from '../canvas/Canvas.js';
import CircleMask from './CircleMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CircleMaskImage extends Canvas {
    constructor(scene, x, y, key, frame, config) {
        super(scene, x, y);

        this.type = 'rexCircleMaskImage';
        this.maskType = GetValue(config, 'maskType', 0);
        this.loadTexture(key, frame, this.maskType);
    }

    loadTexture(key, frame, maskType) {
        if (maskType === undefined) {
            maskType = 0;
        }

        this._textureKey = key;
        this._frameName = frame;
        this.maskType = maskType;

        super.loadTexture(key, frame);
        if (maskType !== null) {
            CircleMask(this.canvas, maskType);
        }
        this.dirty = true;
        return this;
    }
}

export default CircleMaskImage;