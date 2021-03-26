import StyleMethods from './StyleMethods.js';
import DataMethods from './DataMethods.js';

class BaseShape {
    constructor() {
        this.name = undefined;
        this.dirty = true;
        this.data = undefined;

        this.isFilled = false;
        this.fillColor = undefined;
        this.fillAlpha = 1;

        this.isStroked = false;
        this.lineWidth = 1;
        this.strokeColor = undefined;
        this.strokeAlpha = 1;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    reset() {
        this.fillStyle();
        this.lineStyle();
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {

    }

    canvasRender(ctx, dx, dy) {

    }

    updateData() {

    }
}

Object.assign(
    BaseShape.prototype,
    StyleMethods,
    DataMethods
);


export default BaseShape;