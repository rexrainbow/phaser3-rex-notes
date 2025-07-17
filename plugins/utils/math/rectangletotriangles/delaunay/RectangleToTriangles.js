import Triangulate from '../../delaunay/Triangulate.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Rectangle = Phaser.Geom.Rectangle;

var RectangleToTriangles = function (config) {
    var rectangle = config.rectangle;
    if (!rectangle) {
        rectangle = new Rectangle(0, 0, config.width, config.height);
    }

    var total = GetValue(config, 'amount', 10);
    var triangleOutput = GetValue(config, 'triangleOutput', true);

    var totalPoints = Math.ceil(total / 2) + 3;

    var points = Phaser.Geom.Rectangle.Decompose(rectangle);

    var width = rectangle.width, height = rectangle.height;
    InnerRectangle.setTo(
        rectangle.x + width * 0.05,
        rectangle.y + height * 0.05,
        width * 0.9,
        height * 0.9
    );

    for (var i = 0, cnt = totalPoints - points.length; i < cnt; i++) {
        points.push(InnerRectangle.getRandomPoint());
    }

    var vertices = [];
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var point = points[i];
        vertices.push([point.x, point.y]);
    }

    return Triangulate(vertices, triangleOutput);

}

var InnerRectangle = new Rectangle();

export default RectangleToTriangles;