import { GetFilterString } from './utils/RoomFilterMethods.js';

var Methods = {
    getRootRef(childKey) {
        var ref = this.database.ref(this.rootPath);
        if (childKey) {
            ref = ref.child(childKey);
        }
        return ref;
    },

    getRoomRef(roomID, childKey) {
        var ref = this.getRootRef('rooms');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
            if (childKey !== undefined) {
                ref = ref.child(childKey);
            }
        }
        return ref;
    },

    getRoomAliveRef(roomID) {
        return this.getRoomRef(roomID, 'alive');
    },

    getUserListRef(roomID) {
        return this.getRoomRef(roomID, 'users');
    },

    getRoomFilterRef(roomID) {
        var ref = this.getRootRef('room-filters');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
        }
        return ref;
    },

    getRoomMetadataRef(roomID) {
        var ref = this.getRootRef('room-metadata');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
        }
        return ref;
    },

    // TODO: ??
    getUserMetadataRef(userID) {
        var ref = this.getRootRef('user-metadata');
        if (userID !== undefined) {
            ref = ref.child(userID);
        }
        return ref;
    },

    getUserListPath(roomID) {
        return `${this.rootPath}/rooms/${roomID}/users`;
    },

    getRoomListQuery(roomType, roomState) {
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