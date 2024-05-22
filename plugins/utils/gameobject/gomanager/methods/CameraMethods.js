import GetCameraByName from '../../../camera/GetCameraByName.js';

export default {
    setCamera(goName, cameraName) {
        var bob = this.get(goName);
        if (!bob) {
            return this;
        }

        var camera = GetCameraByName(this.scene, cameraName);
        if (!camera) {
            return this;
        }

        bob.gameObject.cameraFilter = 0xffffffff ^ camera.id;
        bob.camera = camera;

        return this;
    },

    getCamera(goName) {
        var bob = this.get(goName);
        if (!bob) {
            return null;
        }

        return bob.camera;
    }
}