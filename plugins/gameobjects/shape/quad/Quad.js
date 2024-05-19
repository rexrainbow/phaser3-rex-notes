import PolygnBase from '../roundrectangle/PolygnBase.js';
import QuadGeom from './QuadGeom.js';
import LineTo from '../../../geom/pathdata/LineTo.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Earcut = Phaser.Geom.Polygon.Earcut;

class Quad extends PolygnBase {
    constructor(scene, x, y, width, height, fillColor, fillAlpha) {
        var strokeColor, strokeAlpha, strokeWidth, shapeType;
        if (IsPlainObject(x)) {
            var config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;
            fillColor = config.color;
            fillAlpha = config.alpha;

            strokeColor = config.strokeColor;
            strokeAlpha = config.strokeAlpha;
            strokeWidth = config.strokeWidth;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }

        var geom = new QuadGeom();  // Configurate it later
        super(scene, 'rexQuadShape', geom);

        geom.setTo(0, 0, width, height);

        this.setPosition(x, y);

        this.setFillStyle(fillColor, fillAlpha);

        if ((strokeColor !== undefined) && (strokeWidth === undefined)) {
            strokeWidth = 2;
        }
        this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

        this.updateDisplayOrigin();
        this.dirty = true;
    }

    updateData() {
        var geom = this.geom;
        var pathData = this.pathData;
        pathData.length = 0;

        var width = geom.width,
            height = geom.height;
        var tlx = 0 + geom.tlx;
        var tly = 0 + geom.tly;
        var trx = width + geom.trx;
        var try_ = 0 + geom.try;
        var brx = width + geom.brx;
        var bry = height + geom.bry;
        var blx = 0 + geom.blx;
        var bly = height + geom.bly;

        LineTo(tlx, tly, pathData);
        LineTo(trx, try_, pathData);
        LineTo(brx, bry, pathData);
        LineTo(blx, bly, pathData);

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);

        return this;
    }

    get tlx() {
        return this.geom.tlx;
    }

    set tlx(value) {
        this.geom.tlx = value;
        this.dirty = true;
    }

    get tly() {
        return this.geom.tly;
    }

    set tly(value) {
        this.geom.tly = value;
        this.dirty = true;
    }

    get trx() {
        return this.geom.trx;
    }

    set trx(value) {
        this.geom.trx = value;
        this.dirty = true;
    }

    get try() {
        return this.geom.try;
    }

    set try(value) {
        this.geom.try = value;
        this.dirty = true;
    }

    get blx() {
        return this.geom.blx;
    }

    set blx(value) {
        this.geom.blx = value;
        this.dirty = true;
    }

    get bly() {
        return this.geom.bly;
    }

    set bly(value) {
        this.geom.bly = value;
        this.dirty = true;
    }

    get brx() {
        return this.geom.brx;
    }

    set brx(value) {
        this.geom.brx = value;
        this.dirty = true;
    }

    get bry() {
        return this.geom.bry;
    }

    set bry(value) {
        this.geom.bry = value;
        this.dirty = true;
    }

    setTLPosition(x, y) {
        this.geom.setTLPosition(x, y);
        return this;
    }

    setTRPosition(x, y) {
        this.geom.setTRPosition(x, y);
        return this;
    }

    setBLPosition(x, y) {
        this.geom.setBLPosition(x, y);
        return this;
    }

    setBRPosition(x, y) {
        this.geom.setBRPosition(x, y);
        return this;
    }

    resetCornerPosition() {
        this.geom.resetCornerPosition();
        return this;
    }
}

export default Quad;