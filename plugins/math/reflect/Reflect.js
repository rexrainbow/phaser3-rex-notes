import IsGameObject from '../../utils/system/IsGameObject.js';
import GetLineToPolygon from './GetLineToPolygon.js';

const Polygon = Phaser.Geom.Polygon;
const Line = Phaser.Geom.Line;
const SetToAngle = Phaser.Geom.Line.SetToAngle;
const ReflectAngle = Phaser.Geom.Line.ReflectAngle;

class Reflect {
    constructor() {
        this.gameObjects = [];
        this.polygons = [];
        this.ray = new Line();
        this.hitSegment = new Line();
        this.result = {
            hit: false,
            hitX: 0, hitY: 0,
            hitGO: null,
            reflectAngle: 0
        };
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

    trace() {
        var result = GetLineToPolygon(this.ray, this.polygons, true);
        if (result) {
            this.result.hit = true;
            this.result.hitX = result.x;
            this.result.hitY = result.y;
            this.result.hitGO = this.gameObjects[result.polygonIndex];

            this.hitSegment.setTo(result.segX1, result.segY1, result.segX2, result.segY2);
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

    rayTo(x1, y1, x2, y2) {
        this.ray.setTo(x1, y1, x2, y2);
        return this.trace();
    }

    rayPolar(x, y, angle, length) {
        SetToAngle(this.ray, x, y, angle, length);
        return this.trace();
    }


}

export default Reflect;