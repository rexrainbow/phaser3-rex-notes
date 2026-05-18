import TextPage from './textpage';

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
        return new TextPage(gameObject, config);
    }

}

export default TextPagePlugin;