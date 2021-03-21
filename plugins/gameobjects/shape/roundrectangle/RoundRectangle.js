import GeomRoundRectangle from '../../../geom/roundrectangle/RoundRectangle.js';
import LineTo from '../utils/pathData/LineTo.js';
import ArcTo from '../utils/pathData/ArcTo.js';
import Render from './render/Render.js';

const Shape = Phaser.GameObjects.Shape;
const GetValue = Phaser.Utils.Objects.GetValue;
const Earcut = Phaser.Geom.Polygon.Earcut;

class RoundRectangle extends Shape {
    constructor(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        var geom = new GeomRoundRectangle();  // Configurate it later
        super(scene, 'rexRoundRectangleShape', geom);

        var radius = GetValue(radiusConfig, 'radius', radiusConfig);
        geom.setTo(0, 0, width, height, radius);

        var iteration = GetValue(radiusConfig, 'iteration', undefined);
        this.setIteration(iteration);
        this.setPosition(x, y);

        if (fillColor !== undefined) {
            this.setFillStyle(fillColor, fillAlpha);
        }

        this.updateDisplayOrigin();
        this.dirty = true;
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
            ArcTo(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
        } else {
            LineTo(geom.width, geom.height, pathData);
        }

        // bottom-left
        radius = cornerRadius.bl;
        if (isArcCorner(radius)) {
            var centerX = radius.x;
            var centerY = geom.height - radius.y;
            ArcTo(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
        } else {
            LineTo(0, geom.height, pathData);
        }

        // top-left
        radius = cornerRadius.tl;
        if (isArcCorner(radius)) {
            var centerX = radius.x;
            var centerY = radius.y;
            ArcTo(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
        } else {
            LineTo(0, 0, pathData);
        }

        // top-right
        radius = cornerRadius.tr;
        if (isArcCorner(radius)) {
            var centerX = geom.width - radius.x;
            var centerY = radius.y;
            ArcTo(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
        } else {
            LineTo(geom.width, 0, pathData);
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);
        return this;
    }

    get width() {
        return this.geom.width;
    }
    set width(value) {
        this.resize(value, this.height);
    }

    get height() {
        return this.geom.height;
    }
    set height(value) {
        this.resize(this.width, value);
    }

    resize(width, height) {
        if (height === undefined) {
            height = width;
        }
        if ((this.geom.width === width) && (this.geom.height === height)) {
            return this;
        }
        this.geom.height = height;
        this.geom.width = width
        this.updateDisplayOrigin();
        this.dirty = true;

        var input = this.input;
        if (input && !input.customHitArea) {
            input.hitArea.width = width;
            input.hitArea.height = height;
        }
        return this;
    }

    get iteration() {
        return this._iteration;
    }

    set iteration(value) {
        // Set iteration first time
        if (this._iteration === undefined) {
            this._iteration = value;
            return;
        }

        // Change iteration value
        if (this._iteration === value) {
            return;
        }

        this._iteration = value;
        this.dirty = true;
    }

    setIteration(iteration) {
        if (iteration === undefined) {
            iteration = 6;
        }
        this.iteration = iteration;
        return this;
    }

    get radius() {
        return this.geom.radius;
    }

    set radius(value) {
        this.geom.setRadius(value);
        this.updateDisplayOrigin();
        this.dirty = true;
    }

    setRadius(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radius = value;
        return this;
    }

    get cornerRadius() {
        return this.geom.cornerRadius;
    }

    set cornerRadius(value) {
        this.radius = value;
    }

    setCornerRadius(value) {
        return this.setRadius(value);
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