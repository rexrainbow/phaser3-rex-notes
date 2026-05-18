import localforage from 'localforage';
import GetValue from '../../../utils/object/GetValue';
import Save from './Save';
import Load from './Load';
import LoadHeaders from './LoadHeaders';
import Delete from './Delete';
import Clear from './Clear';
import DataProcessMethods from './DataProcessMethods';

class Files {
    cacheHeaders: any;
    store: any;
    zipMode: any;

    constructor(config?: any) {
        this.store = localforage.createInstance({
            name:  GetValue(config, 'name', 'files')
        });

        this.zipMode = GetValue(config, 'zip', true);
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
    methods,
    DataProcessMethods
);

export default Files;