var GridAlign = function (gameObject, tileX, tileY, tileZ) {
    var grid = this.grid;
    if (!grid) {
        return this;
    }
    if (!gameObject.hasOwnProperty('x')) {
        return this;
    }
    if (tileX === undefined) {
        var tileXYZ = this.getChessXYZ(gameObject);
        tileX = tileXYZ.x;
        tileY = tileXYZ.y;
        tileZ = tileXYZ.z;
    }

    gameObject.x = grid.getWorldX(tileX, tileY, tileZ);
    gameObject.y = grid.getWorldY(tileX, tileY, tileZ);
};

export default GridAlign;