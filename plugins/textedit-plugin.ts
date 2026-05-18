import { TextEdit, Edit } from './textedit';

import { Plugins as PhaserPlugins } from 'phaser';
class TextEditPlugin extends PhaserPlugins.BasePlugin {
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