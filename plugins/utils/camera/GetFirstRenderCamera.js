import GetRootGameObject from '../system/GetRootGameObject.js';

var GetFirstRenderCamera = function (gameObject) {
    var cameraFilter = GetRootGameObject(gameObject).cameraFilter;
    var cameras = gameObject.scene.sys.cameras.cameras;
    var camera, isCameraIgnore;
    for (var i = 0, cnt = cameras.length; i < cnt; i++) {
        camera = cameras[i];

        isCameraIgnore = (cameraFilter & camera.id) > 0;
        if (!isCameraIgnore) {
            return camera;
        }
    }

    return null;
}

export default GetFirstRenderCamera;