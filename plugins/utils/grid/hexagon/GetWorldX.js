import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetWorldX = function (tileX, tileY) {
    var width = this.width;
    var worldX = (tileX * width);
    switch (this.mode) {
        case ODD_R:
            if (tileY & 1) {
                worldX += (width / 2);
            }
            break;

        case EVEN_R:
            if (tileY & 1) {
                worldX -= (width / 2);
            }
            break;

        case ODD_Q:
        case EVEN_Q:
            worldX *= 0.75;
            break;
    }
    return worldX + this.x;
}

export default GetWorldX;