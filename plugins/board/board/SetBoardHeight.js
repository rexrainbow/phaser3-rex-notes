'use strict'

var SetBoardHeight = function (height) {
    if (this.infinityMode) {
        return this;
    }
    if ((this.height === undefined) || (this.height <= height)) {
        this.height = height;
        return this;
    }

    // this.height > height : collapse
    var tileX, tileY, tileZ, zChess;
    for (tileY = height; tileY < this.height; tileY++) {
        for (tileX = 0; tileX < this.width; tileX++) {
            zChess = this.tileXYToChess(tileX, tileY);
            for (tileZ in zChess) {
                this.RemoveChess(false, tileX, tileY, tileZ);
            }
        }
    }

    this.height = height;
    return this;
}

export default SetBoardHeight;