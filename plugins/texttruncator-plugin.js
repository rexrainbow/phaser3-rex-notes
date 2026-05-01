import TextTruncator from './texttruncator.js';

import { Plugins as PhaserPlugins } from 'phaser';
class TextPagePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TextTruncator(gameObject, config);
    }

}

export default TextPagePlugin;