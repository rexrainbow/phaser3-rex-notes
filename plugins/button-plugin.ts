import Button from './button';

import { Plugins as PhaserPlugins } from 'phaser';
class ButtonPlugin extends PhaserPlugins.BasePlugin {
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
        return new Button(gameObject, config);
    }

}

export default ButtonPlugin;