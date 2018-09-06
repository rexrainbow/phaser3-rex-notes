'use strict'

// https://www.redblobgames.com/grids/hexagons/

import Offset from './Offset.js';
import Width from './Width.js';
import Height from './Height.js';

const Polygon = Phaser.Geom.Polygon;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const Line = Phaser.Geom.Line;

class Hexagon extends Polygon {
    constructor(x, y, size, type) {
        super();
        if (typeof (type) === 'string') {
            type = ORIENTATIONTYPE[type]
        }
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            size = GetValue(config, 'size', 0);
            type = GetValue(config, 'type', 0);
        }
        var points = this.points;
        for (var i = 0; i < 6; i++) {
            points.push({});
        }
        this.setTo(x, y, size, type);
    }

    // override
    setTo(x, y, size, type) {
        this._x = x;
        this._y = y;
        this._size = size;
        this.type = type;

        var points = this.points,
            point;
        var angleOffset = (type === 0) ? 0 : -30;
        var angleDeg, angleRad;
        for (var i = 0; i < 6; i++) {
            angleDeg = (60 * i) + angleOffset;
            angleRad = DegToRad(angleDeg);
            point = points[i];
            point.x = x + size * Math.cos(angleRad);
            point.y = y + size * Math.sin(angleRad);
        }
        this.calculateArea();
        this.width = Width(this);
        this.height = Height(this);
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        var offsetX = value - this.x;
        Offset(this, offsetX, 0);
    }

    get y() {
        return this._y;
    }

    set y(value) {
        var offsetY = value - this.y;
        Offset(this, 0, offsetY);
    }

    setPosition(x, y) {
        var offsetX = x - this.x;
        var offsetY = y - this.y;
        this._x = x;
        this._y = y;        
        Offset(this, offsetX, offsetY);
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

    get size() {
        return this._size;
    }

    set size(value) {
        this.setTo(this._x, this._y, value, this.type);
    }

    setSize(value) {
        this.size = value;
        return this;
    }

    isEmpty() {
        return (this.size <= 0);
    }

    getEdge(idx, line) {
        if (line === undefined) {
            line = new Line();
        }
        var p0 = this.points[idx];
        var p1 = this.points[(idx + 1) % 6];
        line.setTo(p0.x, p0.y, p1.x, p1.y);
        return line;
    }

    getLineA(line) {
        return this.getEdge(0, line);
    }

    getLineB(line) {
        return this.getEdge(1, line);
    }

    getLineC(line) {
        return this.getEdge(2, line);
    }

    getLineD(line) {
        return this.getEdge(3, line);
    }

    getLineE(line) {
        return this.getEdge(4, line);
    }

    getLineF(line) {
        return this.getEdge(5, line);
    }
}

const ORIENTATIONTYPE = {
    'flat': 0,
    'vertical': 0,
    'pointy': 1,
    'horizontal': 1
};

export default Hexagon;