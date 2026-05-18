import TextTyping from './texttyping';

import { Plugins as PhaserPlugins } from 'phaser';
class TextTypingPlugin extends PhaserPlugins.BasePlugin {
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
        return new TextTyping(gameObject, config);
    }

}

export default TextTypingPlugin;