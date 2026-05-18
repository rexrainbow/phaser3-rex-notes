import Preload from './firebase/preload/Preload';
import ObjectFactory from './firebase/ObjectFactory'

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

class FirebasePlugin {
    add: any;

    constructor() {
        this.add = new ObjectFactory();
    }

    initializeApp(config?: any) {
        this.add.initializeApp(config);
        return this;
    }

    preload(urlConfig?: any, firebaseConfig?: any) {
        return Preload(urlConfig, firebaseConfig);
    }
}


export default FirebasePlugin;