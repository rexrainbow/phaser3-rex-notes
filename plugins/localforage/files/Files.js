import localforage from 'localforage';
import GetValue from '../../utils/object/GetValue.js';
import Save from './Save.js';
import Load from './Load.js';
import LoadHeaders from './LoadHeaders.js';
import Delete from './Delete.js';
import Clear from './Clear.js';

class Files {
    constructor(config) {
        var name = GetValue(config, 'name', 'files');
        this.store = localforage.createInstance({
            name: name
        });

        this.cacheHeaders = {};
    }
}

var methods = {
    save: Save,
    load: Load,
    loadHeaders: LoadHeaders,
    delete: Delete,
    clear: Clear,
}

Object.assign(
    Files.prototype,
    methods
);

export default Files;