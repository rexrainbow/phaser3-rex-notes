var GetWorldY = function (tileX, tileY) {
    var worldY;
    switch (this.mode) {
        case 0: // orthogonal
            worldY = tileY * this.height;
            break;
        case 1: // isometric
            worldY = (tileX + tileY) * this._halfHeight;
            break;
        case 2: // staggered
            worldY = tileY * this._halfHeight;
            break;
    }

    return worldY + this.y;
}

export default GetWorldY;