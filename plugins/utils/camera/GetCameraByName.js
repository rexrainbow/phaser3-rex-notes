var GetCameraByName = function (scene, name) {
    var cameraManager = scene.cameras;
    var camera;
    if (name === undefined) {
        camera = cameraManager.main;
    } else {
        var cameraNameType = typeof (name);
        switch (cameraNameType) {
            case 'string':
                camera = cameraManager.getCamera(name);
                break;

            case 'number':
                camera = cameraManager.cameras[name];
                break;

            default:
                camera = name;
                break;
        }
    }

    return camera;
}

export default GetCameraByName;