import TextEdit from './textedit.js';
import Edit from './behaviors/textedit/Edit.js';

class TextEditPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject) {
        return new TextEdit(gameObject);
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