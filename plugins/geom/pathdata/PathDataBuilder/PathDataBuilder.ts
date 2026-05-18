import AddPathMethods from './AddPathMethods';
import TransformPointsMethods from './TransformPointsMethods';
import SavePathDataMethods from './SavePathDataMethods';
import PathSegmentMethods from './PathSegmentMethods';
import GraphicsMethods from './GraphicsMethods';
import ToPoints from '../ToPoints';
import ToPolygon from '../ToPolygon';


class PathDataBuilder {
    pathData: any;

    accumulationLengths: any;
    closePath: any;
    firstPointX: any;
    firstPointY: any;
    iterations: any;
    lastControlType: any;
    lastCX: any;
    lastCY: any;
    lastPointX: any;
    lastPointY: any;
    pathTypeMismatchWarningEnable: any;

    constructor(pathData?: any) {
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

    setIterations(iterations?: any) {
        this.iterations = iterations;
        return this;
    }

    setPathTypeMismatchWarningEnable(enable?: any) {
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

    toPolygon(polygon?: any) {
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