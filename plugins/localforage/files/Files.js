import localforage from 'localforage';
import GetValue from '../../utils/object/GetValue.js';

class Files {
    constructor(config) {
        var name = GetValue(config, 'name', 'files');
        this.store = localforage.createInstance({
            name: name
        });

        this.cacheHeaders = {};
    }
}

export default Files;