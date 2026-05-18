import BaseGeom from '../base/BaseGeom';
import FillPathWebGL from '../../../utils/render/FillPathWebGL';
import StrokePathWebGL from '../../../utils/render/StrokePathWebGL';
import FillPathCanvas from '../../../utils/render/FillPathCanvas';
import StrokePathCanvas from '../../../utils/render/StrokePathCanvas';
import StrokePathMethods from '../../../utils/strokepath/StrokePathMethods';

import { Geom as PhaserGeom } from 'phaser';
const Earcut = PhaserGeom.Polygon.Earcut;

class PathBase extends BaseGeom {
    buildStrokePath: any;
    closePath: any;
    dashOffset: any;
    dashPattern: any;
    isDashed: any;
    isFilled: any;
    isStroked: any;
    pathData: any;
    pathIndexes: any;
    strokePathData: any;
    strokePathMask: any;

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

    webglRender(drawingContext?: any, submitter?: any, calcMatrix?: any, gameObject?: any, alpha?: any, dx?: any, dy?: any) {
        if (this.isFilled) {
            FillPathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }

        if (this.isStroked) {
            StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx?: any, dx?: any, dy?: any) {
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