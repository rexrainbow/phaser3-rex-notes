import { GetFilterString } from './utils/RoomFilterMethods';

var Methods = {
    getRootRef(childKey?: any) {
        var ref = this.database.ref(this.rootPath);
        if (childKey?: any) {
            ref = ref.child(childKey);
        }
        return ref;
    },

    getRoomRef(roomID?: any, childKey?: any) {
        var ref = this.getRootRef('rooms');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
            if (childKey !== undefined) {
                ref = ref.child(childKey);
            }
        }
        return ref;
    },

    getRoomAliveRef(roomID?: any) {
        return this.getRoomRef(roomID, 'alive');
    },

    getUserListRef(roomID?: any) {
        return this.getRoomRef(roomID, 'users');
    },

    getRoomFilterRef(roomID?: any) {
        var ref = this.getRootRef('room-filters');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
        }
        return ref;
    },

    getRoomDataRef(roomID?: any) {
        var ref = this.getRootRef('room-data');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
        }
        return ref;
    },

    // TODO: ??
    getUserDataRef(userID?: any) {
        var ref = this.getRootRef('user-data');
        if (userID !== undefined) {
            ref = ref.child(userID);
        }
        return ref;
    },

    getRoomDataPath(roomID?: any, childKey?: any) {
        var path = `${this.rootPath}/rooms/${roomID}`;
        if (childKey?: any) {
            path += `/${childKey}`;
        }
        return path;
    },

    getUserListPath(roomID?: any) {
        return this.getRoomDataPath(roomID, 'users');
    },

    getItemTablePath(roomID?: any, key?: any) {
        return `${this.getRoomDataPath(roomID, 'tables')}/${key}`;
    }, 

    getRoomListQuery(roomType?: any, roomState?: any) {
        if (roomState === undefined) {
            roomState = 'open';
        }
        var query = this.getRoomFilterRef();
        query = query.orderByChild('filter');
        if (roomType === undefined) {
            query = query.startAt(roomState).endAt(`${roomState}~`);
        } else {
            query = query.equalTo(GetFilterString(roomState, roomType));
        }
        return query;
    }
}

export default Methods;