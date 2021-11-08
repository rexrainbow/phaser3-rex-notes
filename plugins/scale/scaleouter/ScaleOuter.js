import CheckScaleMode from './CheckScaleMode.js';
import GetScaleOutCameraParameters from './GetScaleOuterCameraParameters.js';
import GetInnerViewport from './GetInnerViewport.js';
import GetOuterViewport from './GetOuterViewport.js';

const SetStruct = Phaser.Structs.Set;

class ScaleOuter {
    constructor(scene) {
        this.scene = scene;
        // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

        this.cameras = new SetStruct();
        this.scrollX = 0;
        this.scrollY = 0;
        this.zoom = 1;

        this.boot();
    }

    boot() {
        var scene = this.scene;
        if (CheckScaleMode(scene)) {
            scene.scale.on('resize', this.scale, this);
            scene.events.once('preupdate', this.onFirstTick, this);
        }
    }

    destroy() {
        this.stop();

        this.cameras.clear();
        this.cameras = undefined;
        this.scene = undefined;
    }

    stop() {
        var scene = this.scene;
        scene.scale.off('resize', this.scale, this);
        scene.events.off('preupdate', this.onFirstTick, this);
        return this;
    }

    get innerViewport() {
        return GetInnerViewport(this);
    }

    get outerViewport() {
        return GetOuterViewport(this);
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
        this.scale();
    }

    scale() {
        GetScaleOutCameraParameters(this.scene, this);
        this.cameras.iterate(function (camera, index) {
            camera.zoomX = this.zoom;
            camera.zoomY = this.zoom;
            camera.scrollX = this.scrollX;
            camera.scrollY = this.scrollY;
        }, this);
        return this;
    }
}

export default ScaleOuter;