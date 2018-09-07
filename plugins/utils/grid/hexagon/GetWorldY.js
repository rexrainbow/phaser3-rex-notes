'use strict'

import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetWorldY = function (hexagon, tileX, tileY) {
    var worldY = (tileY * hexagon.height);
    switch (hexagon.mode) {
        case ODD_R:
        case EVEN_R:
            worldY *= 0.75;
            break;

        case ODD_Q:
            if (tileX & 1) {
                worldY += (hexagon.height / 2);
            }
            break;

        case EVEN_Q:
            if (tileX & 1) {
                worldY -= (hexagon.height / 2);
            }
            break;
    }
    return worldY + hexagon.y;
}

export default GetWorldY;