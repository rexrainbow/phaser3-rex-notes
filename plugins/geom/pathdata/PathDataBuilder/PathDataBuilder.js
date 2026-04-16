import AddPathMethods from './AddPathMethods.js';
import TransformPointsMethods from './TransformPointsMethods.js';
import SavePathDataMethods from './SavePathDataMethods.js';
import PathSegmentMethods from './PathSegmentMethods.js';
import GraphicsMethods from './GraphicsMethods.js';
import ToPoints from '../ToPoints.js';
import ToPolygon from '../ToPolygon.js';


class PathDataBuilder {
    constructor(pathData) {
        if (pathData === undefined) {
            pathData = [];
        }

        this.pathData = pathData;
        this.closePath = false;
        this.setIterations(32);

        this.firstPointX = undefined;
        this.firstPointY = undefined;
        this.lastPointX = undefined;
        this.lastPointY = undefined;
        this.lastCX = undefined;
        this.lastCY = undefined;
        this.lastControlType = undefined;
        this.pathTypeMismatchWarningEnable = true;
        this.accumulationLengths = undefined;
    }

    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }

    setPathTypeMismatchWarningEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.pathTypeMismatchWarningEnable = enable;
        return this;
    }

    resetControlPoint() {
        this.lastCX = this.lastPointX;
        this.lastCY = this.lastPointY;
        this.lastControlType = undefined;
        return this;
    }

    toPoints() {
        return ToPoints(this.pathData);
    }

    toPolygon(polygon) {
        return ToPolygon(this.pathData, polygon);
    }

}

Object.assign(
    PathDataBuilder.prototype,
    AddPathMethods,
    TransformPointsMethods,
    SavePathDataMethods,
    PathSegmentMethods,
    GraphicsMethods,
)

export default PathDataBuilder;
