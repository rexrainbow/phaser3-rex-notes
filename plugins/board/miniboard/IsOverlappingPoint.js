var IsOverlappingPoint = function (worldX, worldY) {
    var gird = this.grid;
    gird.saveOrigin();
    gird.setOriginPosition(this.x, this.y);
    var isOverlapping = this.board.containPoint(worldX, worldY);
    gird.restoreOrigin();
    return isOverlapping;
}

export default IsOverlappingPoint;