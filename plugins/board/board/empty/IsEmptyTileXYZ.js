var IsEmptyTileXYZ = function (tileX, tileY, tileZ) {
    // TileXY is inside board
    if (this.contains(tileX, tileY)) {
        // TileXYZ has no chess
        return !this.contains(tileX, tileY, tileZ);
    }

    return false;
}

export default IsEmptyTileXYZ;