var GetTileX = function (worldX, worldY) {
    worldX -= this.x;
    var tileX;
    switch (this.mode) {
        case 0: // orthogonal
            tileX = Math.round(worldX / this.width);
            break;
        case 1: // isometric
            worldY -= this.y;
            tileX = Math.round((worldY / this.height) + (worldX / this.width));
            break;
        case 2: // staggered
            var tileY = this.getTileY(worldX, worldY);
            if (tileY & 1) {
                worldX -= this._halfWidth;
            }
            tileX = Math.round(worldX / this.width);
            break;
    }
    return tileX;
}

export default GetTileX;