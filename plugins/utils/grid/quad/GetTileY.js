var GetTileY = function (worldX, worldY) {
    worldY -= this.y;
    var tileY;
    switch (this.mode) {
        case 0: // orthogonal
            tileY = Math.round(worldY / this.height);
            break;
        case 1: // isometric
            worldX -= this.x;
            tileY = Math.round((worldY / this.height) - (worldX / this.width));
            break;
        case 2: // staggered
            tileY = Math.round(worldY / this._halfHeight);
            break;
    }
    return tileY;
}

export default GetTileY;