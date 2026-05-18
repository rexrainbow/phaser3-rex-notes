import ScaleOuter from "./scaleouter";

import { Plugins as PhaserPlugins } from 'phaser';
class ScaleOuterPlugin extends PhaserPlugins.ScenePlugin {
    scaleOuter: any;
    scene: any;

    constructor(scene?: any, pluginManager?: any) {
        super(scene, pluginManager);
        this.scaleOuter = new ScaleOuter(scene);
    }

    boot() {
        var eventEmitter = this.scene.sys.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.scaleOuter.destroy();
        this.scaleOuter = undefined;
        super.destroy();
    }

    add(camera?: any) {
        this.scaleOuter.add(camera);
        return this;
    }

    scale() {
        if (this.scaleOuter.cameras.size === 0) {
            // Add default camera
            this.add(this.scene.sys.cameras.main);
        }
        this.scaleOuter.scale();
        return this;
    }

    stop() {
        this.scaleOuter.stop();
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

    get innerViewport() {
        return this.scaleOuter.innerViewport;
    }

    get outerViewport() {
        return this.scaleOuter.outerViewport;
    }

    getShrinkedOuterViewport(maxRatio?: any, minRatio?: any, out?: any) {
        return this.scaleOuter.getShrinkedOuterViewport(maxRatio, minRatio, out);
    }
}

export default ScaleOuterPlugin;