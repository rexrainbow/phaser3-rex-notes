import {
    qr2x,
    qr2y,
    qr2z,
    xyz2q,
    xyz2r
} from './CubeTransfer.js';

import Wrap from '../../math/Wrap.js';

var Rotate = function (src, dir, out) {
    if (out === undefined) {
        out = tmp;
    }

    dir = Wrap(dir, 0, 5);
    var mode = this.mode;
    var q = src.x,
        r = src.y;
    var cubeX = qr2x(mode, q, r);
    var cubeY = qr2y(mode, q, r);
    var cubeZ = qr2z(mode, q, r);
    var newCubeX, newCubeY, newCubeZ;
    switch (dir) {
        case 1:
            newCubeX = -cubeZ;
            newCubeY = -cubeX;
            newCubeZ = -cubeY;
            break;
        case 2:
            newCubeX = cubeY;
            newCubeY = cubeZ;
            newCubeZ = cubeX;
            break;
        case 3:
            newCubeX = -x;
            newCubeY = -y;
            newCubeZ = -z;
            break;
        case 4:
            newCubeX = cubeZ;
            newCubeY = cubeX;
            newCubeZ = cubeY;
            break;
        case 5:
            newCubeX = -cubeY;
            newCubeY = -cubeZ;
            newCubeZ = -cubeX;
            break;
        default:
            newCubeX = cubeX;
            newCubeY = cubeY;
            newCubeZ = cubeZ;
            break;
    }

    out.x = xyz2q(mode, newCubeX, newCubeY, newCubeZ);
    out.y = xyz2r(mode, newCubeX, newCubeY, newCubeZ);
    return out;
}

var tmp = {
    x: 0,
    y: 0
};
export default Rotate;