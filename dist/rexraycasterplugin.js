(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexraycasterplugin = factory());
})(this, (function () { 'use strict';

    const GameObjectClass = Phaser.GameObjects.GameObject;
    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass);
    };

    var GetDisplayWidth = function (gameObject) {
        if (gameObject.displayWidth !== undefined) {
            return gameObject.displayWidth;
        } else {
            return gameObject.width;
        }
    };

    var GetDisplayHeight = function (gameObject) {
        if (gameObject.displayHeight !== undefined) {
            return gameObject.displayHeight;
        } else {
            return gameObject.height;
        }
    };

    Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround = Phaser.Math.RotateAround;
    Phaser.GameObjects.Container;

    var GetTopLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopLeft) {
            return gameObject.getTopLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetTopRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopRight) {
            return gameObject.getTopRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomLeft) {
            return gameObject.getBottomLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomRight) {
            return gameObject.getBottomRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GlobVector = undefined;

    var PrepareBoundsOutput = function (gameObject, output, includeParent) {
        if (includeParent === undefined) { includeParent = false; }

        if (gameObject.rotation !== 0) {
            RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const Polygon$1 = Phaser.Geom.Polygon;

    var BoundsToPolygon = function (gameObject, out) {
        if (out === undefined) {
            out = new Polygon$1();
        }
        var p0 = GetTopLeft(gameObject),
            p1 = GetTopRight(gameObject),
            p2 = GetBottomRight(gameObject),
            p3 = GetBottomLeft(gameObject);
        out.setTo([p0, p1, p2, p3, p0]);
        return out;
    };

    const Polygon = Phaser.Geom.Polygon;
    const SpliceOne = Phaser.Utils.Array.SpliceOne;

    class Obstacles {
        constructor() {
            this.gameObjects = [];
            this.polygons = [];
        }

        contains(gameObject) {
            return (this.gameObjects.indexOf(gameObject) !== (-1));
        }

        get(index) {
            Obstacle.gameObject = this.gameObjects[index];
            Obstacle.polygon = this.polygons[index];
            return Obstacle;
        }

        addDestroyCallback(gameObject) {
            if (Array.isArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    this.addDestroyCallback(gameObjects[i]);
                }
                return this;
            }

            if (gameObject.on) {
                gameObject.once('destroy', this.onChildDestroy, this);
            }
            return this;
        }

        removeDestroyCallback(gameObject) {
            if (Array.isArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    this.removeDestroyCallback(gameObjects[i]);
                }
                return this;
            }

            if (gameObject.off) {
                gameObject.off('destroy', this.onChildDestroy, this);
            }
            return this;
        }

        clear() {
            this.removeDestroyCallback(this.gameObjects);
            this.gameObjects.length = 0;
            this.polygons.length = 0;
            return this;
        }

        add(gameObject, polygon) {
            if (this.contains(gameObject)) {
                return this;
            }

            if (IsGameObject(gameObject)) {
                if (polygon === undefined) {
                    polygon = BoundsToPolygon(gameObject);
                }
            } else if (gameObject instanceof (Polygon)) {
                polygon = gameObject;
            }

            this.gameObjects.push(gameObject);
            this.polygons.push(polygon);

            this.addDestroyCallback(gameObject);
            return this;
        }

        remove(gameObject) {
            var index = this.gameObjects.indexOf(gameObject);
            if (index === (-1)) {
                return this;
            }

            SpliceOne(this.gameObjects, index);
            SpliceOne(this.polygons, index);

            this.removeDestroyCallback(gameObject);
            return this;
        }

        onChildDestroy(child, fromScene) {
            this.remove(child);
        }

        update(gameObject, polygon) {
            var index = this.gameObjects.indexOf(gameObject);
            if (index === (-1)) {
                return this;
            }
            if (polygon === undefined) {
                polygon = BoundsToPolygon(gameObject, this.polygons[index]);
            }
            this.polygons[index] = polygon;
            return this;
        }
    }

    var Obstacle = {};

    const GetLineToLine = Phaser.Geom.Intersects.GetLineToLine;
    const PointToLine = Phaser.Geom.Intersects.PointToLine;

    var GetLineToPoints = function (line, points, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globResult$1;
        }
        /* 
        out: {
            x,y,      // intersection point
            d,        // intersection distance
            segIndex  // intersection segment
        }
        */

        var closestIntersect = false;

        startPoint.setTo(line.x1, line.y1);
        out.d = Infinity;
        tempIntersect.set();

        var prev = points[0];

        for (var i = 1; i < points.length; i++) {
            var current = points[i];

            segment.setTo(prev.x, prev.y, current.x, current.y);
            prev = current;

            // Ignore case: start point of line is at segment
            if (PointToLine(startPoint, segment)) {
                continue;
            }

            if (GetLineToLine(line, segment, false, tempIntersect)) {
                if (tempIntersect.z < out.d) {
                    out.x = tempIntersect.x;
                    out.y = tempIntersect.y;
                    out.d = tempIntersect.z;
                    out.segIndex = i - 1;

                    closestIntersect = true;
                }
            }
        }

        return (closestIntersect) ? out : null;
    };

    var globResult$1 = {};
    var startPoint = new Phaser.Geom.Point();
    var segment = new Phaser.Geom.Line();
    var tempIntersect = new Phaser.Math.Vector3();

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    /**
     * Shallow Object Clone. Will not out nested objects.
     * @param {object} obj JSON object
     * @param {object} ret JSON object to return, set null to return a new object
     * @returns {object} this object
     */
    var Clone = function (obj, out) {
        var objIsArray = Array.isArray(obj);

        if (out === undefined) {
            out = (objIsArray) ? [] : {};
        } else {
            Clear(out);
        }

        if (objIsArray) {
            out.length = obj.length;
            for (var i = 0, cnt = obj.length; i < cnt; i++) {
                out[i] = obj[i];
            }
        } else {
            for (var key in obj) {
                out[key] = obj[key];
            }
        }

        return out;
    };

    const GetAABB = Phaser.Geom.Polygon.GetAABB;
    const LineToRectangle = Phaser.Geom.Intersects.LineToRectangle;

    var GetLineToPolygon = function (line, polygons, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globResult;
        }
        /* 
        out: {
            x,y,        // intersection point
            d,          // intersection distance
            segIndex,   // index of intersection segment
            shapeIndex  // index of intersection polygon
        }
        */

        if (!Array.isArray(polygons)) {
            polygons = [polygons];
        }

        var closestIntersect = false;
        out.d = Infinity;

        //  Reset our vec4s

        for (var i = 0; i < polygons.length; i++) {
            var polygon = polygons[i];

            // Run AABBTest when polygon is more than 8 edges
            if ((polygon.points.length > 9) &&
                !LineToRectangle(line, GetAABB(polygon, AABBRect))) {
                continue;
            }

            var intersectionResult = GetLineToPoints(line, polygon.points, true);
            if (intersectionResult) {
                if (intersectionResult.d < out.d) {
                    Clone(intersectionResult, out);  // x,y,d,segIndex
                    out.shapeIndex = i;

                    closestIntersect = true;
                }
            }
        }

        return (closestIntersect) ? out : null;
    };

    var globResult = {};
    var AABBRect = new Phaser.Geom.Rectangle();

    const GetValue = Phaser.Utils.Objects.GetValue;
    const Line = Phaser.Geom.Line;
    const SetToAngle = Phaser.Geom.Line.SetToAngle;
    const ReflectAngle = Phaser.Geom.Line.ReflectAngle;

    class Reflection {
        constructor(config) {
            this.obstacles = new Obstacles();
            this.ray = new Line();
            this.setMaxRayLength(GetValue(config, 'maxRayLength', 10000));
            this.result = {
                hit: false,
                x: 0, y: 0,
                segment: new Line(),
                polygon: null,
                gameObject: null,
                reflectAngle: 0
            };

        }

        destroy() {
            this.obstacles.clear();
            this.obstacles = null;
            this.ray = null;
            this.result = null;
        }

        setMaxRayLength(length) {
            this.maxRayLength = length;
            return this;
        }

        addObstacle(gameObject, polygon) {
            if (Array.isArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    this.obstacles.add(gameObjects[i]);
                }
            } else {
                this.obstacles.add(gameObject, polygon);
            }
            return this;
        }

        clearObstacle() {
            this.obstacles.clear();
            return this;
        }

        removeObstacle(gameObject) {
            if (Array.isArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    this.obstacles.remove(gameObjects[i]);
                }
            } else {
                this.obstacles.remove(gameObject);
            }
            return this;
        }

        updateObstacle(gameObject, polygon) {
            if (Array.isArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    this.obstacles.update(gameObjects[i]);
                }
            } else {
                this.obstacles.update(gameObject, polygon);
            }
            return this;
        }

        hitTest() {
            var result = GetLineToPolygon(this.ray, this.obstacles.polygons, true);
            if (result) {
                this.ray.x2 = result.x;
                this.ray.y2 = result.y;

                this.result.hit = true;
                this.result.x = result.x;
                this.result.y = result.y;

                var obstacle = this.obstacles.get(result.shapeIndex);
                this.result.polygon = obstacle.polygon;
                this.result.gameObject = obstacle.gameObject;

                var points = this.result.polygon.points,
                    segIndex = result.segIndex,
                    p0 = points[segIndex],
                    p1 = points[segIndex + 1];
                var segment = this.result.segment;
                segment.setTo(p0.x, p0.y, p1.x, p1.y);
                this.result.reflectAngle = ReflectAngle(this.ray, segment);
            } else {
                this.result.hit = false;
            }
            return (result) ? this.result : false;
        }

        rayToward(x, y, angle) {
            SetToAngle(this.ray, x, y, angle, this.maxRayLength);
            return this.hitTest();
        }
    }

    class RaycasterPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(config) {
            return new Reflection(config);
        }
    }

    return RaycasterPlugin;

}));
