export default {
    setActivateBoardWidth(width) {
        this.setBoardWidth(width);
        return this;
    },

    setActivateBoardHeight(height) {
        this.setBoardHeight(height * 2);
        return this;
    },

    isAtActivateArea(tileX, tileY) {
        var boardHeight = this.board.height;
        return (tileY > boardHeight / 2) && (tileY <= boardHeight - 1);
    }
}