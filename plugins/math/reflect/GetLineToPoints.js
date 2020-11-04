const GetLineToLine = Phaser.Geom.Intersects.GetLineToLine;

var GetLineToPoints = function (line, points, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globResult;
    }
    /* 
    out: {
        x,y,      // intersection point
        d,        // intersection distance
        segIndex  // intersection segment
    }
    */

    var closestIntersect = false;

    out.d = Infinity;
    tempIntersect.set();

    var prev = points[0];

    for (var i = 1; i < points.length; i++) {
        var current = points[i];

        segment.setTo(prev.x, prev.y, current.x, current.y);

        prev = current;

        if (GetLineToLine(line, segment, tempIntersect)) {
            // Ignore case: intersection distance is 0
            if ((tempIntersect.z > 0) && (tempIntersect.z < out.d)) {
                out.x = tempIntersect.x;
                out.y = tempIntersect.y;
                out.d = tempIntersect.z;
                out.segIndex = i - 1;

                closestIntersect = true;
            }
        }
    }

    return (closestIntersect) ? out : null;
};

var globResult = {};
var segment = new Phaser.Geom.Line();
var tempIntersect = new Phaser.Math.Vector3();

export default GetLineToPoints;