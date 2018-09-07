'use strict'

var GetWorldY = function (quad, tileX, tileY) {
    var worldY;
    switch (quad.mode) {
        case 0: // orthogonal
            worldY = tileY * quad.height;
            break;
        case 1: // isometric
            worldY = (tileX + tileY) * quad._halfHeight;
            break;
        case 2: // staggered
            worldY = tileY * quad._halfHeight;
            break;
    }

    return worldY + quad.y;
}

export default GetWorldY;