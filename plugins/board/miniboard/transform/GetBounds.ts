var GetBounds = function(out?: any) {
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);

    out = this.board.getBoardBounds(out);

    grid.restoreOrigin();
    return out;
}

export default GetBounds;