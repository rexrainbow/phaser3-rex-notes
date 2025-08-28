export default {
    setActivateBoardWidth(width) {
        this.setBoardWidth(width + 2);
        return this;
    },

    setActivateBoardHeight(height) {
        this.setBoardHeight(height + 2);
        return this;
    },

    isAtActivateArea(tileX, tileY) {
        return (tileX >= 1) && (tileX <= this.board.width - 2) && (tileY >= 1) && (tileY <= this.board.height - 2);
    }
}