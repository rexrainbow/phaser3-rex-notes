import Base from '../Base';
import Methods from './Methods';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const DegToRad = PhaserMath.DegToRad;
const RadToDeg = PhaserMath.RadToDeg;
const GetValue = PhaserUtils.Objects.GetValue;

class RenderBase extends Base {
    _alpha: any;
    _leftSpace: any;
    _rightSpace: any;
    _rotation: any;
    _scaleX: any;
    _scaleY: any;
    _visible: any;
    _x: any;
    _y: any;
    align: any;
    drawAboveCallback: any;
    drawBelowCallback: any;
    offsetX: any;
    offsetY: any;
    originX: any;
    parent: any;
    renderable: any;
    scrollFactorX: any;
    scrollFactorY: any;
    setDirty: any;
    toLocalPosition: any;
    x0: any;
    y0: any;

    constructor(parent?: any, type?: any) {
        super(parent, type);

        this.renderable = true;
        this.scrollFactorX = 1;
        this.scrollFactorY = 1;
        this.toLocalPosition = true;
        this.originX = 0;
        this.offsetX = 0;  // Override
        this.offsetY = 0;  // Override
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this.setDirty(this._visible != value);
        this._visible = value;
    }

    setVisible(visible?: any) {
        if (visible === undefined) {
            visible = true;
        }

        this.visible = visible;
        return this;
    }

    get alpha() { return this._alpha; }

    set alpha(value) {
        this.setDirty(this._alpha != value);
        this._alpha = value;
    }

    setAlpha(alpha?: any) {
        this.alpha = alpha;
        return this;
    }

    get x() { return this._x; }

    set x(value) {
        this.setDirty(this._x != value);
        this._x = value;
    }

    setX(x?: any) {
        this.x = x;
        return this;
    }

    get y() { return this._y; }

    set y(value) {
        this.setDirty(this._y != value);
        this._y = value;
    }

    setY(y?: any) {
        this.y = y;
        return this;
    }

    setPosition(x?: any, y?: any) {
        this.x = x;
        this.y = y;
        return this;
    }

    setInitialPosition(x?: any, y?: any) {
        this.x0 = x;
        this.y0 = y;
        return this;
    }

    setScrollFactorX(x?: any) {
        this.scrollFactorX = x;
        return this;
    }

    setScrollFactorY(y?: any) {
        this.scrollFactorY = y;
        return this;
    }

    setScrollFactor(x?: any, y?: any) {
        if (y === undefined) {
            y = x;
        }
        this.scrollFactorX = x;
        this.scrollFactorY = y;
        return this;
    }

    get rotation() { return this._rotation; }

    set rotation(value) {
        this.setDirty(this._rotation != value);
        this._rotation = value;
    }

    setRotation(rotation?: any) {
        this.rotation = rotation;
        return this;
    }

    get angle() { return RadToDeg(this._rotation); }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(angle?: any) {
        this.angle = angle;
        return this;
    }

    get scaleX() { return this._scaleX; }

    set scaleX(value) {
        this.setDirty(this._scaleX !== value);
        this._scaleX = value;
    }

    setScaleX(scaleX?: any) {
        this.scaleX = scaleX;
        return this;
    }

    // Override
    get width() { return 0; }

    // Override
    set width(value) { }

    setWidth(width?: any, keepAspectRatio?: any) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.width = width;

