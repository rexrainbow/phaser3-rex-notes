import LinesToCircle from '../../../../utils/geom/intersects/LinesToCircle.js';

import { GameObjects as PhaserGameObjects, Geom as PhaserGeom } from 'phaser';
const Rectangle = PhaserGeom.Rectangle;
const RectangleContains = PhaserGeom.Rectangle.Contains;
const SetInteractiveBase = PhaserGameObjects.GameObject.prototype.setInteractive;

const GlobPoint = new PhaserGeom.Circle();

var HitAreaCallback = function (shape, x, y, gameObject) {
    if (!RectangleContains(shape, x, y)) {
        return false;
    }

    GlobPoint.setTo(x, y, gameObject.pointRadius);

    var line = gameObject.getShapes()[0];
    var points = line.pathData;

    return LinesToCircle(points, GlobPoint);
}

export default {
    setPointRadius(radius) {
        this.pointRadius = radius;
        return this;
    },

    setInteractive(config) {
        if (config === undefined) {
            config = {};
        }

        config.hitArea = new Rectangle(0, 0, this.width, this.height);
        config.hitAreaCallback = HitAreaCallback;

        SetInteractiveBase.call(this, config);

        return this;
    }
}