import GeomRoundRectangle from 'rexPlugins/geom/roundrectangle/RoundRectangle.js';
import LineTo from './LineTo';
import ArcTo from './ArcTo.js';
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
        if (radius === 0) {
            LineTo(geom.width, geom.height, pathData);
        } else {
            var centerX = geom.width - radius;
            var centerY = geom.height - radius;
            ArcTo(centerX, centerY, radius, 0, 90, iteration, pathData);
        }

        // bottom-left
        radius = cornerRadius.bl;
        if (radius === 0) {
            LineTo(0, geom.height, pathData);
        } else {
            var centerX = radius;
            var centerY = geom.height - radius;
            ArcTo(centerX, centerY, radius, 90, 180, iteration, pathData);
        }

        // top-left
        radius = cornerRadius.tl;
        if (radius === 0) {
            LineTo(0, 0, pathData);
        } else {
            var centerX = radius;
            var centerY = radius;
            ArcTo(centerX, centerY, radius, 180, 270, iteration, pathData);
        }

        // top-right
        radius = cornerRadius.tr;
        if (radius === 0) {
            LineTo(geom.width, 0, pathData);
        } else {
            var centerX = geom.width - radius;
            var centerY = radius;
            ArcTo(centerX, centerY, radius, 270, 360, iteration, pathData);
        }


        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);
        return this;
    }
}

Object.assign(
    RoundRectangle.prototype,
    Render
);

export default RoundRectangle;