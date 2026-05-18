var SetMainBoard = function(mainBoard?: any, tileX?: any, tileY?: any) {
    this.mainBoardRef.set(mainBoard, tileX, tileY);
    if (mainBoard?: any) {
        this.lastMainBoardRef.set(mainBoard, tileX, tileY);
    }
    return this;
}
export default SetMainBoard;