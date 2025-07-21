const GetAABB = Phaser.Geom.Polygon.GetAABB;
const Translate = Phaser.Geom.Polygon.Translate;
const PolygonShape = Phaser.GameObjects.Polygon;

var tmpPolygon = {};
var tmpRectangle = new Phaser.Geom.Rectangle();

var CreateBoundingPolygon = function (scene, points) {
    tmpPolygon.points = points;
    var aabb = GetAABB(tmpPolygon, tmpRectangle);
    Translate(tmpPolygon, -aabb.left, -aabb.top);
    var polygonShapeGameObject = new PolygonShape(scene, aabb.centerX, aabb.centerY, points).setOrigin(0.5);
    return polygonShapeGameObject;
}

export default CreateBoundingPolygon;