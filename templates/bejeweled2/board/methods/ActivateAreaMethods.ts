export default {
    setActivateBoardWidth(width?: any) {
        this.setBoardWidth(width + 2);
        // Padding each 1 column at left and right side
        return this;
    },

    setActivateBoardHeight(height?: any) {
        this.setBoardHeight(height + 2);
        // Padding 1 row at left and right side
        return this;
    },

    isAtActivateArea(tileX?: any, tileY?: any) {
        return (tileX >= 1) && (tileX <= this.board.width - 2) &&
            (tileY >= 1) && (tileY <= this.board.height - 2);
    }
}