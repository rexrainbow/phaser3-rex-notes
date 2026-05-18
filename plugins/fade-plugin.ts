import Fade from './fade';
import FadeOutDestroy from './fade-out-destroy';
import FadeMethods from './behaviors/fade/FadeMethods';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class FadePlugin extends PhaserPlugins.BasePlugin {
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
        return new Fade(gameObject, config);
    }

    injectMethods(gameObject?: any) {
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