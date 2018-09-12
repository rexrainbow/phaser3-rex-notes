var GetWorldX = function (tileX, tileY) {
    var worldX;
    switch (this.mode) {
        case 0: // orthogonal
            worldX = tileX * this.width;
            break;
        case 1: // isometric
            worldX = (tileX - tileY) * this._halfWidth;
            break;
        case 2: // staggered
            worldX = tileX * this.width;
            if (tileY & 1) {
                worldX += this._halfWidth;
            }
            break;
    }

    return worldX + this.x;
}

export default GetWorldX;