import Rhombus from 'rexPlugins/geom/rhombus/Rhombus.js';

const Polygon = Phaser.Geom.Polygon;
var GetGridPolygon = function (tileX, tileY, poly) {
    if (tileX === undefined) {
        tileX = 0;
    }
    if (tileY === undefined) {
        tileY = 0;
    }
    var worldX = this.getWorldX(tileX, tileY);
    var worldY = this.getWorldY(tileX, tileY);
    switch (this.type) {
        case 0:
            poly = RectanglePoly(worldX, worldY, this.width, this.height);
            break;
        case 1:
        case 2:
            if (poly === undefined) {
                poly = new Rhombus(0, 0, this.width, this.height);
            } else {
                poly.setTo(0, 0, this.width, this.height);
            }
            poly.centerX = worldX;
            poly.centerY = worldY;
            break;
    }

    return poly;
}

var RectanglePoly = function (x, y, width, height, poly) {
    if (poly === undefined) {
        poly = new Polygon();
        var points = poly.points;
        for (var i = 0; i < 4; i++) {
            points.push({});
        }
    }
    var points = poly.points;
    var helfWidth = width / 2;
    var helfHeight = height / 2;
    points[0].x = x - helfWidth;
    points[0].y = y - helfHeight;
    points[1].x = x + helfWidth;
    points[1].y = y - helfHeight;
    points[2].x = x + helfWidth;
    points[2].y = y + helfHeight;
    points[3].x = x - helfWidth;
    points[3].y = y + helfHeight;
    return poly;
}
export default GetGridPolygon;