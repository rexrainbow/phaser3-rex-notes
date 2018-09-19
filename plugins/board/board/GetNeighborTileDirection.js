var GetNeighborTileDirection = function (srcTileXY, neighborTileXY) {
    if ((srcTileXY === null) || (neighborTileXY === null)) {
        return null;
    }
    var direction = this.grid.getNeighborTileDirection(srcTileXY, neighborTileXY);
    if ((direction === null) && this.wrapMode) {
        const maxTileX = (this.width - 1);
        const minTileX = 0;
        const maxTileY = (this.height - 1);
        const minTileY = 0;
        const neighborTileX = neighborTileXY.x;
        const neighborTileY = neighborTileXY.y;
        var revWrap = false;
        if (neighborTileX === minTileX) {
            revWrapTileXY.x = maxTileX;
            revWrap = true;
        } else if (neighborTileX === maxTileX) {
            revWrapTileXY.x = minTileX;
            revWrap = true;
        }

        if (neighborTileY === minTileY) {
            revWrapTileXY.y = maxTileY;
            revWrap = true;
        } else if (neighborTileY === maxTileY) {
            revWrapTileXY.y = minTileY;
            revWrap = true;
        }

        if (revWrap) {
            direction = this.grid.getNeighborTileDirection(srcTileXY, revWrapTileXY);
        }
    }
    return direction;
}

var revWrapTileXY = {
    x: 0,
    y: 0
}
export default GetNeighborTileDirection;