import QuadPolygon from 'rexPlugins/geom/quad/Quad.js';

var GetGridPolygon = function (tileX, tileY, poly) {
    if (tileX === undefined) {
        tileX = 0;
    }
    if (tileY === undefined) {
        tileY = 0;
    }
    var worldX = this.getWorldX(tileX, tileY);
    var worldY = this.getWorldY(tileX, tileY);
    var quadType = (this.mode === 0) ? 0 : 1;
    if (poly === undefined) {
        poly = new QuadPolygon(worldX, worldY, this.width, this.height, quadType);
    } else {
        if (poly === true) {
            poly = tmpPoly;
        }
        poly.setTo(worldX, worldY, this.width, this.height, quadType);
    }
    return poly;
}

var tmpPoly = new QuadPolygon();

export default GetGridPolygon;