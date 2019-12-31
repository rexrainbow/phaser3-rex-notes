import LoaderCallback from './firebase/utils/preload/LoaderCallback.js';
import ObjectFactory from './firebase/ObjectFactory.js'
import BroadcastFactory from './firebase/broadcast/Factory.js';
import OnlineUserListFactory from './firebase/onlineuserlist/Factory.js';
import RoomFactory from './firebase/room/Factory.js';
import PageLoaderFactory from './firebase/pageloader/Factory.js';
import FilesFactory from './firebase/files/Factory.js';
import IdAliasFactory from './firebase/idalias/Factory.js';
import LeaderBoardFactory from './firebase/leaderboard/Factory.js';
import MessagesFactory from './firebase/messages/Factory.js';

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

    preload(scene, urlConfig, firebaseConfig) {
        LoaderCallback.call(scene.sys.load, urlConfig, firebaseConfig);
        return this;
    }
}


export default FirebasePlugin;
