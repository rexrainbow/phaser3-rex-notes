import CheckScaleMode from './CheckScaleMode.js';
import GetScaleOutCameraParameters from './GetScaleOuterCameraParameters.js';

const SetStruct = Phaser.Structs.Set;

class ScaleOuter {
    constructor(scene) {
        this.scene = scene;
        // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

        this.cameras = new SetStruct();
        this.scrollX = 0;
        this.scrollY = 0;
        this.zoom = 1;

        if (CheckScaleMode(scene)) {
            this.boot();
        }
    }

    boot() {
        var scene = this.scene;
        scene.scale.on('resize', this.scale, this);
        // Scale manually at beginning
        scene.events.once('preupdate', this.onFirstTick, this);

        scene.events.on('prerender', this.addScaleCameraParameters, this);
        scene.events.on('render', this.removeScaleCameraParameters, this);
    }

    destroy() {
        var scene = this.scene;
        scene.scale.off('resize', this.scale, this);
        scene.events.off('preupdate', this.onFirstTick, this);

        scene.events.off('prerender', this.addScaleCameraParameters, this);
        scene.events.off('render', this.removeScaleCameraParameters, this);

        this.cameras.clear();
        this.cameras = undefined;
        this.scene = undefined;
    }

    add(camera) {
        this.cameras.set(camera)
        this.scale();
        return this;
    }

    // Internal methods
    onFirstTick() {
        if (this.cameras.size === 0) {
            // Add default camera
            this.add(this.scene.cameras.main);
        }
    }

    scale() {
        GetScaleOutCameraParameters(this.scene, this);
    }

    addScaleCameraParameters() {
        this.cameras.iterate(function (camera, index) {
            camera.zoomX *= this.zoom;
            camera.zoomY *= this.zoom;
            camera.scrollX += this.scrollX;
            camera.scrollY += this.scrollY;
        }, this);
    }

    removeScaleCameraParameters() {
        this.cameras.iterate(function (camera, index) {
            camera.zoomX /= this.zoom;
            camera.zoomY /= this.zoom;
            camera.scrollX -= this.scrollX;
            camera.scrollY -= this.scrollY;
        }, this);
    }
}

export default ScaleOuter;