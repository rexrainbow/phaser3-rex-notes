'use strict'

import CONST from './const.js';
import GetTileX from './GetTileX.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetTileY = function (hexagon, worldX, worldY) {
    var height = hexagon.height;
    worldY -= hexagon.y;
    switch (hexagon.mode) {
        case ODD_R:
        case EVEN_R:
            worldY /= 0.75;
            break;

        case ODD_Q:
            var tileX = GetTileX(hexagon, worldX, worldY);
            if (tileX & 1) {
                worldY -= (height / 2);
            }
            break;

        case EVEN_Q:
            var tileX = GetTileX(hexagon, worldX, worldY);
            if (tileX & 1) {
                worldY += (height / 2);
            }
            break;
    }
    var tileY = Math.round(worldY / height);
    return tileY;
}

export default GetTileY;