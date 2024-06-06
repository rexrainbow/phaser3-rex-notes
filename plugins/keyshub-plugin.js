import KeysHub from './keyshub.js';
import EventKeyCodeToP3KeyCode from './utils/keyboard/EventKeyCodeToP3KeyCode.js';

class KeysHubPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new KeysHub(scene, config);
    }

    getKeyCodeFromEvent(event) {
        return EventKeyCodeToP3KeyCode(event);
    }

}

export default KeysHubPlugin;