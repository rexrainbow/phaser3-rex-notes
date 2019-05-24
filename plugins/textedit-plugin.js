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

    edit(gameObject, config) {
        return Edit(gameObject, config);
    }
}

export default TextEditPlugin;