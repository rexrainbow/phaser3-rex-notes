import Fade from './fade.js';
import FadeOutDestroy from './fade-out-destroy.js';
import FadeMethods from './behaviors/fade/FadeMethods.js';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class FadePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Fade(gameObject, config);
    }

    injectMethods(gameObject) {
        Object.assign(gameObject, FadeMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(PhaserGameObjects.GameObject.prototype);
        return this;
    }
}

// mixin
var methods = {
    fadeOutDestroy: FadeOutDestroy
};
Object.assign(
    FadePlugin.prototype,
    methods
);

export default FadePlugin;