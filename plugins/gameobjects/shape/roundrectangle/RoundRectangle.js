import CONST from 'rexPlugins/geom/roundrectangle/const.js';
import GeomRoundRectangle from 'rexPlugins/geom/roundrectangle/RoundRectangle.js';
import Earcut from 'rexPlugins/geom/utils/Earcut.js'
import Render from './RoundRectangleRender.js';

const RECTANGLE = CONST.RECTANGLE;
const CIRCLE = CONST.CIRCLE;
const DegToRad = Phaser.Math.DegToRad;

class RoundRectangle extends Phaser.GameObjects.Shape {
    constructor(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        var geom = new GeomRoundRectangle(0, 0, width, height, radiusConfig);
        super(scene, 'RoundRectangle', geom);

        this._smoothness = 32;
        this.setPosition(x, y);
        this.setSize(geom.width, geom.height);

        if (fillColor !== undefined) {
            this.setFillStyle(fillColor, fillAlpha);
        }

        this.updateDisplayOrigin();
        this.updateData();
    }

    setSmoothness(value) {
        this.smoothness = value;
        return this;
    }

    updateData() {
        var geom = this.geom;
        var pathData = this.pathData;

        var ox = this.displayOriginX;
        var oy = this.displayOriginY;
        pathData.length = 0;
        switch (geom.type) {
            case CIRCLE:
                var step = DegToRad(360 / this.smoothness);
                var x, y, angle, radius = geom.radius;
                for (var i = 0, cnt = this.smoothness; i < cnt; i++) {
                    angle = i * step;
                    x = ox + (radius * Math.cos(angle));
                    y = oy + (radius * Math.sin(angle));
                    pathData.push(x, y);
                }
                break;
            case RECTANGLE:
                pathData.push(ox + geom.left, oy + geom.top);
                pathData.push(ox + geom.right, oy + geom.top);
                pathData.push(ox + geom.right, oy + geom.bottom);
                pathData.push(ox + geom.left, oy + geom.bottom);
                break;
            default:
                break;
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);
        return this;
    }

    get smoothness() {
        return this._smoothness;
    }

    set smoothness(value) {
        this._smoothness = value;
        this.updateData();
    }
}

Object.assign(
    RoundRectangle.prototype,
    Render
);

export default RoundRectangle;