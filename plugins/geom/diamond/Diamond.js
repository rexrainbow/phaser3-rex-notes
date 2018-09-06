'use strict'

// https://www.redblobgames.com/grids/hexagons/

import Offset from './Offset.js';

const Polygon = Phaser.Geom.Polygon;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Line = Phaser.Geom.Line;

class Diamond extends Polygon {
    constructor(x, y, width, height) {
        super();
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        }
        var points = this.points;
        for (var i = 0; i < 4; i++) {
            points.push({});
        }
        this.setTo(x, y, width, height);
    }

    // override
    setTo(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        var centerX = this.centerX,
            centerY = this.centerY;
        var helfWidth = width / 2;
        var helfHeight = height / 2;
        var points = this.points;
        // 0
        points[0].x = centerX + helfWidth;
        points[0].y = centerY;
        // 90
        points[1].x = centerX;
        points[1].y = centerY + helfHeight;
        // 180
        points[2].x = centerX - helfWidth;
        points[2].y = centerY;
        // 270
        points[3].x = centerX;
        points[3].y = centerY - helfHeight;
        this.calculateArea();
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
        return this.x + (this.width / 2);
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    get centerY() {
        return this.y + (this.height / 2);
    }

    set centerY(value) {
        this.y += (value - this.centetY);
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

    setSize(width, height) {
        this.setTo(this._x, this._y, width, height);
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
}

const ORIENTATIONTYPE = {
    'flat': 0,
    'vertical': 0,
    'pointy': 1,
    'horizontal': 1
};

export default Diamond;