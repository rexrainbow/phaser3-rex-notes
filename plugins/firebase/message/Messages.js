import GetValue from '../../utils/object/GetValue.js';


class Messages {
    constructor(config) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));
        
        this.userInfo = { userID: undefined, userName: undefined };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', undefined));
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setUser(userID, userName) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userInfo.userID = userID;
            this.userInfo.userName = userName;
        }
        return this;
    }
}

var methods = {
}

Object.assign(
    Messages.prototype,
    methods
);

export default Messages;