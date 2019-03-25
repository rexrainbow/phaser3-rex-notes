var AngleToward = function (tileXY, direction) {
    // Save wrapMode, infinityMode and clear them
    var wrapModeSave = this.wrapMode;
    var infinityModeSave = this.infinityMode;
    this.wrapMode = false;
    this.infinityMode = true;

    // Get neighborTileXY
    var neighborTileXY = this.getNeighborTileXY(tileXY, direction, true);

    // Restore wrapMode, infinityMode and clear them
    this.wrapMode = wrapModeSave;
    this.infinityMode = infinityModeSave;
    return this.angleBetween(tileXY, neighborTileXY);
}

export default AngleToward;