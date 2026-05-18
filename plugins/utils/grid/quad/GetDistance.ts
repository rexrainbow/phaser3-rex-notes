var GetDistance = function(tileA?: any, tileB?: any, roughMode?: any) {
    var dx = tileB.x - tileA.x;
    var dy = tileB.y - tileA.y;
    var dist;
    if (roughMode?: any) {
        dist = Math.abs(dx) + Math.abs(dy);
    } else {
        dist = Math.sqrt(dx * dx + dy * dy);
    }
    return dist;
}
export default GetDistance;