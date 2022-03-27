import Base from './Base.js';

const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const GetValue = Phaser.Utils.Objects.GetValue;

class RenderBase extends Base {
    constructor(parent, type) {
        super(parent, type);

        this.offsetX = 0;  // Override
        this.offsetY = 0;  // Override
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this.setDisplayListDirty(this._visible != value);
        this._visible = value;
    }

    setVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }

        this.visible = visible;
        return this;
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this.setDisplayListDirty(!!this._alpha !== !!value);
        this._alpha = value;
    }

    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        this._rotation = value;
    }

    setRotation(rotation) {
        this.rotation = rotation;
        return this;
    }

    get angle() {
        return RadToDeg(this._rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(angle) {
        this.angle = angle;
        return this;
    }

    get scaleX() {
        return this._scaleX;
    }

    set scaleX(value) {
        this._scaleX = value;
    }

    setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        this._displayOriginX = value * this.originX;
    }

    setWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.width = width;

        if (keepAspectRatio) {
            this.scaleY = this.scaleX;
        }
        return this;
    }

    get scaleY() {
        return this._scaleY;
    }

    set scaleY(value) {
        this._scaleY = value;
    }

    setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
    }

    setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    // Override
    get height() {
        return this._height;
    }

    // Override
    set height(value) {
        this._height = value;
        this._displayOriginY = value * this.originY;
    }

    setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.height = height;

        if (keepAspectRatio) {
            this.scaleX = this.scaleY;
        }
        return this;
    }

    setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    modifyPorperties(o) {
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
        var scale = GetValue(o, 'scale', undefined);
        var scaleX = GetValue(o, 'scaleX', scale);
        var scaleY = GetValue(o, 'scaleY', scale);

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

        var origin = GetValue(o, 'origin', undefined);
        if (origin !== undefined) {
            this.setOrigin(origin);
        } else {
            if (o.hasOwnProperty('originX')) {
                this.setOriginX(o.originX);
            }
            if (o.hasOwnProperty('originY')) {
                this.setOriginY(o.originY);
            }
        }
        return this;
    }

    setOriginX(originX) {
        this.originX = originX;
        this._displayOriginX = this.width * originX;
        return this;
    }

    setOriginY(originY) {
        this.originY = originY;
        this._displayOriginY = this.height * originY;
        return this;
    }

    setOrigin(originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }
        this.setOriginX(originX).setOriginY(originY);
        return this;
    }

    reset() {
        this
            .setVisible()
            .setAlpha(1)
            .setPosition(0, 0)
            .setRotation(0)
            .setScale(1, 1)
            .setOrigin(0)

        return this;
    }

    // Override
    webglRender(pipeline, calcMatrix, alpha, dx, dy, textureUnit, roundPixels) {
    }
    // Override
    canvasRender(ctx, dx, dy) {
    }
}

export default RenderBase;