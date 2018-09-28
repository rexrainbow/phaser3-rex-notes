import HexagonPolygon from 'rexPlugins/geom/hexagon/Hexagon.js';

var GetGridPolygon = function (tileX, tileY, poly) {
    var worldX, worldY;
    if (tileX === undefined) {
        worldX = 0;
        worldY = 0;
    } else {
        worldX = this.getWorldX(tileX, tileY);
        worldY = this.getWorldY(tileX, tileY);
    }
    var size = (this.staggeraxis === 0) ? (this.width / 2) : (this.height / 2);
    if (poly === undefined) {
        poly = new HexagonPolygon(worldX, worldY, size, this.staggeraxis);
    } else {
        if (poly === true) {
            poly = tmpPoly;
        }
        poly.setTo(worldX, worldY, size, this.staggeraxis);
    }
    return poly;
}

var tmpPoly = new HexagonPolygon();

export default GetGridPolygon;