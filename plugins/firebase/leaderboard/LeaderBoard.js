import GetValue from '../../utils/object/GetValue.js';

class Leaderboard {
    constructor(config) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));
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
}

var methods = {
}

Object.assign(
    Leaderboard.prototype,
    methods
);

export default Leaderboard;