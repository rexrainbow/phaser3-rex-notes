var GetGridPoints = function (tileX, tileY, points) {
    if (arguments.length === 0) {
        tileX = 0;
        tileY = 0;
        points = true;
    }
    return this.grid.getGridPoints(tileX, tileY, points);
}
export default GetGridPoints;