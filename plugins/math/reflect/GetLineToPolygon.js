import GetLineToPoints from './GetLineToPoints.js';
import Clone from '../../utils/object/Clone.js';

var GetLineToPolygon = function (line, polygons, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globResult;
    }
    /* 
    out: {
        x,y,        // intersection point
        d,          // intersection distance
        segIndex,   // index of intersection segment
        shapeIndex  // index of intersection polygon
    }
    */

    if (!Array.isArray(polygons)) {
        polygons = [polygons];
    }

    var closestIntersect = false;
    out.d = Infinity;

    //  Reset our vec4s

    for (var i = 0; i < polygons.length; i++) {
        var intersectionResult = GetLineToPoints(line, polygons[i].points, true);
        if (intersectionResult) {
            if (intersectionResult.d < out.d) {
                Clone(intersectionResult, out);  // x,y,d,segIndex
                out.shapeIndex = i;

                closestIntersect = true;
            }
        }
    }

    return (closestIntersect) ? out : null;
};

var globResult = {};

export default GetLineToPolygon;
