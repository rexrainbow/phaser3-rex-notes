import LoaderCallback from './firebase/preload/LoaderCallback.js';
import ObjectFactory from './firebase/ObjectFactory.js'

import SimpleMessageFactory from './firebase/simplemessage/Factory.js';
import OnlineUserListFactory from './firebase/onlineuserlist/Factory.js';
import RoomFactory from './firebase/room/Factory.js';

class FirebasePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    initializeApp(config) {
        this.add.initializeApp(config);
        return this;
    }

    preload(scene, config) {
        LoaderCallback.call(scene.sys.load, config);
        return this;
    }
}


export default FirebasePlugin;
