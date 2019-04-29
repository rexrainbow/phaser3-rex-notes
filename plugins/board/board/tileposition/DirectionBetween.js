var DirectionBetween = function (tileA, tileB, nearest) {
    if (nearest === undefined) {
        nearest = true;
    }
    var direction = this.grid.directionBetween(tileA, tileB);
    if (nearest) {
        direction = Math.round(direction);
        if (direction === this.grid.directions) {
            direction = 0;
        }
    }
    return direction;
}
export default DirectionBetween;