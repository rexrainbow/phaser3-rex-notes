import GetValue from '../../utils/object/GetValue.js';
import Add from './Add.js';
import AddRandomDigits from './AddRandomDigits.js';
import GetId from './GetId.js';
import GetAlias from './GetAlias.js';
import GetRandomDigits from './GetRandomDigits.js';
import Remove from './Remove.js';

class IdAlias {
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

    getAliasRef(alias) {
        return this.rootRef.doc(alias);
    }
}

var methods = {
    add: Add,
    addRandomDigits: AddRandomDigits,
    getId: GetId,
    getAlias: GetAlias,
    getRandomDigits: GetRandomDigits,
    remove: Remove
}

Object.assign(
    IdAlias.prototype,
    methods
);

export default IdAlias;