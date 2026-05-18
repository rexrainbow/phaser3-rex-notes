// https://www.redblobgames.com/grids/hexagons/

import Offset from '../utils/Offset';
import SetPoints from './SetPoints';

import { Geom as PhaserGeom, Utils as PhaserUtils } from 'phaser';
const Polygon = PhaserGeom.Polygon;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const Line = PhaserGeom.Line;

class Quad extends Polygon {
    type: any;

    _height: any;
    _width: any;
    _x: any;
    _y: any;
    calculateArea: any;
    points: any;

    constructor(x?: any, y?: any, width?: any, height?: any, type?: any) {
        super();
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
            type = GetValue(config, 'type', 0);
        }
        var points = this.points;
        for (var i = 0; i < 4; i++) {
            points.push({});
        }
        this.setTo(x, y, width, height, type);
    }

    // override
    setTo(x?: any, y?: any, width?: any, height?: any, type?: any) {
        if (typeof (type) === 'string') {
            type = QUADTYPE[type];
        }
        this.type = type;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        SetPoints(this.centerX, this.centerY, width, height, type, this.points);
        this.calculateArea();
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        var offsetX = value - this.x;
        if (offsetX === 0) {
            return;
        }
        Offset(this, offsetX, 0);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        var offsetY = value - this.y;
        if (offsetY === 0) {
            return;
        }
        Offset(this, 0, offsetY);
        this._y = value;
    }

    setPosition(x?: any, y?: any) {
        var offsetX = x - this.x;
        var offsetY = y - this.y;
        if ((offsetX === 0) && (offsetY === 0)) {
            return this;
        }
        Offset(this, offsetX, offsetY);
        this._x = x;
        this._y = y;
        return this;
    }

    get left() {
        return this.x - (this.width / 2);
    }

    set left(value) {
        this.x += (value - this.left);
    }

    get right() {
        return this.x + (this.width / 2);
    }

    set right(value) {
        this.x += (value - this.right);
    }

    get top() {
        return this.y - (this.height / 2);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    get bottom() {
        return this.y + (this.height / 2);
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    get centerX() {
        return this.x;
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    get centerY() {
        return this.y;
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.setTo(this._x, this._y, value, this._height);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.setTo(this._x, this._y, this._width, value);
    }

    setSize(width?: any, height?: any) {
        this.setTo(this._x, this._y, width, height);
        return this;
    }

    isEmpty() {
        return (this.width <= 0) || (this.height <= 0);
    }

    getEdge(idx?: any, line?: any) {
        if (line === undefined) {
            line = new Line();
        }
        var p0 = this.points[idx];
        var p1 = this.points[(idx + 1) % 4];
        line.setTo(p0.x, p0.y, p1.x, p1.y);
        return line;
    }

    getLineA(line?: any) {
        return this.getEdge(0, line);
    }

    getLineB(line?: any) {
        return this.getEdge(1, line);
    }

    getLineC(line?: any) {
        return this.getEdge(2, line);
    }

    getLineD(line?: any) {
        return this.getEdge(3, line);
    }
}

const QUADTYPE = {
    'rectangle': 0,
    'rhombus': 1
}

// use `rexQuad` to prevent name conflict
PhaserGeom.rexQuad = Quad;

export default Quad;