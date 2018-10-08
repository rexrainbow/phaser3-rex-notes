var Mirror = function (mode, chessTileXYZMap, out) {
    if (mode === undefined) {
        mode = 1;
    }
    if (typeof (mode) === 'string') {
        mode = MODE[mode];
    }
    if (chessTileXYZMap === undefined) {
        chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
        out = {};
    }
    var chessTileXYZ;
    for (var uid in chessTileXYZMap) {
        chessTileXYZ = chessTileXYZMap[uid];
        out[uid] = {
            x: (mode & 1) ? -chessTileXYZ.x : chessTileXYZ.x,
            y: (mode & 2) ? -chessTileXYZ.y : chessTileXYZ.y,
            z: chessTileXYZ.z
        };
    }
    return out; // {uid:{x,y,z}}
}

const MODE = {
    x: 1,    
    y: 2,
    'x&y': 3
}
export default Mirror;