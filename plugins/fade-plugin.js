import Fade from './fade.js';
import fadeOutDestroy from './fade-out-destroy.js';

class FadePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Fade(gameObject, config);
    }
}

// mixin
Object.assign(
    FadePlugin.prototype, {
        fadeOutDestroy: fadeOutDestroy
    }
);

export default FadePlugin;