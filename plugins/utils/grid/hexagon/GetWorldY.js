import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetWorldY = function (tileX, tileY) {
    var height = this.height;
    var worldY = (tileY * height);
    switch (this.mode) {
        case ODD_R:
        case EVEN_R:
            worldY *= 0.75;
            break;

        case ODD_Q:
            if (tileX & 1) {
                worldY += (height / 2);
            }
            break;

        case EVEN_Q:
            if (tileX & 1) {
                worldY -= (height / 2);
            }
            break;
    }
    return worldY + this.y;
}

export default GetWorldY;