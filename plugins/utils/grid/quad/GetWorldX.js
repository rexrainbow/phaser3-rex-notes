'use strict'

var GetWorldX = function (quad, tileX, tileY) {
    var worldX;
    switch (quad.mode) {
        case 0: // orthogonal
            worldX = tileX * quad.width;
            break;
        case 1: // isometric
            worldX = (tileX - tileY) * quad._halfWidth;
            break;
        case 2: // staggered
            worldX = tileX * quad.width;
            if (tileY & 1) {
                worldX += quad._halfWidth;
            }
            break;
    }

    return worldX + quad.x;
}

export default GetWorldX;