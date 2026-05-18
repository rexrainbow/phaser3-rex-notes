import GOManager from '../../gomanager/GOManager';
import GetCameraByName from '../../../camera/GetCameraByName';

const SetCamera = GOManager.prototype.setCamera;
export default {
    setCamera(layerName?: any, cameraName?: any) {
        // Add a new camera if target camera is not existing
        var camera = GetCameraByName(this.scene, cameraName);
        if (!camera) {
            camera = this.scene.cameras.add(undefined, undefined, undefined, undefined, false, cameraName);
        }
        SetCamera.call(this, layerName, camera);
        return this;
    },
}