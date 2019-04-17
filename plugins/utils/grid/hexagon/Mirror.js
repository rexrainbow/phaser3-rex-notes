import {
    cr2cube,
    cube2cr
} from './CubeTransfer.js';

var Mirror = function (src, mode, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }
    var cubeXYZ = cr2cube(this.mode, src.x, src.y, true);
    var newCubeX, newCubeY, newCubeZ;
    if (mode & 1) { // Mirror x
        newCubeX = cubeXYZ.y;
        newCubeY = cubeXYZ.x;
        newCubeZ = cubeXYZ.z;
        cubeXYZ.x = newCubeX;
        cubeXYZ.y = newCubeY;
        cubeXYZ.z = newCubeZ;
    }
    if (mode & 2) { // Mirror y
        newCubeX = -cubeXYZ.y;
        newCubeY = -cubeXYZ.x;
        newCubeZ = -cubeXYZ.z;
    }
    cube2cr(this.mode, newCubeX, newCubeY, newCubeZ, out);
    return out;
}

var globTileXY = {};
export default Mirror;