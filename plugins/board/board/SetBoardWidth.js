'use strict'

var SetBoardWidth = function (width) {
    if (this.infinityMode) {
        return this;
    }
    if ((this.width === undefined) || (this.width <= width)) {
        this.width = width;
        return this;
    }

    // this.width > width : collapse
    var tileX, tileY, tileZ, zChess;
    for (tileX = width; tileX < this.width; tileX++) {
        for (tileY = 0; tileY < this.height; tileY++) {
            zChess = this.tileXYToChess(tileX, tileY);
            for (tileZ in zChess) {
                this.RemoveChess(false, tileX, tileY, tileZ);
            }
        }
    }

    this.width = width;
    return this;
}

export default SetBoardWidth;