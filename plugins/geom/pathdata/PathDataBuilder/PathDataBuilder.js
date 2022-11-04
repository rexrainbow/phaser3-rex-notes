import AddPathMethods from './AddPathMethods.js';
import TransformPointsMethods from './TransformPointsMethods.js';
import PathSegmentMethods from './PathSegmentMethods.js';
import GraphicsMethods from './GraphicsMethods.js';
import ToPoints from '../ToPoints.js';
import ToPolygon from '../ToPolygon.js';
import Copy from '../../../utils/array/Copy.js';


class PathDataBuilder {
    constructor(pathData) {
        if (pathData === undefined) {
            pathData = [];
        }

        this.pathData = pathData;
        this.closePath = false;
        this.setIterations(32);

        this.lastPointX = undefined;
        this.lastPointY = undefined;
        this.accumulationLengths = undefined;
    }

    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }

    toPoints() {
        return ToPoints(this.pathData);
    }

    toPolygon(polygon) {
        return ToPolygon(this.pathData, polygon);
    }

    copyFrom(src, startT, endT) {
        this.clear();

        if (startT === undefined) {
            Copy(this.pathData, src.pathDataSave);
        } else {
            this.copyFromPathSegment(src, startT, endT);
        }

        this.lastPointX = this.pathData[this.pathData.length - 2];
        this.lastPointY = this.pathData[this.pathData.length - 1];
        return this;
    }

}

Object.assign(
    PathDataBuilder.prototype,
    AddPathMethods,
    TransformPointsMethods,
    PathSegmentMethods,
    GraphicsMethods,
)

export default PathDataBuilder;