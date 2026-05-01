import Button from './button.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ButtonPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Button(gameObject, config);
    }

}

export default ButtonPlugin;