var PolarToCartesian = function(ox?: any, oy?: any, rotation?: any, radius?: any, out?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globOut;
    }

    out.x = (radius * Math.cos(rotation)) + ox;
    out.y = (radius * Math.sin(rotation)) + oy;

    return out;
}

var globOut = {};

export default PolarToCartesian;