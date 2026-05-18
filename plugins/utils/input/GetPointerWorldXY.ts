var GetPointerWorldXY = function(pointer?: any, targetCamera?: any, out?: any) {
    var camera = pointer.camera;
    if (!camera) {
        return null;
    }

    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalOut;
    }

    if (camera === targetCamera) {
        out.x = pointer.worldX;
        out.y = pointer.worldY;
    } else {
        camera.getWorldPoint(pointer.x, pointer.y, out);
    }

    return out;
}

var globalOut = {};

export default GetPointerWorldXY;