        if (keepAspectRatio?: any) {
            this.scaleY = this.scaleX;
        }
        return this;
    }

    get leftSpace() { return this._leftSpace; }

    set leftSpace(value) {
        this.setDirty(this._leftSpace !== value);
        this._leftSpace = value;
    }

    setLeftSpace(value?: any) {
        this.leftSpace = value;
        return this;
    }

    get rightSpace() { return this._rightSpace; }

    set rightSpace(value) {
        this.setDirty(this._rightSpace !== value);
        this._rightSpace = value;
    }

    setRightSpace(value?: any) {
        this.rightSpace = value;
        return this;
    }

    get outerWidth() {
        return this.width + this.leftSpace + this.rightSpace;
    }

    get scaleY() { return this._scaleY; }

    set scaleY(value) {
        this.setDirty(this._scaleY !== value);
        this._scaleY = value;
    }

    setScaleY(scaleY?: any) {
        this.scaleY = scaleY;
        return this;
    }

    // Override
    get height() { return 0; }

    // Override
    set height(value) { }

    setHeight(height?: any, keepAspectRatio?: any) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.height = height;

        if (keepAspectRatio?: any) {
            this.scaleX = this.scaleY;
        }
        return this;
    }

    setScale(scaleX?: any, scaleY?: any) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    setOrigin(x?: any) {
        this.originX = x;
        return this;
    }

    setAlign(align?: any) {
        this.align = align;
        return this;
    }

    modifyPorperties(o?: any) {
        if (!o) {
            return this;
        }

        if (o.hasOwnProperty('x')) {
            this.setX(o.x);
        }
        if (o.hasOwnProperty('y')) {
            this.setY(o.y);
        }

        if (o.hasOwnProperty('rotation')) {
            this.setRotation(o.rotation);
        } else if (o.hasOwnProperty('angle')) {
            this.setAngle(o.angle);
        }

        if (o.hasOwnProperty('alpha')) {
            this.setAlpha(o.alpha);
        }

        // ScaleX, ScaleY
        var width = GetValue(o, 'width', undefined);
        var height = GetValue(o, 'height', undefined);
        var scaleX = GetValue(o, 'scaleX', undefined);
        var scaleY = GetValue(o, 'scaleY', undefined);

        if (width !== undefined) {
            if ((height === undefined) && (scaleY === undefined)) {
                this.setWidth(width, true);
            } else {
                this.setWidth(width);
            }
        } else if (scaleX !== undefined) {
            this.setScaleX(scaleX);
        }
        if (height !== undefined) {
            if ((width === undefined) && (scaleX === undefined)) {
                this.setHeight(height, true);
            } else {
                this.setHeight(height);
            }
        } else if (scaleY !== undefined) {
            this.setScaleY(scaleY);
        }

        if (o.hasOwnProperty('leftSpace')) {
            this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
            this.setRightSpace(o.rightSpace);
        }

        if (o.hasOwnProperty('align')) {
            this.setAlign(o.align);
        }

        return this;
    }

    setDrawBelowCallback(callback?: any) {
        this.drawBelowCallback = callback;
        return this;
    }

    setDrawAboveCallback(callback?: any) {
        this.drawAboveCallback = callback;
        return this;
    }

    reset() {
        this
            .setVisible()
            .setAlpha(1)
            .setPosition(0, 0)
            .setRotation(0)
            .setScale(1, 1)
            .setLeftSpace(0).setRightSpace(0)
            .setOrigin(0)
            .setAlign()
            .setDrawBelowCallback()
            .setDrawAboveCallback()
        return this;
    }

    // Override
    get willRender() {
        return this.visible && (this.alpha > 0);
    }

    get drawX() {
        var x = this.x + this.leftSpace + this.offsetX - (this.originX * this.width);
        return (this.parent._textOX * this.scrollFactorX) + x;
    }
    get drawY() {
        var y = this.y + this.offsetY;
        return (this.parent._textOY * this.scrollFactorY) + y;
    }

    // Override
    get drawTLX() { return 0; }
    get drawTLY() { return 0; }
    get drawBLX() { return 0; }
    get drawBLY() { return 0; }
    get drawTRX() { return 0; }
    get drawTRY() { return 0; }
    get drawBRX() { return 0; }
    get drawBRY() { return 0; }

    get drawCenterX() {
        return (this.drawTRX + this.drawTLX) / 2;
    }
    get drawCenterY() {
        return (this.drawBLY + this.drawTLY) / 2;
    }
}

Object.assign(
    RenderBase.prototype,
    Methods,
)

export default RenderBase;