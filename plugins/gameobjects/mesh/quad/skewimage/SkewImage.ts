import Image from '../image/Image';
import Skew from './Skew';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const DegToRad = PhaserMath.DegToRad;
const RadToDeg = PhaserMath.RadToDeg;

class SkewImage extends Image {
    _skewX: any;
    _skewY: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, key?: any, frame?: any) {
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexSkewmage';

        this._skewX = 0;
        this._skewY = 0;
    }

    get skewX() {
        return this._skewX;
    }

    set skewX(value) {
        this._skewX = value;
        Skew(this, this._skewX, this._skewY);
    }

    get skewXDeg() {
        return RadToDeg(this._skewX);
    }

    set skewXDeg(value) {
        this.skewX = DegToRad(value);
    }

    get skewY() {
        return this._skewY;
    }

    set skewY(value) {
        this._skewY = value;
        Skew(this, this._skewX, this._skewY)
    }

    get skewYDeg() {
        return RadToDeg(this._skewY);
    }

    set skewYDeg(value) {
        this.skewY = DegToRad(value);
    }

    setSkewX(skewX?: any) {
        this.skewX = skewX;
        return this;
    }

    setSkewY(skewY?: any) {
        this.skewY = skewY;
        return this;
    }

    setSkew(skewX?: any, skewY?: any) {
        if (skewY === undefined) {
            skewY = skewX;
        }
        this.skewX = skewX;
        this.skewY = skewY;
        return this;
    }

    setSkewXDeg(skewX?: any) {
        this.skewXDeg = skewX;
        return this;
    }

    setSkewYDeg(skewY?: any) {
        this.skewYDeg = skewY;
        return this;
    }

    setSkewDeg(skewX?: any, skewY?: any) {
        if (skewY === undefined) {
            skewY = skewX;
        }
        this.skewXDeg = skewX;
        this.skewYDeg = skewY;
        return this;
    }

}

export default SkewImage;