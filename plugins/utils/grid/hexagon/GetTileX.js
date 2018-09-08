'use strict'

import CONST from './const.js';
import GetTileY from './GetTileY.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetTileX = function (hexagon, worldX, worldY) {
    var width = hexagon.width;
    worldX -= hexagon.x;
    switch (hexagon.mode) {
        case ODD_R:
            var tileY = GetTileY(hexagon, worldX, worldY);
            if (tileY & 1) {
                worldX -= (hexagon.width / 2);
            }
            break;

        case EVEN_R:
            var tileY = GetTileY(hexagon, worldX, worldY);
            if (tileY & 1) {
                worldX += (hexagon.width / 2);
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