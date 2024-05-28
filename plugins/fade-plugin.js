import Fade from './fade.js';
import FadeOutDestroy from './fade-out-destroy.js';
import FadeMethods from './behaviors/fade/FadeMethods.js';

class FadePlugin extends Phaser.Plugins.BasePlugin {

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
        this.injectMethods(Phaser.GameObjects.GameObject.prototype);
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