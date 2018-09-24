var GetNeighborTileDirection = function (srcTileXY, neighborTileXY) {
    if ((srcTileXY === null) || (neighborTileXY === null)) {
        return null;
    }
    var direction = this.grid.getNeighborTileDirection(srcTileXY, neighborTileXY);
    if (this.wrapMode && (direction === null)) {
        const maxTileX = (this.width - 1);
        const minTileX = 0;
        const maxTileY = (this.height - 1);
        const minTileY = 0;
        const neighborTileX = neighborTileXY.x;
        const neighborTileY = neighborTileXY.y;
        var isWrapped = false;
        if (neighborTileX === minTileX) {
            tmpTileXY.x = maxTileX;
            isWrapped = true;
        } else if (neighborTileX === maxTileX) {
            tmpTileXY.x = minTileX;
            isWrapped = true;
        }

        if (neighborTileY === minTileY) {
            tmpTileXY.y = maxTileY;
            isWrapped = true;
        } else if (neighborTileY === maxTileY) {
            tmpTileXY.y = minTileY;
            isWrapped = true;
        }

        if (isWrapped) {
            direction = this.grid.getNeighborTileDirection(srcTileXY, tmpTileXY);
        }
    }
    return direction;
}

var tmpTileXY = {
    x: 0,
    y: 0
}
export default GetNeighborTileDirection;