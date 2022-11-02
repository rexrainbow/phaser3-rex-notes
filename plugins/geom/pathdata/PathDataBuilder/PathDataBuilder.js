import AddPathMethods from './AddPathMethods.js';
import MovePointsMethods from './MovePointsMethods.js';
import PathLengthMethods from './PathLengthMethods.js';
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

    draw(graphics, isFill, isStroke) {
        var points = this.toPoints();
        if (isFill) {
            graphics.fillPoints(points, this.closePath, this.closePath);
        }
        if (isStroke) {
            graphics.strokePoints(points, this.closePath, this.closePath);
        }

        return this;
    }

}

Object.assign(
    PathDataBuilder.prototype,
    AddPathMethods,
    MovePointsMethods,
    PathLengthMethods
)

export default PathDataBuilder;