var Rotate = function (direction, chessTileXYZMap, out) {
    if (direction === undefined) {
        direction = 0;
    }
    if (chessTileXYZMap === undefined) {
        chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
        out = {};
    }
    var grid = this.board.grid;
    var chessTileXYZ, newTileXYZ;
    for (var uid in tileXYZMap) {
        chessTileXYZ = chessTileXYZMap[uid];
        newTileXYZ = grid.rotate(chessTileXYZ, direction, newTileXYZ);
        newTileXYZ.z = chessTileXYZ.z;
        out[uid] = newTileXYZ;
    }
    return out; // {uid:{x,y,z}}
}

export default Rotate;