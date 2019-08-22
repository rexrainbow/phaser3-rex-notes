import Rotate3d from './Rotate3d.js';

const Quad = Phaser.GameObjects.Quad;
const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class PerspectiveQuad extends Quad {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', undefined);
            y = GetValue(config, 'x', undefined);
            key = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);
        } else if (IsPlainObject(key)) {
            config = key;
            key = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);
        } else {

        }

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }

        super(scene, x, y, key, frame);

        this.type = 'rexPerspectiveQuad';
        this._angleX = 0;
        this._angleY = 0;
        this._angleZ = 0;
    }

    get angleX() {
        return this._angleX;
    }

    set angleX(rad) {
        this._angleX = rad;
        this.rotateX(rad);
    }

    rotateX(rad) {
        this.rotate3d(1, 0, 0, rad);
        return this;
    }

    get angleY() {
        return this._angleY;
    }

    set angleY(rad) {
        this._angleY = rad;
        this.rotateY(rad);
    }

    rotateY(rad) {
        this.rotate3d(0, 1, 0, rad);
        return this;
    }

    get angleZ() {
        return this._angleZ;
    }

    set angleZ(rad) {
        this._angleZ = rad;
        this.rotateZ(rad);
    }

    rotateZ(rad) {
        this.rotate3d(0, 0, 1, rad);
        return this;
    }

    rotate(rad) {
        this.rotateZ(rad);
        return this;
    }
}

var methods = {
    rotate3d: Rotate3d,
}

Object.assign(
    PerspectiveQuad.prototype,
    methods
);

export default PerspectiveQuad;