import HexagonPolygon from 'rexPlugins/geom/hexagon/Hexagon.js';

var GetGridPolygon = function (tileX, tileY, poly) {
    if (tileX === undefined) {
        tileX = 0;
    }
    if (tileY === undefined) {
        tileY = 0;
    }
    var worldX = this.getWorldX(tileX, tileY);
    var worldY = this.getWorldY(tileX, tileY);
    var size = (this.staggeraxis === 0) ? (this.width / 2) : (this.height / 2);
    if (poly === undefined) {
        poly = new HexagonPolygon(worldX, worldY, size, this.staggeraxis);
    } else {
        poly.setTo(worldX, worldY, size, this.staggeraxis);
    }
    return poly;
}

export default GetGridPolygon;