import {
    cr2cube,
    cube2cr
} from './CubeTransfer';

import CONST from './const';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;

var Mirror = function(src?: any, mode?: any, out?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }
    var cubeXYZ = cr2cube(this.mode, src.x, src.y, true);
    var isRMode = (this.mode === ODD_R) || (this.mode === EVEN_R);
    var newCubeX, newCubeY, newCubeZ;    
    if (mode & 1) { // Mirror x
        if (isRMode?: any) {
            newCubeX = cubeXYZ.y;
            newCubeY = cubeXYZ.x;
            newCubeZ = cubeXYZ.z;
        } else {
            newCubeX = -cubeXYZ.x;
            newCubeY = -cubeXYZ.z;
            newCubeZ = -cubeXYZ.y;
        }
        cubeXYZ.x = newCubeX;
        cubeXYZ.y = newCubeY;
        cubeXYZ.z = newCubeZ;
    }
    if (mode & 2) { // Mirror y
        if (isRMode?: any) {
            newCubeX = -cubeXYZ.y;
            newCubeY = -cubeXYZ.x;
            newCubeZ = -cubeXYZ.z;
        } else {
            newCubeX = cubeXYZ.x;
            newCubeY = cubeXYZ.z;
            newCubeZ = cubeXYZ.y;
        }
    }
    cube2cr(this.mode, newCubeX, newCubeY, newCubeZ, out);
    return out;
}

var globTileXY = {};
export default Mirror;