export default {
    setActivateBoardWidth(width?: any) {
        this.setBoardWidth(width);
        return this;
    },

    setActivateBoardHeight(height?: any) {
        this.setBoardHeight(height * 2);
        return this;
    },

    isAtActivateArea(tileX?: any, tileY?: any) {
        var boardHeight = this.board.height;
        return (tileY >= boardHeight / 2) && (tileY <= boardHeight - 1);
    }
}