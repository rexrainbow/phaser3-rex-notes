var GetPointerWorldXY = function (pointer, mainCamera, out) {
    var camera = pointer.camera;
    if (!camera) {
        return null;
    }

    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalOut;
    }

    if (camera === mainCamera) {
        out.x = pointer.worldX;
        out.y = pointer.worldY;
    } else {
        camera.getWorldPoint(pointer.x, pointer.y, out);
    }

    return out;
}

var globalOut = {};

export default GetPointerWorldXY;