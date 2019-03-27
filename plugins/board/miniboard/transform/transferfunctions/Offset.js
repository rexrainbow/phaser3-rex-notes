var Offset = function (tileX, tileY, chessTileXYZMap, out) {
    if (direction === undefined) {
        direction = 0;
    }
    if (chessTileXYZMap === undefined) {
        chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
        out = {};
    }
    var chessTileXYZ, newTileXYZ;
    for (var uid in chessTileXYZMap) {
        chessTileXYZ = chessTileXYZMap[uid];
        newTileXYZ = mainBoard.offset(chessTileXYZ, tileX, tileY);
        newTileXYZ.z = chessTileXYZ.z;
        out[uid] = newTileXYZ;
    }
    return out; // {uid:{x,y,z}}
}

export default Offset;