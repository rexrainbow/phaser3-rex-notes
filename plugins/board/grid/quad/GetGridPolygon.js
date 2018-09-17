import QuadPolygon from 'rexPlugins/geom/quad/Quad.js';

var GetGridPolygon = function (tileX, tileY, poly) {
    if (tileX === undefined) {
        tileX = 0;
    }
    if (tileY === undefined) {
        tileY = 0;
    }
    if (poly === undefined) {
        poly = tmpPoly;
    }    
    var worldX = this.getWorldX(tileX, tileY);
    var worldY = this.getWorldY(tileX, tileY);
    var quadType = (this.mode === 0) ? 0 : 1;
    poly.setTo(0, 0, this.width, this.height, quadType);
    poly.centerX = worldX;
    poly.centerY = worldY;
    return poly;
}

var tmpPoly = new QuadPolygon(0, 0, 0, 0, 0);

export default GetGridPolygon;