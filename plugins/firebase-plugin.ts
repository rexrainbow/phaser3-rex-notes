import LoaderCallback from './firebase/preload/LoaderCallback';
import ObjectFactory from './firebase/ObjectFactory';

import BroadcastFactory from './firebase/database/broadcast/Factory';
import OnlineUserListFactory from './firebase/database/onlineuserlist/Factory';
import RoomFactory from './firebase/database/room/Factory';
import SingleRoomFactory from './firebase/database/singleroom/Factory';
import ItemTableFactory from './firebase/database/itemtable/Factory';

import PageLoaderFactory from './firebase/firestore/pageloader/Factory';
import FilesFactory from './firebase/firestore/files/Factory';
import IdAliasFactory from './firebase/firestore/idalias/Factory';
import LeaderBoardFactory from './firebase/firestore/leaderboard/Factory';
import MessagesFactory from './firebase/firestore/messages/Factory';

import { Plugins as PhaserPlugins } from 'phaser';
class FirebasePlugin extends PhaserPlugins.BasePlugin {
    add: any;
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    initializeApp(config?: any) {
        this.add.initializeApp(config);
        return this;
    }

    preload(scene?: any, urlConfig?: any, firebaseConfig?: any) {
        LoaderCallback.call(scene.sys.load, urlConfig, firebaseConfig);
        return this;
    }
}


export default FirebasePlugin;