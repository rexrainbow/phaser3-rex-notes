import GOManager from '../../gomanager/GOManager.js';
import GetCamera from '../../../camera/GetCamera';

const SetDedicatedCamera = GOManager.prototype.setDedicatedCamera;
export default {
    setDedicatedCamera(goName, cameraName) {
        // Add a new camera if target camera is not existing
        var camera = GetCamera(this.scene, cameraName);
        if (!camera) {
            camera = this.scene.cameras.add(undefined, undefined, undefined, undefined, false, cameraName);
        }
        SetDedicatedCamera.call(this, goName, camera);
        return this;
    }
}