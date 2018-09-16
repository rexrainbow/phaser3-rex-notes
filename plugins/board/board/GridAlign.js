var GridAlign = function (gameObject, tileX, tileY, tileZ) {
    if (!gameObject.hasOwnProperty('x')) {
        return this;
    }
    if (tileX === undefined) {
        var tileXYZ = this.chessToTileXYZ(gameObject);
        tileX = tileXYZ.x;
        tileY = tileXYZ.y;
        tileZ = tileXYZ.z;
    }

    gameObject.x = this.tileXYToWorldX(tileX, tileY);
    gameObject.y = this.tileXYToWorldY(tileX, tileY);
};

export default GridAlign;