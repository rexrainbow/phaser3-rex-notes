var GridAlign = function (gameObject, tileX, tileY, tileZ) {
    if (!gameObject.hasOwnProperty('x')) {
        return this;
    }
    if (tileX === undefined) {
        var tileXYZ = this.getChessXYZ(gameObject);
        tileX = tileXYZ.x;
        tileY = tileXYZ.y;
        tileZ = tileXYZ.z;
    }

    gameObject.x = this.grid.getWorldX(tileX, tileY, tileZ);
    gameObject.y = this.grid.getWorldY(tileX, tileY, tileZ);
};

export default GridAlign;