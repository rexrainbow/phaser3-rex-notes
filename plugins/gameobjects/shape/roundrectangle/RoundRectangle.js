import GeomRoundRectangle from './geom/RoundRectangle.js';
import LineTo from '../utils/LineTo.js';
import ArcTo from '../utils/ArcTo.js';
import Earcut from 'rexPlugins/geom/utils/Earcut.js'
import Render from './RoundRectangleRender.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class RoundRectangle extends Phaser.GameObjects.Shape {
    constructor(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        var iteration = GetValue(radiusConfig, 'iteration', undefined);
        radiusConfig = GetValue(radiusConfig, 'radius', radiusConfig);
        var geom = new GeomRoundRectangle(0, 0, width, height, radiusConfig);
        super(scene, 'RoundRectangle', geom);

        this.setIteration(iteration);
        this.setPosition(x, y);
        this.setSize(geom.width, geom.height);

        if (fillColor !== undefined) {
            this.setFillStyle(fillColor, fillAlpha);
        }

        this.updateDisplayOrigin();
        this.updateData();
    }

    setIteration(iteration) {
        if (iteration === undefined) {
            iteration = 6;
        }
        this.iteration = iteration;
        return this;
    }

    updateData() {
        var geom = this.geom;
        var pathData = this.pathData;

        pathData.length = 0;

        var cornerRadius = geom.cornerRadius,
            radius,
            iteration = this.iteration + 1;
        // bottom-right
        radius = cornerRadius.br;
        if (isArcCorner(radius)) {
            var centerX = geom.width - radius.x;
            var centerY = geom.height - radius.y;
            ArcTo(centerX, centerY, radius, 0, 90, false, iteration, pathData);
        } else {
            LineTo(geom.width, geom.height, pathData);
        }

        // bottom-left
        radius = cornerRadius.bl;
        if (isArcCorner(radius)) {
            var centerX = radius.x;
            var centerY = geom.height - radius.y;
            ArcTo(centerX, centerY, radius, 90, 180, false, iteration, pathData);
        } else {
            LineTo(0, geom.height, pathData);
        }

        // top-left
        radius = cornerRadius.tl;
        if (isArcCorner(radius)) {
            var centerX = radius.x;
            var centerY = radius.y;
            ArcTo(centerX, centerY, radius, 180, 270, false, iteration, pathData);
        } else {
            LineTo(0, 0, pathData);
        }

        // top-right
        radius = cornerRadius.tr;
        if (isArcCorner(radius)) {
            var centerX = geom.width - radius.x;
            var centerY = radius.y;
            ArcTo(centerX, centerY, radius, 270, 360, false, iteration, pathData);
        } else {
            LineTo(geom.width, 0, pathData);
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);
        return this;
    }
}

var isArcCorner = function (radius) {
    return ((radius.x !== 0) && (radius.y !== 0));
}


Object.assign(
    RoundRectangle.prototype,
    Render
);

export default RoundRectangle;