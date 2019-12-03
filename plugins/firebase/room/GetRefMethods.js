import GetRef from '../utils/GetRef.js';

var Methods = {
    getRootRef(childKey) {
        return GetRef(this.database, this.rootPath, childKey);
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
        var ref = this.getRootRef('room-filter');
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
    }
}

export default Methods;