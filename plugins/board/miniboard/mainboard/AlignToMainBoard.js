var AlignToMainBoard = function (mainBoard, tileX, tileY) {
    if (!mainBoard) {
        return this;
    }

    if (tileX === undefined) {
        tileX = mainBoard.worldXYToTileX(this.x, this.y);
    }
    if (tileY === undefined) {
        tileY = mainBoard.worldXYToTileY(this.x, this.y);
    }
    mainBoard.gridAlign(this, tileX, tileY);
    return this;
}

export default AlignToMainBoard;