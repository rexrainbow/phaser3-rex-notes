import DirectionToDeltaTileXY from './DirectionToDeltaTileXY';
import GetParity from './GetParity';
import {
    cr2cube,
    cube2cr
} from './CubeTransfer';

var GetTileXAtDirection = function(tileX?: any, tileY?: any, direction?: any, distance?: any, out?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    if (distance === 1) { // Neighbor
        var parity = GetParity(this.mode, tileX, tileY);
        out.x = tileX + DirectionToDeltaTileXY[this.mode][parity][direction][0];
        out.y = tileY + DirectionToDeltaTileXY[this.mode][parity][direction][1];
    } else if (distance === 0) {
        out.x = tileX;
        out.y = tileY;
    } else {
        var cubeXYZ = cr2cube(this.mode, tileX, tileY, true);
        var newCubeX, newCubeY, newCubeZ;
        switch (direction?: any) {
            case 1:
                newCubeX = cubeXYZ.x;
                newCubeY = cubeXYZ.y - distance;
                newCubeZ = cubeXYZ.z + distance;
                break;
            case 2:
                newCubeX = cubeXYZ.x - distance;
                newCubeY = cubeXYZ.y;
                newCubeZ = cubeXYZ.z + distance;
                break;
            case 3:
                newCubeX = cubeXYZ.x - distance;
                newCubeY = cubeXYZ.y + distance;
                newCubeZ = cubeXYZ.z;
                break;
            case 4:
                newCubeX = cubeXYZ.x;
                newCubeY = cubeXYZ.y + distance;
                newCubeZ = cubeXYZ.z - distance;
                break;
            case 5:
                newCubeX = cubeXYZ.x + distance;
                newCubeY = cubeXYZ.y;
                newCubeZ = cubeXYZ.z - distance;
                break;
            default:
                newCubeX = cubeXYZ.x + distance;
                newCubeY = cubeXYZ.y - distance;
                newCubeZ = cubeXYZ.z;
                break;
        }
        cube2cr(this.mode, newCubeX, newCubeY, newCubeZ, out);
    }

    return out;
}

var globTileXY = {};

export default GetTileXAtDirection;