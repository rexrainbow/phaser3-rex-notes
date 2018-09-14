var GetTileX = function (worldX, worldY) {
    var tileX;
    switch (this.mode) {
        case 0: // orthogonal
            worldX -= this.x;
            tileX = Math.round(worldX / this.width);
            break;
        case 1: // isometric
            worldX -= this.x;
            worldY -= this.y;
            tileX = 0.5 * (Math.round(worldY / this._halfHeight) + Math.round(worldX / this._halfWidth));
            break;
        case 2: // staggered
            var tileY = this.getTileY(worldX, worldY);
            worldX -= this.x;
            if (tileY & 1) {
                worldX -= this._halfWidth;
            }
            tileX = Math.round(worldX / this.width);
            break;
    }
    return tileX;
}

export default GetTileX;