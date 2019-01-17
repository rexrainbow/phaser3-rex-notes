import Parse from 'parse';
import GetValue from '../../utils/object/GetValue.js';
import PageLoader from '../utils/PageLoader.js';
import Copy from '../../utils/array/Copy.js'
import Save from './Save.js';
import Remove from '../utils/Remove.js';
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

        this.pageLoader = new PageLoader({
            lines: GetValue(config, 'lines', 10)
        });
    }

    setClassName(className) {
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    setPrimaryKey(key) {
        if (typeof (key) === 'string') {
            this.primaryKeys.length = 1;
            this.primaryKeys[0] = key;
        } else {
            Copy(this.primaryKeys, key);
        }
        return this;
    }

    createItem() {
        return new this.customClass();
    }

    createQuery() {
        return new Parse.Query(this.customClass);
    }

    // Load methods
    loadItem(itemId) {
        return this.createQuery().get(itemId);
    }

    loadPage(query, pageIndex) {
        return this.pageLoader.loadPage(query, pageIndex);
    }

    loadCurrentPage(query) {
        return this.pageLoader.loadCurrentPage(query);
    }

    loadNextPage(query) {
        return this.pageLoader.loadNextPage(query);
    }

    loadPreviousPage(query) {
        return this.pageLoader.loadPreviousPage(query);
    }

    loadLines(query, startIndex, linesCnt) {
        return this.pageLoader.loadLines(query, startIndex, linesCnt);
    }

    loadAll(query) {
        if (query === undefined) {
            query = this.createQuery();
        }
        return this.pageLoader.loadLines(query);
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

    // Remove
    removeItem(itemId) {
        return this.createItem().set('id', itemId).destroy();
    }
}

var methods = {
    save: Save,
    remove: Remove,
    loadRandomItems: LoadRandomItems,
    getItemCount: GetItemCount,
}
Object.assign(
    ItemTable.prototype,
    methods
);

export default ItemTable;