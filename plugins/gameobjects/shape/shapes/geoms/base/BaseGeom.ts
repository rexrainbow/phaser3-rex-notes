import StyleMethods from './StyleMethods';
import DataMethods from '../../../../../utils/data/DataMethods';

class BaseGeom {
    visible: any;

    data: any;
    dirty: any;
    fillAlpha: any;
    fillColor: any;
    isFilled: any;
    isStroked: any;
    lineWidth: any;
    name: any;
    strokeAlpha: any;
    strokeColor: any;

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

    setName(name?: any) {
        this.name = name;
        return this;
    }

    setVisible(visible?: any) {
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

    webglRender(drawingContext?: any, submitter?: any, gameObject?: any, calcMatrix?: any, alpha?: any, dx?: any, dy?: any) {

    }

    canvasRender(ctx?: any, dx?: any, dy?: any) {

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