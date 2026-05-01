import BaseGeom from '../base/BaseGeom.js';
import FillPathWebGL from '../../../utils/render/FillPathWebGL.js';
import StrokePathWebGL from '../../../utils/render/StrokePathWebGL.js';
import FillPathCanvas from '../../../utils/render/FillPathCanvas.js';
import StrokePathCanvas from '../../../utils/render/StrokePathCanvas.js';
import StrokePathMethods from '../../../utils/strokepath/StrokePathMethods.js';

import { Geom as PhaserGeom } from 'phaser';
const Earcut = PhaserGeom.Polygon.Earcut;

class PathBase extends BaseGeom {
    constructor() {
        super();

        this.pathData = [];

        this.isDashed = false;
        this.strokePathData = undefined;
        this.strokePathMask = undefined;
        this.dashPattern = undefined;
        this.dashOffset = 0;

        this.pathIndexes = [];
        this.closePath = false;
    }

    updateData() {
        this.pathIndexes = Earcut(this.pathData);

        super.updateData();

        this.buildStrokePath();
        return this;
    }

    webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
        if (this.isFilled) {
            FillPathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }

        if (this.isStroked) {
            StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
            FillPathCanvas(ctx, this, dx, dy);
        }

        if (this.isStroked) {
            StrokePathCanvas(ctx, this, dx, dy);
        }
    }
}

Object.assign(
    PathBase.prototype,
    StrokePathMethods,
)

export default PathBase;
