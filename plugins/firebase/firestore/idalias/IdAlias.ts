import GetValue from '../../../utils/object/GetValue';
import Add from './Add';
import AddRandom from './AddRandom';
import GetId from './GetId';
import GetAlias from './GetAlias';
import GetRandomAlias from './GetRandomAlias';
import Remove from './Remove';

class IdAlias {
    database: any;
    rootPath: any;
    rootRef: any;

    constructor(config?: any) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath?: any) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    getAliasRef(alias?: any) {
        return this.rootRef.doc(alias);
    }
}

var methods = {
    add: Add,
    addRandom: AddRandom,
    getId: GetId,
    getAlias: GetAlias,
    getRandomAlias: GetRandomAlias,
    remove: Remove
}

Object.assign(
    IdAlias.prototype,
    methods
);

export default IdAlias;