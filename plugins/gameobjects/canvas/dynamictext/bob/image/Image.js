import Base from '../Base.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Image extends Base {
    constructor(
        parent,
        key, frame,
        style
    ) {
        super(parent, 'frame');
        this._scaleX = 1;
        this._scaleY = 1;
        this.setTexture(key, frame);
        this.setStyle(style);
    }

    get scene() {
        return this.parent.scene;
    }

    get frameWidth() {
        return (this.frameObj) ? this.frameObj.cutWidth : 0;
    }

    get frameHeight() {
        return (this.frameObj) ? this.frameObj.cutHeight : 0;
    }

    setStyle(style) {
        // Initialize
        this._scaleX = 1;
        this._scaleY = 1;

        var width = GetValue(style, 'width', undefined);
        var height = GetValue(style, 'height', undefined);
        var scaleX = GetValue(style, 'scaleX', undefined);
        var scaleY = GetValue(style, 'scaleY', undefined);

        if (width !== undefined) {
            if ((height === undefined) && (scaleY === undefined)) {
                this.setWidth(width, true);
            } else {
                this.setWidth(width);
            }
        }
        if (height !== undefined) {
            if ((width === undefined) && (scaleX === undefined)) {
                this.setHeight(height, true);
            } else {
                this.setHeight(height);
            }
        }
        if ((scaleX !== undefined) && (width === undefined)) {
            this.setScaleX(scaleX);
        }
        if ((scaleY !== undefined) && (height === undefined)) {
            this.setScaleY(scaleY);
        }

        return this;
    }

    setTexture(key, frame) {
        this.key = key;
        this.frame = frame;

        this.frameObj = this.scene.textures.getFrame(key, frame);
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

    get width() {
        return this.frameWidth * this.scaleX;
    }

    set width(value) {
        this.setDirty(this.width !== value);
        this.scaleX = value / this.frameWidth;
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
        this.setDirty(this._scaleY !== value);
        this._scaleY = value;
    }

    setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
    }

    get height() {
        return this.frameHeight * this.scaleY;
    }

    set height(value) {
        this.setDirty(this.height !== value);
        this.scaleY = value / this.frameHeight;
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


    draw() {
        if (!this.visible) {
            return this;
        }

        var frame = this.frameObj;
        var width = this.width,
            height = this.height;

        var context = this.context;
        context.save();

        var x = this.x,
            y = this.y - height;
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        context.translate(x, y);
        context.rotate(this.rotation);

        context.drawImage(
            frame.source.image,              // image
            frame.cutX, frame.cutY,          // sx, sy
            frame.cutWidth, frame.cutHeight, // sWidth, sHeight
            0, 0,                            // dx, dy
            width, height                    // dWidth, dHeight
        );

        context.restore();
    }

}

export default Image