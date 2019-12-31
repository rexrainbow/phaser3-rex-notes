import GetValue from '../../utils/object/GetValue.js';
import PageLoader from '../pageloader/PageLoader.js';
import LoadMethods from './LoadMethods.js';
import Copy from '../../utils/array/Copy.js'
import Save from './Save.js';
import SaveItems from './SaveItems.js';
import Delete from '../utils/query/Delete.js';
import LoadRandomItems from './LoadRandomItems.js';
import GetItemCount from './GetItemCount.js';

class ItemTable {
    constructor(config) {
        this.setClassName(GetValue(config, 'className', 'Item'));
        this.primaryKeys = [];
        var primaryKeys = GetValue(config, 'primaryKeys', undefined);
        if (primaryKeys) {
            this.setPrimaryKey(primaryKeys);
        }

        this.setOwnerReadMode(GetValue(config, 'ownerRead', undefined));
        this.setOwnerWriteMode(GetValue(config, 'ownerWrite', undefined));

        this.pageLoader = new PageLoader({
            lines: GetValue(config, 'lines', 10)
        });
    }

    setClassName(className) {
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    setPrimaryKey(key) {
        if (!key) {
            this.primaryKeys.length = 0;
        } else if (typeof (key) === 'string') {
            this.primaryKeys.length = 1;
            this.primaryKeys[0] = key;
        } else {
            Copy(this.primaryKeys, key);
        }
        return this;
    }

    setOwnerReadMode(mode) {
        this.ownerRead = mode;
        return this;
    }

    setOwnerWriteMode(mode) {
        this.ownerWrite = mode;
        return this;
    }

    createItem() {
        return new this.customClass();
    }

    createQuery() {
        return new Parse.Query(this.customClass);
    }

    get startIndex() {
        return this.pageLoader.startIndex;
    }

    get pageIndex() {
        return this.pageLoader.pageIndex;
    }

    get isLastPage() {
        return this.pageLoader.isLastPage;
    }

    // Delete
    removeItem(itemId) {
        return this.createItem().set('id', itemId).destroy();
    }
}

var methods = {
    save: Save,
    saveItems: SaveItems,
    remove: Delete,
    loadRandomItems: LoadRandomItems,
    getItemCount: GetItemCount,
}
Object.assign(
    ItemTable.prototype,
    LoadMethods,
    methods
);

export default ItemTable;