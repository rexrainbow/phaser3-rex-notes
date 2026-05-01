import { TextEdit, Edit } from './textedit.js';

import { Plugins as PhaserPlugins } from 'phaser';
class TextEditPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TextEdit(gameObject, config);
    }
}

var methods = {
    edit: Edit
};
Object.assign(
    TextEditPlugin.prototype,
    methods
);

export default TextEditPlugin;