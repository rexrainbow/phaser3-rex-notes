var Methods = {
    getRoomRef(childKey?: any) {
        var ref = this.database.ref(this.rootPath);
        if (childKey?: any) {
            ref = ref.child(childKey);
        }
        return ref;
    },

    getUserListRef() {
        return this.getRoomRef('users');
    },

    getRoomDataPath(childKey?: any) {
        var path = this.rootPath;
        if (childKey?: any) {
            path += `/${childKey}`;
        }
        return path;
    },

    getUserListPath() {
        return this.getRoomDataPath('users');
    },

    getItemTablePath(key?: any) {
        return `${this.getRoomDataPath('tables')}/${key}`;
    }
}

export default Methods;