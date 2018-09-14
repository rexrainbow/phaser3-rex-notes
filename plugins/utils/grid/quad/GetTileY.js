var GetTileY = function (worldX, worldY) {
    var tileY;
    switch (this.mode) {
        case 0: // orthogonal
            worldY -= this.y;
            tileY = Math.round(worldY / this.height);
            break;
        case 1: // isometric
            worldX -= this.x;
            worldY -= this.y;
            tileY = 0.5 * (Math.round(worldY / this._halfHeight) - Math.round(worldX / this._halfWidth));
            break;
        case 2: // staggered
            worldY -= this.y;
            tileY = Math.round(worldY / this._halfHeight);
            break;
    }
    return tileY;
}

export default GetTileY;