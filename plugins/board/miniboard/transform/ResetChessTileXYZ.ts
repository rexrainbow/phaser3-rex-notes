var ResetChessTileXYZ = function(newTileXYZMap?: any) {
    this.removeAllChess();
    var newTileXYZ;
    for(var uid in newTileXYZMap) {
        newTileXYZ = newTileXYZMap[uid];
        uid = parseInt(uid);
        this.addChess(uid, newTileXYZ.x, newTileXYZ.y, newTileXYZ.z, false);
    }
    return this;
}
export default ResetChessTileXYZ;