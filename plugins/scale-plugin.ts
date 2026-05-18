import Scale from './scale';
import ScaleDown from './behaviors/scale/ScaleDown';
import ScaleDownDestroy from './scale-down-destroy';
import Popup from './popup';
import Yoyo from './behaviors/scale/Yoyo';
import ScaleMethods from './behaviors/scale/ScaleMethods';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class ScalePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new Scale(gameObject, config);
    }

    injectMethods(gameObject?: any) {
        Object.assign(gameObject, ScaleMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(PhaserGameObjects.GameObject.prototype);
        return this;
    }
}

// mixin
var methods = {
    scaleDown: ScaleDown,
    scaleDownDestroy: ScaleDownDestroy,
    popup: Popup,
    yoyo: Yoyo,
}
Object.assign(
    ScalePlugin.prototype,
    methods
);

export default ScalePlugin;