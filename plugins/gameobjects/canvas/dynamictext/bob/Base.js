const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

class Base {
    constructor(parent, type) {
        this.setParent(parent);
        this.type = type;

        this
            .setActive()
            .setVisible()
            .setPosition(0, 0)
            .setRotation(0)
            .setDrawBelowCallback()
            .setDrawAboveCallback()

        this.xOffset = 0;
        this.yOffset = 0;
        this.width = 0;
        this.height = 0;
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    get canvas() {
        return (this.parent) ? this.parent.canvas : null;
    }

    get context() {
        return (this.parent) ? this.parent.context : null;
    }

    setDirty(dirty) {
        if (dirty && this.parent) {
            this.parent.dirty = true;
        }
        return this;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this.setDirty(this._active != value);
        this._active = value;
    }

    setActive(active) {
        if (active === undefined) {
            active = true;
        }
        this.active = active;
        return this;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this.setDirty(this._visible != value);
        this._visible = value;
    }

    setVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }

        this.visible = visible;
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this.setDirty(this._x != value);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.setDirty(this._y != value);
        this._y = value;
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
        this.setDirty(this._rotation != value);
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
        this.setDirty(this._scaleX !== value);
        this._scaleX = value;
    }

    setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
    }

    get scaleY() {
        return this._scaleY;
    }

    set scaleY(value) {
        this.setDirty(this._scaleY !== value);
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

    setDrawBelowCallback(callback) {
        this.drawBelowCallback = callback;
        return this;
    }

    setDrawAboveCallback(callback) {
        this.drawAboveCallback = callback;
        return this;
    }

    // Override
    onFree() {
        this
            .setParent()
            .setPosition(0, 0)
            .setRotation(0)
            .setScale(1, 1)
            .setDrawBelowCallback()
            .setDrawAboveCallback()
    }

    // Override
    drawContent() {

    }

    // Override
    draw() {
        var context = this.context;
        context.save();

        var x = this.x + this.xOffset,
            y = this.y + this.yOffset;
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        context.translate(x, y);
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotation);

        if (this.drawBelowCallback) {
            this.drawBelowCallback.call(this);
        }

        this.drawContent();

        if (this.drawAboveCallback) {
            this.drawAboveCallback.call(this);
        }

        context.restore();

    }
}

export default Base;