import ScaleOuter from "./camera/scaleouter/ScaleOuter.js";

class ScaleOuterPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);
        this.scaleOuter = new ScaleOuter(scene);
    }

    start() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.scaleOuter.destroy();
        this.scaleOuter = undefined;
        super.destroy();
    }

    add(camera) {
        this.scaleOuter.add(camera);
        return this;
    }

    get scrollX() {
        return this.scaleOuter.scrollX;
    }

    get scrollY() {
        return this.scaleOuter.scrollY;
    }

    get zoom() {
        return this.scaleOuter.zoom;
    }
}

export default ScaleOuterPlugin;
