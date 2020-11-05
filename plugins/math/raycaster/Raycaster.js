import IsGameObject from '../../utils/system/IsGameObject.js';
import GetLineToPolygon from './GetLineToPolygon.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Polygon = Phaser.Geom.Polygon;
const Line = Phaser.Geom.Line;
const SetToAngle = Phaser.Geom.Line.SetToAngle;
const ReflectAngle = Phaser.Geom.Line.ReflectAngle;

class Reflection {
    constructor(config) {
        this.gameObjects = [];
        this.polygons = [];
        this.ray = new Line();
        this.setMaxRayLength(GetValue(config, 'maxRayLength', 999999));
        this.result = {
            hit: false,
            hitX: 0, hitY: 0,
            hitSegment: new Line(),
            hitShape: null,
            hitGameObject: null,
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
                var p0 = gameObject.getTopLeft(),
                    p1 = gameObject.getTopRight(),
                    p2 = gameObject.getBottomRight(),
                    p3 = gameObject.getBottomLeft();
                polygon = new Polygon([p0, p1, p2, p3, p0]);
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
            this.ray.x2 = result.x;
            this.ray.y2 = result.y;

            this.result.hit = true;
            this.result.hitX = result.x;
            this.result.hitY = result.y;

            var shapeIndex = result.shapeIndex;
            this.result.hitShape = this.polygons[shapeIndex];
            this.result.hitGameObject = this.gameObjects[shapeIndex];

            var points = this.result.hitShape.points,
                segIndex = result.segIndex,
                p0 = points[segIndex],
                p1 = points[segIndex + 1];
            var hitSegment = this.result.hitSegment;
            hitSegment.setTo(p0.x, p0.y, p1.x, p1.y);
            this.result.reflectAngle = ReflectAngle(this.ray, hitSegment);
        } else {
            this.result.hit = false;
            this.result.hitX = 0;
            this.result.hitY = 0;
            this.result.hitGameObject = null;
            this.result.reflectAngle = 0;
        }
        return (result) ? this.result : false;
    }

    rayToward(x, y, angle) {
        SetToAngle(this.ray, x, y, angle, this.maxRayLength);
        return this.hitTest();
    }
}

export default Reflection;