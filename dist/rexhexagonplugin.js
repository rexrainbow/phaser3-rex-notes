(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhexagonplugin = factory());
})(this, (function () { 'use strict';

    var Offset = function (polygon, x, y) {
        var points = polygon.points,
            point;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            point = points[i];
            point.x += x;
            point.y += y;
        }
        return polygon;
    };

    const SQRT3$1 = Math.sqrt(3);

    var Width = function (hexagon) {
        return (hexagon.type === 0) ? (2 * hexagon.size) : (SQRT3$1 * hexagon.size);
    };

    const SQRT3 = Math.sqrt(3);

    var Height = function (hexagon) {
        return (hexagon.type === 0) ? (SQRT3 * hexagon.size) : (2 * hexagon.size);
    };

    var InitPoints = function (count) {
        var points = [];
        for (var i = 0; i < count; i++) {
            points.push({
                x: 0,
                y: 0
            });
        }
        return points;
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    const DEG_TO_RAD = Math.PI / 180;

    /**
     * Convert the given angle from degrees, to the equivalent angle in radians.
     *
     * @function Phaser.Math.DegToRad
     * @since 3.0.0
     *
     * @param {integer} degrees - The angle (in degrees) to convert to radians.
     *
     * @return {number} The given angle converted to radians.
     */
    var DegToRad = function (degrees)
    {
        return degrees * DEG_TO_RAD;
    };

    var SetPoints = function (x, y, size, type, points) {
        if (points === undefined) {
            points = InitPoints(6);
        }

        if (size === undefined) ; else if (typeof (size) === 'number') {
            var angleOffset = (type === 0) ? 0 : -30;
            var angleDeg, angleRad;
            for (var i = 0; i < 6; i++) {
                angleDeg = (60 * i) + angleOffset;
                angleRad = DegToRad(angleDeg);
                points[i].x = x + size * Math.cos(angleRad);
                points[i].y = y + size * Math.sin(angleRad);
            }
        } else {
            var config = size;
            var w = config.width;
            var h = config.height;
            var halfW = w / 2;
            var quarterW = w / 4;
            var halfH = h / 2;
            var quarterH = h / 4;
            if (type === 0) {
                points[0].x = x + halfW;
                points[0].y = y;

                points[1].x = x + quarterW;
                points[1].y = y + halfH;

                points[2].x = x - quarterW;
                points[2].y = y + halfH;

                points[3].x = x - halfW;
                points[3].y = y;

                points[4].x = x - quarterW;
                points[4].y = y - halfH;

                points[5].x = x + quarterW;
                points[5].y = y - halfH;
            } else {
                points[0].x = x + halfW;
                points[0].y = y - quarterH;

                points[1].x = x + halfW;
                points[1].y = y + quarterH;

                points[2].x = x;
                points[2].y = y + halfH;

                points[3].x = x - halfW;
                points[3].y = y + quarterH;

                points[4].x = x - halfW;
                points[4].y = y - quarterH;

                points[5].x = x;
                points[5].y = y - halfH;
            }
        }
        return points;
    };

    // https://www.redblobgames.com/grids/hexagons/


    const Polygon = Phaser.Geom.Polygon;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;
    const Line = Phaser.Geom.Line;

    class Hexagon extends Polygon {
        constructor(x, y, size, orientationType) {
            super();
            if (IsPlainObject(x)) {
                var config = x;
                x = GetValue(config, 'x', 0);
                y = GetValue(config, 'y', 0);
                size = GetValue(config, 'size', 0);
                orientationType = GetValue(config, 'type', 1);
            }
            var points = this.points;
            for (var i = 0; i < 6; i++) {
                points.push({});
            }
            this.setTo(x, y, size, orientationType);
        }

        // override
        setTo(x, y, size, orientationType) {
            if (typeof (orientationType) === 'string') {
                orientationType = ORIENTATIONTYPE[orientationType];
            }

            this._x = x;
            this._y = y;
            this._size = size;
            this._orientationType = orientationType;

            SetPoints(x, y, size, orientationType, this.points);
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

        get centerX() {
            return this.x;
        }

        set centerX(value) {
            this.x = value;
        }

        get centerY() {
            return this.y;
        }

        set centerY(value) {
            this.y = value;
        }

        setPosition(x, y) {
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

        get size() {
            return this._size;
        }

        set size(value) {
            this.setTo(this._x, this._y, value, this._orientationType);
        }

        setSize(value) {
            this.size = value;
            return this;
        }

        get orientationType() {
            return this._orientationType;
        }

        set orientationType(value) {
            this.setTo(this._x, this._y, this._size, value);
        }

        setType(orientationType) {
            this.orientationType = orientationType;
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
        'y': 0,
        'pointy': 1,
        'x': 1
    };

    // use `rexHexagon` to prevent name conflict
    Phaser.Geom.rexHexagon = Hexagon;

    class HexagonPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(x, y, size, type) {
            return new Hexagon(x, y, size, type);
        }
    }

    return HexagonPlugin;

}));
