import RenderBase from '../renderbase/RenderBase.js';
import { RenderTypeName } from '../Types.js';

class Render extends RenderBase {
    constructor(parent, renderCallback, width, height) {
        super(parent, RenderTypeName);

        this.setRenderCallback(renderCallback);

        if (width === true) {
            // Render with canvas position
            this.toLocalPosition = false;
            this.setSize(0);
        } else {
            this.setSize(width, height);
        }
    }

    setRenderCallback(callback) {
        if (callback) {
            this.renderContent = callback.bind(this);
        } else {
            delete this.renderContent;
        }
        return this;
    }

    setSize(width, height) {
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = width;
        }

        this.canvasWidth = width;
        this.canvasHeight = height;

        return this;
    }

    onFree() {
        super.onFree();
        this
            .setRenderCallback()
    }

    get width() {
        return this.canvasWidth * this.scaleX;
    }

    set width(value) {
        this.setDirty(this.width !== value);
        this.scaleX = (this.canvasWidth > 0) ? value / this.canvasWidth : 1;
    }

    get height() {
        return this.canvasHeight * this.scaleY;
    }

    set height(value) {
        this.setDirty(this.height !== value);
        this.scaleY = (this.canvasHeight > 0) ? value / this.canvasHeight : 1;
    }

    get drawTLX() { return -this.leftSpace; }
    get drawTLY() { return 0; }
    get drawBLX() { return -this.leftSpace; }
    get drawBLY() { return this.canvasHeight; }
    get drawTRX() { return this.canvasWidth + this.rightSpace; }
    get drawTRY() { return 0; }
    get drawBRX() { return this.canvasWidth + this.rightSpace; }
    get drawBRY() { return this.canvasHeight; }

}

export default Render;