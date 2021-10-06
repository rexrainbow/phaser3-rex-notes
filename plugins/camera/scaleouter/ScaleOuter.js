import GetScaleOutParameters from './GetScaleOuterParameters.js';

const SetStruct = Phaser.Structs.Set;

class ScaleOuter {
    constructor(scene) {
        this.scene = scene;
        // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

        this.cameras = new SetStruct();
        this.scrollX = 0;
        this.scrollY = 0;
        this.zoom = 1;

        scene.scale.on('resize', this.scale, this);

        // Scale manually at beginning
        scene.events.once('preupdate', this.scale, this);
    }

    destroy() {
        this.scene.scale.off('resize', this.scale, this);
        this.scene.events.off('preupdate', this.scale, this);

        this.cameras.clear();
        this.scene = undefined;
    }

    add(camera) {
        this.cameras.set(camera);
        this.scale();
        return this;
    }

    scale() {
        if (this.cameras.size === 0) {
            this.cameras.set(this.scene.cameras.main);
        }

        GetScaleOutParameters(this.scene, this);

        this.cameras.iterate(function (camera, index) {
            camera
                .setScroll(this.scrollX, this.scrollY)
                .setZoom(this.zoom)
        }, this);
    }
}

export default ScaleOuter;