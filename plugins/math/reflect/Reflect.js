import IsGameObject from '../../utils/system/IsGameObject.js';
import GetLineToPolygon from './GetLineToPolygon.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Polygon = Phaser.Geom.Polygon;
const Line = Phaser.Geom.Line;
const SetToAngle = Phaser.Geom.Line.SetToAngle;
const ReflectAngle = Phaser.Geom.Line.ReflectAngle;

class Reflect {
    constructor(config) {
        this.gameObjects = [];
        this.polygons = [];
        this.ray = new Line();
        this.setMaxRayLength(GetValue(config, 'maxRayLength', 999999));
        this.hitSegment = new Line();
        this.result = {
            hit: false,
            hitX: 0, hitY: 0,
            hitGO: null,
            reflectAngle: 0
        };

    }

    setMaxRayLength(length) {
        this.maxRayLength = length;
        return this;
    }

    addObstacle(gameObject, polygon) {
        if (IsGameObject(gameObject)) {
            if (polygon === undefined) {
                polygon = new Polygon([
                    gameObject.getTopLeft(),
                    gameObject.getTopRight(),
                    gameObject.getBottomRight(),
                    gameObject.getBottomLeft()
                ])
            }
        } else if (gameObject instanceof (Polygon)) {
            polygon = gameObject;
        }

        this.gameObjects.push(gameObject);
        this.polygons.push(polygon);
        return this;
    }

    clearObstacle() {
        this.gameObjects.length = 0;
        this.polygons.length = 0;
        return this;
    }

    hitTest() {
        var result = GetLineToPolygon(this.ray, this.polygons, true);
        if (result) {
            this.result.hit = true;
            this.result.hitX = result.x;
            this.result.hitY = result.y;
            this.ray.x2 = result.x;
            this.ray.y2 = result.y;

            var shapeIndex = result.shapeIndex;
            this.result.hitGO = this.gameObjects[shapeIndex];

            var points = this.polygons[shapeIndex].points;
            var segIndex = result.segIndex,
                p0 = points[segIndex], p1 = points[segIndex + 1];
            this.hitSegment.setTo(p0.x, p0.y, p1.x, p1.y);
            this.result.reflectAngle = ReflectAngle(this.ray, this.hitSegment);
        } else {
            this.result.hit = false;
            this.result.hitX = 0;
            this.result.hitY = 0;
            this.result.hitGO = null;
            this.result.reflectAngle = 0;
        }
        return (result) ? this.result : false;
    }

    rayToward(x, y, angle) {
        SetToAngle(this.ray, x, y, angle, this.maxRayLength);
        return this.hitTest();
    }
}

export default Reflect;