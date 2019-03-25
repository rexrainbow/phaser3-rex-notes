import CONST from './const.js';
import {
    qr2xyz,
    roundxyz,
    xyz2qr,
} from './CubeTransfer.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

const SQRT3 = Math.sqrt(3);

var GetTileXY = function (worldX, worldY, out) {
    worldX -= this.x;
    worldY -= this.y;
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    var q, r;
    switch (this.mode) {
        case ODD_R:
        case EVEN_R:
            r = (worldY * (4 / 3)) / this.height;
            q = ((worldX * (2 * SQRT3 / 3)) / this.width) - (r / 2);
            break;

        case ODD_Q:
        case EVEN_Q:
            q = (worldX * (4 / 3)) / this.width;
            r = ((worldY * (2 * SQRT3 / 3)) / this.height) - (q / 2);
            break;
    }

    var cube = qr2xyz(this.mode, q, r);
    roundxyz(cube);
    var qr = xyz2qr(this.mode, cube.x, cube.y, cube.z, true);
    out.x = qr.q;
    out.y = qr.r;
    return out;
}

var globTileXY = {};

export default GetTileXY;