import Obstacles from './Obstacles';
import GetLineToPolygon from './GetLineToPolygon';

import { Geom as PhaserGeom, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Line = PhaserGeom.Line;
const SetToAngle = PhaserGeom.Line.SetToAngle;
const ReflectAngle = PhaserGeom.Line.ReflectAngle;

class Reflection {
    maxRayLength: any;
    obstacles: any;
    ray: any;
    result: any;

    constructor(config?: any) {
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

    setMaxRayLength(length?: any) {
        this.maxRayLength = length;
        return this;
    }

    addObstacle(gameObject?: any, polygon?: any) {
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

    removeObstacle(gameObject?: any) {
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

    updateObstacle(gameObject?: any, polygon?: any) {
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
        if (result?: any) {
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

    rayToward(x?: any, y?: any, angle?: any) {
        SetToAngle(this.ray, x, y, angle, this.maxRayLength);
        return this.hitTest();
    }
}

export default Reflection;