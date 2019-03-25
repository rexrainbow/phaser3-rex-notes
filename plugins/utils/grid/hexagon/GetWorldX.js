import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetWorldX = function (tileX, tileY) {
    var worldX = (tileX * this.width);
    switch (this.mode) {
        case ODD_R:
            if (tileY & 1) {
                worldX += this._halfWidth;
            }
            break;

        case EVEN_R:
            if (tileY & 1) {
                worldX -= this._halfWidth;
            }
            break;

        case ODD_Q:
        case EVEN_Q:
            worldX *= 0.75;
            break;
    }
    worldX += this.x;
    return worldX;
}

export default GetWorldX;