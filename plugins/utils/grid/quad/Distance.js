var Distance = function (tileA, tileB, roughMode) {
    var dx = tileB.x - tileA.x;
    var dy = tileB.y - tileA.y;
    var dist;
    if (roughMode) {
        dist = quickAbs(dx) + quickAbs(dy);
    } else {
        dist = Math.sqrt(dx * dx + dy * dy);
    }
    return dist;
}
var quickAbs = function (x) {
    return x < 0 ? -x : x;
};
export default Distance;