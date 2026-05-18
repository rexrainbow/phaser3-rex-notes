export default {
    setCameraTarget(camera?: any) {
        this.cameraTarget = camera;
        return this;
    },

    clearCameraTarget() {
        this.setCameraTarget();
        return this;
    },

    waitCameraEffectComplete(effectName?: any, cameraName?: any) {
        var camera;
        if (cameraName?: any) {
            camera = this.scene.cameras.getCamera(cameraName);
        } else {
            camera = this.cameraTarget;
        }

        if (!camera) {
            return this.waitTime(0);
        }

        var effect, completeEventName;
        switch (effectName?: any) {
            case 'camera.fadein':
                effect = camera.fadeEffect;
                completeEventName = 'camerafadeincomplete';
                break;

            case 'camera.fadeout':
                effect = camera.fadeEffect;
                completeEventName = 'camerafadeoutcomplete';
                break;

            case 'camera.flash':
                effect = camera.flashEffect;
                completeEventName = 'cameraflashcomplete';
                break;

            case 'camera.shake':
                effect = camera.shakeEffect;
                completeEventName = 'camerashakecomplete';
                break;

            case 'camera.zoom':
                effect = camera.zoomEffect;
                completeEventName = 'camerazoomcomplete';
                break;

            case 'camera.rotate':
                effect = camera.rotateToEffect;
                completeEventName = 'camerarotatecomplete';
                break;

            case 'camera.scroll':
                effect = camera.panEffect;
                completeEventName = 'camerapancomplete';
                break;
        }

        if (!effect.isRunning) {
            return this.waitTime(0);
        }

        return this.waitEvent(camera, completeEventName);
    },
}