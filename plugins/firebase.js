import Preload from './firebase/utils/preload/Preload.js';
import ObjectFactory from './firebase/ObjectFactory.js'

import BroadcastFactory from './firebase/broadcast/Factory.js';
import OnlineUserListFactory from './firebase/onlineuserlist/Factory.js';
import RoomFactory from './firebase/room/Factory.js';
import FilesFactory from './firebase/files/Factory.js';
import IdAliasFactory from './firebase/idalias/Factory.js';
import PageQueryFactory from './firebase/pagequery/Factory.js';
import LeaderBoardFactory from './firebase/leaderboard/Factory.js';

class FirebasePlugin {
    constructor() {
        this.add = new ObjectFactory();
    }

    initializeApp(config) {
        this.add.initializeApp(config);
        return this;
    }

    preload(urlConfig, firebaseConfig) {
        return Preload(urlConfig, firebaseConfig);
    }
}


export default FirebasePlugin;
