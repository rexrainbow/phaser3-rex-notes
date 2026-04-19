export default {
    setActivateBoardWidth(width) {
        this.setBoardWidth(width + 2);
        // Padding each 1 column at left and right side
        return this;
    },

    setActivateBoardHeight(height) {
        this.setBoardHeight(height + 2);
        // Padding 1 row at left and right side
        return this;
    },

    isAtActivateArea(tileX, tileY) {
        return (tileX >= 1) && (tileX <= this.board.width - 2) &&
            (tileY >= 1) && (tileY <= this.board.height - 2);
    }
}