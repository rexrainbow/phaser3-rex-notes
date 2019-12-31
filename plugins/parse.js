import ObjectFactory from './parse/ObjectFactory.js';
import Preload from './parse/utils/preload/Preload.js';
import ItemTable from './parse/itemtable/ItemTable.js';
import QuickLogin from './parse/quicklogin/QuickLogin.js';

class ParsePlugin {
    constructor() {
        this.add = new ObjectFactory();
    }

    preload(url) {
        return Preload(url);
    }
}

var methods = {
    quickLogin: QuickLogin
}
Object.assign(
    ParsePlugin.prototype,
    methods
);


export default ParsePlugin;
