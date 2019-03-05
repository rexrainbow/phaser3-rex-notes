// Not included in Base Gird object.
// Delta tileXY to direction

import NeighborToDeltaTileXY from './NeighborToDeltaTileXY.js';

var ReverseDirMap = function (dirMap) {
    var out = {},
        entry, x, y;
    for (var dir in dirMap) {
        entry = dirMap[dir]; // [x, y]
        x = entry[0];
        y = entry[1];
        if (!out.hasOwnProperty(x)) {
            out[x] = {}
        }
        out[x][y] = parseInt(dir);
    }
    return out;
}

const Neighbors = [
    [
        ReverseDirMap(NeighborToDeltaTileXY[0][0]),
        ReverseDirMap(NeighborToDeltaTileXY[0][1])
    ],
    [
        ReverseDirMap(NeighborToDeltaTileXY[1][0]),
        ReverseDirMap(NeighborToDeltaTileXY[1][1])
    ],
    [
        ReverseDirMap(NeighborToDeltaTileXY[2][0]),
        ReverseDirMap(NeighborToDeltaTileXY[2][1])
    ],
    [
        ReverseDirMap(NeighborToDeltaTileXY[3][0]),
        ReverseDirMap(NeighborToDeltaTileXY[3][1])
    ]
];

// Neighbors[mode][parity][x][y]: dir

export default Neighbors;