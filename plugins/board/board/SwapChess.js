'use strict'

var SwapChess = function(gameObjectA, gameObjectB) {
    var tileXYZA = this.getChessXYZ(gameObjectA);
    var tileXYZB = this.getChessXYZ(gameObjectB);
    if ((tileXYZA == null) || (tileXYZB == null)) {
        return this;
    }
    this.removeChess(gameObjectA);
    this.removeChess(gameObjectB);
    this.addChess(gameObjectA, tileXYZB.x, tileXYZB.y, tileXYZB.z);
    this.addChess(gameObjectB, tileXYZA.x, tileXYZA.y, tileXYZA.z);
};

export default SwapChess;