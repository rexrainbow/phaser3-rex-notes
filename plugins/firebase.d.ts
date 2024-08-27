export default FirebasePlugin;

import BroadcastFactory from './firebase/database/broadcast/Factory';
import OnlineUserListFactory from './firebase/database/onlineuserlist/Factory';
import RoomFactory from './firebase/database/room/Factory';
import SingleRoomFactory from './firebase/database/singleroom/Factory';
import ItemTableFactory from './firebase/database/itemtable/Factory';

import FilesFactory from './firebase/firestore/files/Factory';
import IdAliasFactory from './firebase/firestore/idalias/Factory';
import LeaderBoardFactory from './firebase/firestore/leaderboard/Factory';
import MessagesFactory from './firebase/firestore/messages/Factory';

import Preload from './firebase/preload/Preload';

declare class Factories {
    broadcast: typeof BroadcastFactory;
    onlineUserList: typeof OnlineUserListFactory;
    room: typeof RoomFactory;
    singleRoom: typeof SingleRoomFactory;
    itemTable: typeof ItemTableFactory;

    files: typeof FilesFactory;
    idAlias: typeof IdAliasFactory;
    leaderBoard: typeof LeaderBoardFactory;
    messages: typeof MessagesFactory;
}

declare class FirebasePlugin {
    add: Factories;

    initializeApp(config: Preload.IFirebaseConfig): this;

    preload(
        scene: Phaser.Scene,
        urlConfig?: Preload.IUrlConfig | string,
        firebaseConfig?: Preload.IFirebaseConfig
    ): this;
}