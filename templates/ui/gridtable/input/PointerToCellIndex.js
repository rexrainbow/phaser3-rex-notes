// Return null if (x, y) is out of any cell, or that cell is invisible
var PointerToCellIndex = function (table, pointer, worldX, worldY) {
    var camera = pointer.camera;
    if (!camera) {
        // Why camera is undefined here?
        return null;
    }

    if (worldX === undefined) {
        worldX = pointer.worldX;
        worldY = pointer.worldY;
    }

    var x = worldX + camera.scrollX * (table.scrollFactorX - 1);
    var y = worldY + camera.scrollY * (table.scrollFactorY - 1);
    var cellIndex = table.pointToCellIndex(x, y);
    return cellIndex;
}

export default PointerToCellIndex;