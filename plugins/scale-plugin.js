import Scale from './scale.js';
import ScaleDown from './behaviors/scale/ScaleDown.js';
import ScaleDownDestroy from './scale-down-destroy.js';
import Popup from './popup.js';
import Yoyo from './behaviors/scale/Yoyo.js';
import ScaleMethods from './behaviors/scale/ScaleMethods.js';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class ScalePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Scale(gameObject, config);
    }

    injectMethods(gameObject) {
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