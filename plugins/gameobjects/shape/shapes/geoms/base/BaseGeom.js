import StyleMethods from './StyleMethods.js';
import DataMethods from '../../../../../utils/data/DataMethods.js';

class BaseGeom {
    constructor() {
        this.name = undefined;
        this.dirty = true;
        this.visible = true;
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

    setVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }
        this.visible = visible;
        return this;
    }

    reset() {
        this
            .setVisible()
            .fillStyle()
            .lineStyle();

        return this;
    }

    webglRender(drawingContext, submitter, gameObject, calcMatrix, alpha, dx, dy) {

    }

    canvasRender(ctx, dx, dy) {

    }

    updateData() {
        this.dirty = false;
    }
}

Object.assign(
    BaseGeom.prototype,
    StyleMethods,
    DataMethods
);


export default BaseGeom;