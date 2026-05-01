import { GameObjects as PhaserGameObjects, Geom as PhaserGeom } from 'phaser';
const GetAABB = PhaserGeom.Polygon.GetAABB;
const Translate = PhaserGeom.Polygon.Translate;
const PolygonShape = PhaserGameObjects.Polygon;

var tmpPolygon = {};
var tmpRectangle = new PhaserGeom.Rectangle();

var CreateBoundingPolygon = function (scene, points) {
    tmpPolygon.points = points;
    var aabb = GetAABB(tmpPolygon, tmpRectangle);
    Translate(tmpPolygon, -aabb.left, -aabb.top);
    var polygonShapeGameObject = new PolygonShape(scene, aabb.centerX, aabb.centerY, points).setOrigin(0.5);
    return polygonShapeGameObject;
}

export default CreateBoundingPolygon;