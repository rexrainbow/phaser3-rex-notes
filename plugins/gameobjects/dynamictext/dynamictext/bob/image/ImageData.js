import Base from '../Base.js';
import { ImageTypeName } from '../Types.js';

class ImageData extends Base {
    constructor(
        parent,
        key, frame
    ) {
        super(parent, ImageTypeName);
        this.setTexture(key, frame);
    }

    get frameWidth() {
        return (this.frameObj) ? this.frameObj.cutWidth : 0;
    }

    get frameHeight() {
        return (this.frameObj) ? this.frameObj.cutHeight : 0;
    }

    get offsetY() {
        return -this.height;
    }

    set offsetY(value) { }

    setTexture(key, frame) {
        this.key = key;
        this.frame = frame;

        this.frameObj = this.scene.textures.getFrame(key, frame);
        return this;
    }

    get width() {
        return this.frameWidth * this.scaleX;
    }

    set width(value) {
        this.setDirty(this.width !== value);
        this.scaleX = value / this.frameWidth;
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

    drawContent() {
        var context = this.context;
        var frame = this.frameObj;

        context.drawImage(
            frame.source.image,              // image
            frame.cutX, frame.cutY,          // sx, sy
            frame.cutWidth, frame.cutHeight, // sWidth, sHeight
        );
    }

    draw() {
        if (!this.visible) {
            return this;
        }

        super.draw();
    }

}

export default ImageData;