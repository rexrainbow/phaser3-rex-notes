var MoveAloneLine = function(startX?: any, startY?: any, endX?: any, endY?: any) {
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