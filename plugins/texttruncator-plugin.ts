import TextTruncator from './texttruncator';

import { Plugins as PhaserPlugins } from 'phaser';
class TextPagePlugin extends PhaserPlugins.BasePlugin {
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
        return new TextTruncator(gameObject, config);
    }

}

export default TextPagePlugin;