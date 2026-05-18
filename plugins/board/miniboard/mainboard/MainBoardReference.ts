class MainBoardReference {
    mainBoard: any;
    tileX: any;
    tileY: any;

    miniBoard: any;

    constructor(miniBoard?: any) {
        this.miniBoard = miniBoard;
        this.set(null);
    }
    set(mainBoard?: any, tileX?: any, tileY?: any) {
        if (!mainBoard) {
            mainBoard = null;
            tileX = null;
            tileY = null;
        }
        this.mainBoard = mainBoard;
        this.tileX = tileX;
        this.tileY = tileY;
    }
}
export default MainBoardReference;