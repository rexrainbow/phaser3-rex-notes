import TextTyping from './texttyping.js';

import { Plugins as PhaserPlugins } from 'phaser';
class TextTypingPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TextTyping(gameObject, config);
    }

}

export default TextTypingPlugin;