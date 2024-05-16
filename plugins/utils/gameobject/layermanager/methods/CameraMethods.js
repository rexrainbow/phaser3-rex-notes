export default {
    setDedicatedCamera(layerName, cameraName) {
        var layer = this.getLayer(layerName);
        if (!layer) {
            return this;
        }

        var cameraManager = this.scene.cameras;
        var camera;
        if (cameraName === undefined) {
            camera = cameraManager.main;
        } else {
            var cameraNameType = typeof (cameraName);
            switch (cameraNameType) {
                case 'string':
                    camera = cameraManager.getCamera(cameraName);
                    break;

                case 'number':
                    camera = cameraManager.cameras[cameraName];
                    break;

                default:
                    camera = cameraName;
                    break;
            }
        }

        if (!camera) {
            return this;
        }

        layer.cameraFilter = 0xffffffff ^ camera.id;

        return this;
    }
}