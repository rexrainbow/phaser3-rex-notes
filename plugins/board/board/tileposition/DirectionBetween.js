var DirectionBetween = function (tileA, tileB, nearest) {
    if (nearest === undefined) {
        nearest = true;
    }
    return this.grid.directionBetween(tileA, tileB, nearest);
}
export default DirectionBetween;