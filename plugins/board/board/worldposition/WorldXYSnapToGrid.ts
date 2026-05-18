var WorldXYSnapToGrid = function(worldX?: any, worldY?: any, out?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globWorldXY;
    }

    this.worldXYToTileXY(worldX, worldY, out);
    this.tileXYToWorldXY(out.x, out.y, out);
    return out;
};

var globWorldXY = {};

export default WorldXYSnapToGrid;