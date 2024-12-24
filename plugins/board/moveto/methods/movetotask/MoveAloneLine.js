var MoveAloneLine = function (startX, startY, endX, endY) {
    if (startX !== undefined) {
        this.parent.x = startX;
    }
    if (startY !== undefined) {
        this.parent.y = startY;
    }
    this.moveToTask.moveTo(endX, endY);
    return this;
};

export default MoveAloneLine;