import GetCamera from '../../../camera/GetCamera.js';

export default {
    setDedicatedCamera(goName, cameraName) {
        var gameObject = this.getGO(goName);
        if (!gameObject) {
            return this;
        }

        var camera = GetCamera(this.scene, cameraName);
        if (!camera) {
            return this;
        }

        gameObject.cameraFilter = 0xffffffff ^ camera.id;

        return this;
    }
}