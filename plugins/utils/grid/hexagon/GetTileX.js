import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetTileX = function (worldX, worldY) {
    var width = this.width;
    worldX -= this.x;
    switch (this.mode) {
        case ODD_R:
            var tileY = this.getTileY(worldX, worldY);
            if (tileY & 1) {
                worldX -= (this.width / 2);
            }
            break;

        case EVEN_R:
            var tileY = this.getTileY(worldX, worldY);
            if (tileY & 1) {
                worldX += (this.width / 2);
            }
            break;

        case ODD_Q:
        case EVEN_Q:
            worldX /= 0.75;
            break;
    }
    var tileX = Math.round(worldX / width);
    return tileX;
}

export default GetTileX;