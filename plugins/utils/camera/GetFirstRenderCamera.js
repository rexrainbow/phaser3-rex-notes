var GetFirstRenderCamera = function (scene, gameObject) {
    var cameras = scene.sys.cameras.cameras;
    var camera, cameraFilter, isCameraIgnore;
    for (var i = 0, cnt = cameras.length; i < cnt; i++) {
        camera = cameras[i];

        cameraFilter = gameObject.cameraFilter;
        isCameraIgnore = (cameraFilter !== 0) && (cameraFilter & camera.id);
        if (!isCameraIgnore) {
            return camera;
        }
    }

    return null;
}

export default GetFirstRenderCamera;