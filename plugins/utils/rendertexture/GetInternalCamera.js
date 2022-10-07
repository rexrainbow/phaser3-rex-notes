// TODO: Return rt.texture.camera in 3.60
var GetInternalCamera = function (rt) {
    if (rt.camera) {
        return rt.camera;
    } else {
        return rt.texture.camera;  // 3.60
    }
}

export default GetInternalCamera;