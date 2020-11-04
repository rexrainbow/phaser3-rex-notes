const GetLineToLine = Phaser.Geom.Intersects.GetLineToLine;

var GetLineToPoints = function (line, points, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globResult;
    }
    /* 
    out: {
        x,y,                     // intersection point
        d,                       // intersection distance
        segX1,segY1,segX2,segY2  // intersection segment
    }
    */

    var closestIntersect = false;

    tempIntersect.set();

    var prev = points[0];

    for (var i = 1; i < points.length; i++) {
        var current = points[i];

        segment.setTo(prev.x, prev.y, current.x, current.y);

        prev = current;

        if (GetLineToLine(line, segment, tempIntersect)) {
            // Ignore case: intersection distance is 0
            if ((!closestIntersect || (tempIntersect.z < out.d)) && (tempIntersect.z > 0)) {
                out.x = tempIntersect.x;
                out.y = tempIntersect.y;
                out.d = tempIntersect.z;
                out.segX1 = segment.x1;
                out.segY1 = segment.y1;
                out.segX2 = segment.x2;
                out.segY2 = segment.y2;

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